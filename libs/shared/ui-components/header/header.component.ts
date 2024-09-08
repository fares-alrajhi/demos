import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';    
import { tap } from 'rxjs';
import { UserService } from '../../user/user.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  public href: string = "";

  constructor(private userService: UserService ,private readonly location: Location, private router: Router) {}

  isAuthenticated() {
    return this.userService.isAuthenticated();
  }


  logout() {    
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}