import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { PasswordValidation } from "../passwordValidation";
import { AlertController } from "@ionic/angular";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"]
})
export class HomePage implements OnInit {
  username = "";
  userExists = false;
  name = "";
  region = "";
  building;
  password = "";
  confirmpassword = "";
  points = 120;
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
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern("^[^\\s]+$")
        ]
      ],
      confirmpassword: ["", [Validators.required]]
    },
    { validator: PasswordValidation.MatchPassword }
  );
  constructor(
    private _router: Router,
    private formB: FormBuilder,
    public alertController: AlertController,
    public _authService: AuthService
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

  async takenUser() {
    const alert = await this.alertController.create({
      header: "Username is taken",
      message: "Please choose another avaliable username",
      buttons: ["OK"]
    });

    await alert.present();
  }
  async regionReq() {
    const alert = await this.alertController.create({
      header: "Incorrect registration data",
      message: "Region cannot be empty",
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
      // this.formNotValid = "There are some incorrect fields.";
    } else {
      if (this.region != null) {
        if (this.region.trim() === "") {
          this.regionReq();
        } else {
          let userobj = {
            username: this.username,
            name: this.name,
            region: this.region,
            building: this.building,
            password: this.password,
            confirmPassword: this.confirmpassword,
            points: 300
          };
          this._authService.addReg(userobj).subscribe(
            data => {
              console.log(data["_body"]);

              this._router.navigate(["/login"]);
            },
            error => {
              this.userExists = true;
              this.takenUser();
              console.log(error);
              console.log(this.userExists);
            }
          );
        }
      }
    }
  }
}
