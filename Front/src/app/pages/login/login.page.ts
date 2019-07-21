import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  //missingUserPass = "";
  loginForm = this.formB.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });
  constructor(
    private _router: Router,
    private formB: FormBuilder,
    public alertController: AlertController
  ) {}

  ngOnInit() {}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: "Incorrect username or password",
      message: "Please insert missing username or password",
      buttons: ["OK"]
    });

    await alert.present();
  }

  register() {
    console.log("go to register");
    this._router.navigate(["/register"]);
  }
  login() {
    if (!this.loginForm.valid) {
      this.presentAlert();
      // this.missingUserPass = "Please insert your missing username or password";
      return;
    } else {
      // this.missingUserPass = "";
      console.log("your logged");
      this.loginForm = this.formB.group({
        username: ["", [Validators.required]],
        password: ["", [Validators.required]]
      });
      this._router.navigate(["tabs"]);
    }
  }
}
