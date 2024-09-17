import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import * as data from '../../../shared/data/shops.json';
import { UserService } from 'libs/shared/user/user.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Profile } from 'libs/customer/store/actions/user.actions';
import { LocalstorageService } from 'libs/shared/user/localStorage';

@Component({
  selector: 'lib-shops',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css',
})
export class ShopsComponent implements OnInit{
  title = 'JSONDataExample';
  shops: any = (data as any).default;

  constructor(private localStorage: LocalstorageService, private userService: UserService,private router: Router, private store: Store) {
    
  }
  ngOnInit(): void | any {
    const customerInfo = JSON.parse(this.localStorage.getItem('customer'));
    

    const userId = JSON.parse(this.localStorage.getItem('customer')).userId;
    const token = JSON.parse(this.localStorage.getItem('customer')).token;
    
    this.store.dispatch(Profile({userId: customerInfo.userId, token: customerInfo.token}));
  }
}
