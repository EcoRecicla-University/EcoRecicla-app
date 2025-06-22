import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";

import { LoginService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private _authService: LoginService,
        private _snackbar: MatSnackBar,
        private _router: Router
    ) { }

    private _podeAcessarUrl(): boolean {
        const podeAcessar = this._authService.token !== null;
        return podeAcessar;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if (this._podeAcessarUrl()) {
            return true;
        }
        this._router.navigate(['/login']);
        this._snackbar.open('Você não está autenticado!', 'Ok', { duration: 5000 });
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        if (this._podeAcessarUrl()) {
            return true;
        }
        this._router.navigate(['/login']);
        this._snackbar.open('Você não está autenticado!', 'Ok', { duration: 5000 });
        return false;
    }
}