import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { PasswordValidation } from "../passwordValidation";
import { AlertController } from "@ionic/angular";
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  // formNotValid = "";
  username="";
  name = "";
  region = "";
  building;
  password="";
  confirmpassword="";
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
      region: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("^[a-zA-Z0-9 ]*$")
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
  constructor(
    private _router: Router,
    private formB: FormBuilder,
    public alertController: AlertController,
    public _authService:AuthService
  ) {}

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Incorrect registration data",
      message: "Please correct invalid fields",
      buttons: ["OK"]
    });

    await alert.present();
  }
  login() {
   
    console.log("go to login");
    this._router.navigate(["/login"]);
  }
  register() {
    if (!this.signupForm.valid) {
      this.presentAlert();
      //this.formNotValid = "There are some incorrect fields.";
    } else {
      //this.formNotValid = "";
      
    //  var userobj={
    //   //   username = this.signupForm.get("username").value;
    //   // this.name = this.signupForm.get("name").value;
    //   // this.region = this.signupForm.get("region").value;
    //   // this.building = this.signupForm.get("building").value;
    //   // this.password = this.signupForm.get("passport").value;
    //   // this.confirmpassword = this.signupForm.get("confirmpassword").value;
    //   }
     // this._authService.addReg(userobj);
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

          region: [
            "",
            [
              Validators.required,
              Validators.minLength(3),
              Validators.pattern("^[a-zA-Z0-9 ]*$")
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
      this._router.navigate(["/login"]);
    }
  }
}