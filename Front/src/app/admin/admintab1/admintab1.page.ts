import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validator, Validators } from "@angular/forms";
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
      [Validators.required,
      Validators.min(1),
      Validators.max(999)]
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
  constructor(private formB: FormBuilder) {}

onReading(){
var readingObj = {
    WMID: this.WMID,
    buildingNumber: this.building,
    region: this.region,
    date: this.date,
    reading: this.reading
  }
console.log(readingObj)
}
  ngOnInit() {}
}
