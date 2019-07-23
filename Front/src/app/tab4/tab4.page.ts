import { Component, ViewEncapsulation } from "@angular/core";
import { RoundProgressEase } from "angular-svg-round-progressbar";
import { Router } from "@angular/router";
import { Validators, FormBuilder } from "@angular/forms";
import { PasswordValidation } from "../pages/passwordValidation";
import { AuthService } from "../auth.service";
@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"],
  encapsulation: ViewEncapsulation.None
})
export class Tab4Page {
  updateHidden = false;
  //clientName = //the name of the user should be passed to me;
  // current: number = //the one which i should get from the service;
  name = null;
  region = null;
  building = null;
  password = null;
  confirmpassword = null;
  current: number = 27;
  max: number = 100;
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
  updateForm = this.formB.group(
    {
      name: ["", [Validators.pattern("^[a-zA-Z]*$"), Validators.minLength(3)]],
      region: [
        "",
        [Validators.minLength(3), Validators.pattern("^[a-zA-Z0-9 ]*$")]
      ],

      buildingNumber: ["", [Validators.min(1), Validators.max(999)]],
      password: [
        "",
        [Validators.minLength(8), Validators.pattern("^[^\\s]+$")]
      ],
      confirmpassword: ["", []]
    },
    { validator: PasswordValidation.MatchPassword }
  );
  constructor(
    ease: RoundProgressEase,
    private _router: Router,
    private formB: FormBuilder,
    private _authService: AuthService
  ) {
    for (let prop in ease) {
      if (prop.toLowerCase().indexOf("ease") > -1) {
        this.animations.push(prop);
      }
    }
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
    // do back end validation and call logout method
    // this._authService.signOut();
    //
    this._router.navigate(["/login"]);
  }
  toggle() {
    this.updateHidden = !this.updateHidden;
  }
  updateInfo() {
    if (!this.updateForm.valid) {
      console.log("not valid");
    } else {
      if (this.region != null)
        if (this.region.trim() === "") {
          this.region = null;
        }
      var updatedUser = {
        name: this.name,
        region: this.region,
        building: this.building,
        password: this.password,
        confirmPassword: this.confirmpassword
      };
      //send updated data here!
      console.log(updatedUser);
      //////////////
      this.name = null;
      this.region = null;
      this.building = null;
      this.password = null;
      this.confirmpassword = null;
    }
  }
}
