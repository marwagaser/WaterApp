import { Component, ViewEncapsulation, OnInit, OnChanges } from "@angular/core";
import { RoundProgressEase } from "angular-svg-round-progressbar";
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { PasswordValidation } from "../pages/passwordValidation";
import { AuthService } from "../auth.service";
import { AlertController } from "@ionic/angular";
import { UserService } from "../services/user.service";
@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"],
  encapsulation: ViewEncapsulation.None
})
export class Tab4Page implements OnInit, OnChanges {
  updateHidden = false;
  clientName = ""; //the name of the user should be passed to me;
  username = "";
  name = "";
  password = "";
  confirmpassword = "";
  current: number = 0;
  max: number = 2000;
  stroke: number = 15;
  radius: number = 140;
  semicircle: boolean = false;
  rounded: boolean = false;
  responsive: boolean = false;
  clockwise: boolean = true;
  color: string = "#45ccce";
  background: string = "#eaeaea";
  duration: number = 800;
  animation: string = "easeOutCubic";
  animationDelay: number = 0;
  animations: string[] = [];
  gradient: boolean = false;
  realCurrent: number = 0;
  updateForm = this.formB.group({
    username: [
      "",
      [Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9_]*$")]
    ],
    name: ["", [Validators.pattern("^[a-zA-Z]*$"), Validators.minLength(3)]],
    password: ["", [Validators.minLength(8), Validators.pattern("^[^\\s]+$")]],
    confirmpassword: ["", []]
  });
  constructor(
    ease: RoundProgressEase,
    private _router: Router,
    private formB: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    public alertController: AlertController
  ) {
    for (let prop in ease) {
      if (prop.toLowerCase().indexOf("ease") > -1) {
        this.animations.push(prop);
      }
    }
  }
  ngOnInit() {
    this._authService.getPoints().subscribe((res: any) => {
      this.current = res.data;
      this.clientName = res.name;
    });
  }
  ngOnChanges() {
    this._authService.getPoints().subscribe((res: any) => {
      this.current = res.data;
      this.clientName = res.name;
    });
  }
  getOverlayStyle() {
    let isSemi = this.semicircle;
    let transform = (isSemi ? "" : "translateY(-50%) ") + "translateX(-50%)";

    return {
      top: isSemi ? "auto" : "50%",
      bottom: isSemi ? "5%" : "auto",
      left: "50%",
      transform: transform,
      "-moz-transform": transform,
      "-webkit-transform": transform,
      "font-size": this.radius / 3.5 + "px"
    };
  }
  logoutUser() {
    this._authService.logout();

    this._router.navigate(["/login"]);
  }
  toggle() {
    this.updateHidden = !this.updateHidden;
  }
  async invalidUpdate() {
    const alert = await this.alertController.create({
      header: "Invalid update",
      message: "Please correct invalid fields",
      buttons: ["OK"]
    });

    await alert.present();
  }
  async updateFail() {
    const alert = await this.alertController.create({
      header: "Invalid update",
      message: "Update failed",
      buttons: ["OK"]
    });

    await alert.present();
  }
  updateInfo() {
    if (!this.updateForm.valid) {
      this.invalidUpdate();
    } else {
      if (!(this.username === "")) {
        var usernameObj = {
          username: this.username
        };
        this._userService.updateUsername(usernameObj).subscribe(
          data => {
            console.log(data);
          },
          error => {
            this.updateFail();
          }
        );
      }
      if (!(this.name === "")) {
        var nameObj = {
          name: this.name
        };
        this._userService.updateUsername(nameObj).subscribe(
          data => {
            console.log(data);
          },
          error => {
            this.updateFail();
          }
        );
      }
      this._authService.getPoints().subscribe((res: any) => {
        //this.current = res.data;
        this.clientName = res.name;
      });
      if (!(this.password === "")) {
        // var passObj = {
        //   newPassword: this.password,
        //   confirmPassword: this.confirmpassword
        // };
        // this._userService.updatePassword(passObj).subscribe((res: any) => {
        //   console.log(res.data);
        // });
        // //send request to update password
      }
      var updatedUser = {
        username: this.username,
        name: this.name,
        password: this.password,
        confirmPassword: this.confirmpassword
      };
      console.log(updatedUser);

      this.username = "";
      this.name = "";
      this.password = "";
      this.confirmpassword = "";
    }
  }
}
