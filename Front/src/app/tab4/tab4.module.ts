import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Tab4Page } from "./tab4.page";
import { RoundProgressModule } from "angular-svg-round-progressbar";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: "", component: Tab4Page }]),
    RoundProgressModule
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
