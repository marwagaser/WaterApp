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

  updateUserInfo(updatedUser) {
    var headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this._authService.getAuthorizationToken()
    );
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.apiUrl + "/user/getCurrentPoints", updatedUser, {
        headers
      })
      .map(res => res.json());
  }
}
