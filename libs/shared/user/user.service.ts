import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserDetails, LoginResponse } from '../../api/user/src/lib/user-details.interface';
import { Observable, BehaviorSubject, tap, catchError, throwError } from 'rxjs';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LocalstorageService } from './localStorage';
import { environment } from '../../../apps/custmer/environments/environment';
import { log } from 'console';
import { Router } from '@angular/router';

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
    private localStorage: LocalstorageService,
    private router: Router,
  ) { }

  user = new BehaviorSubject<UserDetails>(null!);

  login(user: object): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${environment.apiAuthUrl}/login`, user).pipe(
      tap((res: LoginResponse | any) => {   
        if(!res.error) {
          const customer = {userId: res.userId, token: res.token, name: res.name, timestamp: new Date().getTime()}
          this.localStorage.setItem('customer', JSON.stringify(customer))
        }
      }),
      tap((res) => {        
        if(res.error) {
          if(res.status === 'unauthorized'){
            this.snackbar.open('Email or Password does NOT match', 'Close', snackbarConfig)
          }
        }
        else {
          this.snackbar.open('Login Successful', 'Close', snackbarConfig)
        }
      }),
      catchError((e) => {       
        this.snackbar.open(`${e.error?.text}`, 'Close', snackbarConfig);
        return throwError(e);
      })
    )
  }

  profile(user: any): Observable<any> {
    const headersRequest = {
      'access-token': user.token,
    };
    
    return this.httpClient.get(`${environment.apiUserUrl}/${user.userId}`, {headers: headersRequest}).pipe(
      tap((res: any) => {   
        if(!res.error) {
          return res;
        }
      }),
      catchError((e) => {       
        this.snackbar.open(`${e.error?.text}`, 'Close', snackbarConfig);
        return throwError(e);
      })
    )
  }

  register(user: object): Observable<UserDetails | any>{    
    return this.httpClient.post<UserDetails>(`${environment.apiAuthUrl}/register`, user).pipe(
      tap((createdUser: UserDetails | any) => {
        if(createdUser.error){
          if(createdUser.status === 'conflict') {
            this.snackbar.open(`Error creating user because: Email already exist`, 'Close', snackbarConfig);
          }
          else {
            this.snackbar.open(`Error creating user!!`, 'Close', snackbarConfig);
          }
        }
        else {          
          this.snackbar.open(`User ${createdUser.user.name} was created successfully`, 'Close', snackbarConfig)
        }
      }),
      catchError(e => {        
        this.snackbar.open(`Error creating user because: ${e.error?.message}`, 'Close', snackbarConfig);
        return throwError(e);
      })
    )
  }

  logout(){
    const userId = JSON.parse(this.localStorage.getItem('customer')).userId;
    
    return this.httpClient.get(`${environment.apiAuthUrl}/logout/${userId}`).subscribe((res) => {
        this.localStorage.removeItem('customer')
        this.router.navigate(['/login']);
        this.snackbar.open(`Logout successful`, 'Close', snackbarConfig)
        return res;      
    });
  }

  isAuthenticated() : boolean {
    const customerInfo = this.localStorage.getItem('customer');
    
    if(!customerInfo || customerInfo == 'undefined') {
      return false;
    }
    else {
      const token = JSON.parse(this.localStorage.getItem('customer')).token;
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      return !isExpired;
    }
  }
}
