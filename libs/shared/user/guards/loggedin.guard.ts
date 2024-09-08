import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean>|Promise<boolean>|boolean {
        if (this.userService.isAuthenticated()) {
            this.router.navigate(['/home']);
            return false;
        } else {
            return true;
        }
    }
}
