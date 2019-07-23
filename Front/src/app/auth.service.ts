import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import {HttpClient} from "@angular/common/http";
import { environment } from "../environments/environment";
//import { map } from "rxjs/operators";
import "rxjs/add/operator/map";
//import { Storage } from '@ionic/storage';
//import { tap, catchError } from 'rxjs/operators';
import { Platform, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string;
  public authorized: boolean;
  constructor(private http: Http,private httpClient: HttpClient, private alertController: AlertController) {
    this.token = window.localStorage.token;
    if (this.token) {
      this.authorized = true;
    } else {
      this.authorized = false;
   }
  }
  
  showAlert(msg) {
    const alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
   // tslint:disable-next-line:no-shadowed-variable
    alert.then(alert => alert.present());
  }
  getAuthorizationToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    window.localStorage.token = this.token;
    this.authorized = true;
  }

  getProfile() {
    return this.http.get(environment.apiUrl + 'user/profile');
  }
  logout() {
    this.authorized = false;
    this.token = null;
    delete window.localStorage.token;
  }

  public LogIn(UserOb) {
    return this.http
      .post(environment.apiUrl + 'auth/login', UserOb)
      .subscribe(data => {console.log(data['_body']);}, error => {console.log(error)});
  }

  public addReg(UserOb) {
   
    console.log("userob",UserOb);
    return this.http.post(environment.apiUrl+'/auth/register', UserOb).subscribe(data => {console.log(data['_body']);}, error => {console.log(error)});
  }
}
