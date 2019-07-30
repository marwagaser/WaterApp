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
export class AdminService {
  constructor(private _authService: AuthService, private http: Http) {}
  sendReading(reading) {
    var headers = new Headers();
    headers.append(
      "Authorization",
      "Bearer " + this._authService.getAuthorizationToken()
    );
    headers.append("Content-Type", "application/json");
    return this.http
      .post(environment.apiUrl + "/wm/insertReading", reading, {
        headers
      })
      .map(res => res.json());
  }
}
