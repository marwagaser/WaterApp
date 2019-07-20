import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  missingUserPass = "";
  loginForm = this.formB.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });
  constructor(private _router: Router, private formB: FormBuilder) {}

  ngOnInit() {}

  register() {
    console.log("go to register");
    this._router.navigate(["/home"]);
  }
  login() {
    if (!this.loginForm.valid) {
      this.missingUserPass = "Please insert your missing username or password";
      return;
    } else {
      this.missingUserPass = "";
      console.log("your logged");
    }
  }
}
