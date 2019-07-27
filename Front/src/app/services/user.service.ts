import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment";
//import { map } from "rxjs/operators";
import "rxjs/add/operator/map";
import { AlertController } from "@ionic/angular";
import { AuthService } from "../auth.service";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private _authService: AuthService, private http: Http) {}

  updateUsername(username) {
    var headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this._authService.getAuthorizationToken()
    );
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.apiUrl + "/user/updateUsername", username, {
        headers
      })
      .map(res => res.json());
  }
  updateName(name) {
    var headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this._authService.getAuthorizationToken()
    );
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.apiUrl + "/user/updateName", name, {
        headers
      })
      .map(res => res.json());
  }
  updatePassword(newpass) {
    var headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this._authService.getAuthorizationToken()
    );
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.apiUrl + "/user/updatePassword", newpass, {
        headers
      })
      .map(res => res.json());
  }
}
