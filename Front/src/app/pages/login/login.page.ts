import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { AuthService } from "src/app/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  username = "";
  password = "";

  //missingUserPass = "";
  loginForm = this.formB.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  constructor(
    private _router: Router,
    private formB: FormBuilder,
    public alertController: AlertController,
    public _authService: AuthService
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
    var userobj = {
      username: this.username,
      password: this.password
    };

    if (!this.loginForm.valid) {
      this.presentAlert();
      // this.missingUserPass = "Please insert your missing username or password";
      return;
    } else {
      // this.missingUserPass = "";

      //console.log("your logged");
      this.loginForm = this.formB.group({
        username: ["", [Validators.required]],
        password: ["", [Validators.required]]
      });
      console.log(userobj);
      this._authService.LogIn(userobj);
      this._router.navigate(["tabs"]);
    }
  }
}
