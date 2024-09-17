import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';    
import { UserService } from '../../user/user.service';
import {MatMenu, MatMenuContent, MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { select, Store } from '@ngrx/store';
import { AppState } from 'libs/customer/store/store';
import { firstValueFrom, Observable } from 'rxjs';
import { selectToken, selectError, selectIsLoading, selectName } from '../../../customer/store/selectors/user.selectors';
import { LocalstorageService } from 'libs/shared/user/localStorage';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatMenuModule,  
    MatMenuContent, 
    MatMenuTrigger,
    MatMenu,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent  {

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;



  constructor(
    private localStorage: LocalstorageService, 
    private store: Store<AppState>, 
    private userService: UserService,
    private readonly location: Location, 
    private router: Router) {}


  getName() {
    return JSON.parse(this.localStorage.getItem('customer'))?.name;
  }

  isAuthenticated() {
    return this.userService.isAuthenticated();
  }

  toggleProfile() {    
    this.trigger.openMenu();
  }

  logout() {    
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}