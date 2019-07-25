import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { AlertController } from "@ionic/angular";
import { AuthService } from "../../auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  username = "";
  password = "";
  userpasserr = "";
  loginForm = this.formB.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  constructor(
    // tslint:disable-next-line:variable-name
    private _router: Router,
    private formB: FormBuilder,
    public alertController: AlertController,
    // tslint:disable-next-line:variable-name
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
  async userPasserror() {
    const alert = await this.alertController.create({
      header: "Incorrect username or password",
      message: this.userpasserr,
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
      return;
    } else {
      this._authService.LogIn(userobj).subscribe(
        (res: any) => {
          this._authService.setToken(res.data);
          console.log("this", res.data);
          this.loginForm = this.formB.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]]
          });
          this._router.navigate(["/tabs"]);
        },
        (err: any) => {
          console.log(err);
          var json = JSON.parse(err._body);
          this.userpasserr = json.msg;
          this.userPasserror();
        }
      );
      //
    }
  }
}
