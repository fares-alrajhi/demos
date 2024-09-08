import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatGridListModule} from '@angular/material/grid-list';
import * as data from '../../../shared/data/shops.json';

@Component({
  selector: 'lib-shops',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.css',
})
export class ShopsComponent {
  title = 'JSONDataExample';
  shops: any = (data as any).default;

  constructor(){
    console.log("data = ", data);
  }
}
