import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validator, Validators } from "@angular/forms";
import { AdminService } from "../../services/admin.service";
@Component({
  selector: "app-admintab1",
  templateUrl: "./admintab1.page.html",
  styleUrls: ["./admintab1.page.scss"]
})
export class Admintab1Page implements OnInit {
  WMID = "";
  building = null;
  region = "";
  date = new Date();
  reading;
  readingForm = this.formB.group({
    WMID: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9]*$")]],
    buildingNumber: [
      null,
      [Validators.required, Validators.min(1), Validators.max(999)]
    ],
    region: [
      "",
      [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern("^[a-zA-Z0-9 ]*$")
      ]
    ],
    reading: [null, [Validators.required]]
  });
  constructor(
    private formB: FormBuilder,
    private _adminService: AdminService
  ) {}

  onReading() {
    var readingObj = {
      wmid: this.WMID,
      buildingID: this.building,
      regionName: this.region,
      reading: this.reading
    };
    this._adminService.sendReading(readingObj).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log("marwa");
        console.log(error);
      }
    );
    console.log(readingObj);
  }
  ngOnInit() {}
}
