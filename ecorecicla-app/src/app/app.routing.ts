import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { HomeComponent } from "./home/home.component";

export const APP_ROUTES: Routes = [
    { 
        path: 'login', component: LoginComponent 
    },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    }
]