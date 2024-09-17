import { Injectable, inject } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
// import { map, catchError, switchMap, tap, exhaustMap, mergeMap } from 'rxjs/operators';
// import { of, throwError } from 'rxjs';
import * as userActions from "../actions/user.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserService } from 'libs/shared/user/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  /** ---------- Register Effects Starts ----------  */
    register$ = createEffect((): any => {
      return inject(Actions).pipe(
        ofType(userActions.Register),
        concatMap((action) => this.performRegister(action))
      )
    }) 
  
    performRegister(action: {name: string; email: string; password: string; }) {
      return this.userService.register({name: action.name, email: action.email, password: action.password})
        .pipe(map((response) => {          
            if(response['error']) {
              return userActions.RegisterFail({error: response.error});
            }
            else {
              this.router.navigate(['/login']);
              return userActions.RegisterSuccess({status: response.status});
            }
          }
        ),
        catchError((error) => of(userActions.RegisterFail(error)))
      );
    }
  
  /** ---------- Register Effects Ends ----------  */
  

  /** ---------- Login Effects Starts ----------  */
  login$ = createEffect((): any => {
    return inject(Actions).pipe(
      ofType(userActions.Login),
      concatMap((action) => this.performLogin(action))
    )
  })

  performLogin(action: { email: string; password: string; }) {
    return this.userService.login({email: action.email, password: action.password})
      .pipe(map((response) => {          
          if(response['error']) {
            return userActions.LoginFail({error: response.error});
          }
          else {
            this.router.navigate(['/home']);
            
            return userActions.LoginSuccess({token: response.token, name: response.name});
          }
        }
      ),
      catchError((error) => of(userActions.LoginFail(error)))
    );
  }

  /** ---------- Login Effects Ends ----------  */

    /** ---------- Profile Effects Starts ----------  */
    profile$ = createEffect((): any => {
      return inject(Actions).pipe(
        ofType(userActions.Profile),
        concatMap((action) => this.performProfile(action))
      )
    })
  
    performProfile(action: { userId: string; token: string; }) {
      return this.userService.profile(action)
        .pipe(map((response) => {          
            if(response) {
              return userActions.ProfileFail({error: response});
            }
            else {
              return userActions.ProfileSuccess({profile: response});
            }
          }
        ),
        catchError((error) => of(userActions.LoginFail(error)))
      );
    }
  
    /** ---------- Profile Effects Ends ----------  */

  constructor(private actions$: Actions, private userService: UserService, private router: Router) {}
}