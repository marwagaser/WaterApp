import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { environment } from "../environments/environment";
//import { map } from "rxjs/operators";
import "rxjs/add/operator/map";
import { AlertController } from "@ionic/angular";
import { map } from "../../node_modules/rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public token: string;
  public authorized: boolean;
  constructor(
    private http: Http,
    private alertController: AlertController,
    private _router: Router
  ) {
    if (this.token) {
      this.authorized = true;
    } else {
      this.authorized = false;
    }
  }

  showAlert(msg) {
    const alert = this.alertController.create({
      message: msg,
      header: "Error",
      buttons: ["OK"]
    });
    // tslint:disable-next-line:no-shadowed-variable
    alert.then(alert => alert.present());
  }

  setToken(token: string) {
    window.localStorage.setItem("token", token);
    console.log(token);
    this.token = window.localStorage.getItem("token");
    console.log(this.token);
    this.authorized = true;
  }
  getAuthorizationToken() {
    return localStorage.getItem("token");
  }

  logout() {
    this.authorized = false;
    this.token = null;
    window.localStorage.setItem("token", null);
    window.localStorage.removeItem("token");
    this._router.navigate(["/login"]);
  }
  signOut() {
    // return this.http.get(environment.apiUrl + "/logout");
  }

  public LogIn(UserOb) {
    return this.http
      .post(environment.apiUrl + "/auth/login", UserOb)
      .map(res => res.json());
  }
  getPoints() {
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + this.getAuthorizationToken());
    headers.append("Content-Type", "application/json");
    return this.http
      .get(environment.apiUrl + "/user/getCurrentPoints", {
        headers
      })
      .map(res => res.json());
  }

  postUserVoucher(voucherID) {
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + this.getAuthorizationToken());
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.apiUrl + "/user/postUserVoucher", voucherID, {
        headers
      })
      .map(res => res.json());
  }

  updateUserPoints(voucher) {
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + this.getAuthorizationToken());
    headers.append("Content-Type", "application/json");
    return this.http
      .post(
        environment.apiUrl + "/user/updateUserPoints",
        { price: voucher },
        {
          headers
        }
      )
      .pipe(map(response => response.json()));
  }

  updateInfo(UserOb) {
    // var headers = new Headers();
    // headers.append("content-type", "application/json");
    // console.log("userob", UserOb);
    // return this.http.post(environment.apiUrl + "/updateinfo", UserOb);
  }
  public addReg(UserOb) {
    var headers = new Headers();
    headers.append("content-type", "application/json");
    console.log("userob", UserOb);
    return this.http.post(environment.apiUrl + "/auth/register", UserOb);
  }
}
