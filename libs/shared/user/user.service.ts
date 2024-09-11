import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserDetails, LoginResponse } from '../../api/user/src/lib/user-details.interface';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LocalstorageService } from './localStorage';

export const snackbarConfig: MatSnackBarConfig = {
  duration: 3000,
  horizontalPosition: 'right',
  verticalPosition: 'top',
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private snackbar: MatSnackBar,
    private localStorage: LocalstorageService
  ) { }

  user = new BehaviorSubject<UserDetails>(null!);

  login(user: object): Observable<LoginResponse>{

    return this.httpClient.post<LoginResponse>(`${process.env.AUTH_API_URI}/login`, user).pipe(
      tap((res: LoginResponse) => {
        console.log("res = ", res);
    
        const customer = {access_token: res.token, timestamp: new Date().getTime()}
        this.localStorage.setItem('customer', JSON.stringify(customer))
      }),
      tap(() => this.snackbar.open('Login Successful', 'Close', snackbarConfig)),
      catchError(e => {                
        this.snackbar.open(`${e.error?.text}`, 'Close', snackbarConfig);
        return throwError(e);
      })
    )
  }

  register(user: object): Observable<UserDetails>{
    return this.httpClient.post<UserDetails>(`${process.env.AUTH_API_URI}/register`, user).pipe(
      tap((createdUser: UserDetails) => this.snackbar.open(`User ${createdUser.name} ws created successfully`, 'Close', snackbarConfig)),
      catchError(e => {        
        this.snackbar.open(`Error creating user because: ${e.error?.message}`, 'Close', snackbarConfig);
        return throwError(e);
      })
    )
  }

  logout(){
    console.log("this.localStorage.removeItem('customer') = ", this.localStorage.removeItem('customer'));
    
    this.localStorage.removeItem('customer');
    tap(() =>  { 
        this.localStorage.removeItem('customer')
        this.snackbar.open(`Logout successful`, 'Close', snackbarConfig)
    }),
    catchError(e => {        
      this.snackbar.open(`Error logging out because: ${e.error?.message}`, 'Close', snackbarConfig);
      return throwError(e);
    })
    
  //   this.authService.logout().subscribe( s => { This needs to be done to invalidate token on the backend
  //       this.route.navigate(['login']);
  //  });
  }

  isAuthenticated() : boolean {
    const customerInfo = this.localStorage.getItem('customer');
    
    if(!customerInfo || customerInfo == 'undefined') {
      return false;
    }
    else {
      const token = JSON.parse(this.localStorage.getItem('customer')).access_token;
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      return !isExpired;
    }
  }
}
