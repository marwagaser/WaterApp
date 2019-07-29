import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./pages/home/home.module#HomePageModule" },
  { path: "", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  {
    path: "",
    loadChildren: "./admin/admintabs/admintabs.module#AdmintabsPageModule"
  },
  { path: "register", loadChildren: "./pages/home/home.module#HomePageModule" },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  { path: "tabs", loadChildren: "./tabs/tabs.module#TabsPageModule" },
  {
    path: "admintabs",
    loadChildren: "./admin/admintabs/admintabs.module#AdmintabsPageModule"
  }
  // },
  // { path: 'admintab1', loadChildren: './admin/admintab1/admintab1.module#Admintab1PageModule' },
  // { path: 'admintab2', loadChildren: './admin/admintab2/admintab2.module#Admintab2PageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
