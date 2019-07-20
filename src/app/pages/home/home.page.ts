import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { PasswordValidation } from "../passwordValidation";
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  formNotValid = "";
  signupForm = this.formB.group(
    {
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern("^[a-zA-Z0-9_]*$")
        ]
      ],
      name: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-zA-Z]*$"),
          Validators.minLength(3)
        ]
      ],

      buildingNumber: [
        "",
        [Validators.required, Validators.min(1), Validators.max(999)]
      ],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmpassword: ["", [Validators.required]]
    },
    { validator: PasswordValidation.MatchPassword }
  );
  constructor(private _router: Router, private formB: FormBuilder) {}

  ngOnInit() {}
  login() {
    console.log("go to login");
    this._router.navigate(["/login"]);
  }
  register() {
    if (!this.signupForm.valid) {
      this.formNotValid = "There are some incorrect fields.";
      console.log(this.signupForm.valid);
    } else {
      this.formNotValid = "";
      console.log(this.signupForm.value);
      this.signupForm = this.formB.group(
        {
          username: [
            "",
            [
              Validators.required,
              Validators.minLength(5),
              Validators.pattern("^[a-zA-Z0-9_]*$")
            ]
          ],
          name: [
            "",
            [
              Validators.required,
              Validators.pattern("^[a-zA-Z]*$"),
              Validators.minLength(3)
            ]
          ],

          buildingNumber: [
            "",
            [Validators.required, Validators.min(1), Validators.max(999)]
          ],
          password: ["", [Validators.required, Validators.minLength(8)]],
          confirmpassword: ["", [Validators.required]]
        },
        { validator: PasswordValidation.MatchPassword }
      );
    }
  }
}
