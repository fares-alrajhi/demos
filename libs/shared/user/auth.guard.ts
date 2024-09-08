import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
      if (this.userService.isAuthenticated()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}