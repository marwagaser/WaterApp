import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { environment } from "../environments/environment";
import { map } from "rxjs/Operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: Http) {
    this.token = window.localStorage.token;
    if (this.token) {
      this.authorized = true;
    } else {
      this.authorized = false;
    }
  }
  private token: string;
  public authorized: boolean;


  getAuthorizationToken() {
    return this.token;
  }

  setToken(token: string) {
    this.token = token;
    window.localStorage.token = this.token;
    this.authorized = true;
  }

  getProfile() {
    return this.http.get(environment.apiUrl + "user/profile");
  }
  logout() {
    this.authorized = false;
    this.token = null;
    delete window.localStorage.token;
  }
  
  public LogIn(UserOb) {
    var headers = new Headers();
    headers.append("content-type", "application/json");

    return this.http
      .post(environment.apiUrl + "auth/login", UserOb)
      .pipe(map((res:any) => res.json()));
  }

  public addReg(UserOb) {
    var headers = new Headers();
    headers.append("content-type", "application/json");

    return this.http
      .post(environment.apiUrl + "auth/register", UserOb)
      .pipe(map(res => {   return res;  }));
  }

}