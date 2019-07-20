import { Component, ViewEncapsulation } from "@angular/core";
import { RoundProgressEase } from "angular-svg-round-progressbar";
import { Router } from "@angular/router";
@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"],
  encapsulation: ViewEncapsulation.None
})
export class Tab4Page {
  updateHidden = false;
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
  constructor(ease: RoundProgressEase, private _router: Router) {
    // Kinda hacky way to get all of the easing functions at run-time, because it can
    // technically fetch something from up the prototype chain.
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
  toLogin() {
    // do back end validation
    this._router.navigate(["/login"]);
  }
  toggle() {
    this.updateHidden = !this.updateHidden;
  }
}
