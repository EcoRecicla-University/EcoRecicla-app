import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";

export const APP_ROUTES: Routes = [
    { path: 'login', component: LoginComponent }
]
// export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES)