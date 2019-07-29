import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdmintabsPage } from "./admintabs.page";

const routes: Routes = [
  {
    path: "admintabs",
    component: AdmintabsPage,
    children: [
      {
        path: "admintab1",
        children: [
          {
            path: "",
            loadChildren: "../admintab1/admintab1.module#Admintab1PageModule"
          }
        ]
      },
      {
        path: "admintab2",
        children: [
          {
            path: "",
            loadChildren: "../admintab2/admintab2.module#Admintab2PageModule"
          }
        ]
      },
      {
        path: "",
        redirectTo: "/admintabs/admintab1",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/admintabs/admintab1",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmintabsPageRoutingModule {}
