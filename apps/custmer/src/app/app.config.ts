import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideStore, StoreModule} from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { USER_STATE_NAME } from '../../../../libs/customer/store/selectors/user.selectors';
import { UserReducer } from '../../../../libs/customer/store/reducers/user.reducers'
import { AuthEffects } from '../../../../libs/customer/store/effects/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserService } from 'libs/shared/user/user.service';
import { appEffects, appStore } from '../../../../libs/customer/store/store'

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(appStore), 
    provideEffects(appEffects), 
    UserService,
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      StoreModule.forRoot([UserReducer]),
      StoreModule.forFeature(USER_STATE_NAME, UserReducer),
      EffectsModule.forRoot([AuthEffects]),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
      })
    ]),
    provideAnimations(),
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withFetch()),
  ],
};
