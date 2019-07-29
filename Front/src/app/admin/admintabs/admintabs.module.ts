import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AdmintabsPageRoutingModule } from "./admintabs.router.module";

import { IonicModule } from "@ionic/angular";

import { AdmintabsPage } from "./admintabs.page";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AdmintabsPageRoutingModule],
  declarations: [AdmintabsPage]
})
export class AdmintabsPageModule {}
