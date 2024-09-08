import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../libs/shared/ui-components/header/header.component';
import { FlexLayoutModule } from 'ngx-flexible-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import { LocalstorageService } from '../../../../libs/shared/user/localStorage';
import { AuthReducer } from '../../../../libs/shared/user/state/auth.reducer';
import { AUTH_STATE_NAME } from '../../../../libs/shared/user/state/auth.selector';
import { StoreModule } from '@ngrx/store';


@Component({
  standalone: true,
  imports: [
    HeaderComponent, 
    RouterModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [LocalstorageService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  static isBrowser = new BehaviorSubject<boolean>(true);
  title = 'custmer';

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    AppComponent.isBrowser.next(isPlatformBrowser(this.platformId));
  }
}
