import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { Admintab2Page } from "./admintab2.page";

const routes: Routes = [
  {
    path: "",
    component: Admintab2Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: Admintab2Page }])
  ],
  declarations: [Admintab2Page]
})
export class Admintab2PageModule {}
