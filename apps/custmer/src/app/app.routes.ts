import { Route } from '@angular/router';
import { LoginComponent } from '../../../../libs/shared/ui-components/login/login.component';
import { RegisterComponent } from '../../../../libs/shared/ui-components/register/register.component';
import { ShopsComponent } from '../../../../libs/customer/containers/shops/shops.component';
import { UserAuthGuard } from '../../../../libs/shared/user/auth.guard';
import { LoggedInGuard } from '../../../../libs/shared/user/loggedin.guard';

export const appRoutes: Route[] = [
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ShopsComponent,
        pathMatch: 'full',
        canActivate: [UserAuthGuard],
    },
    { 
        path: 'signin', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [LoggedInGuard],
    },
    { 
        path: 'signup', 
        redirectTo: '/register', 
        pathMatch: 'full' 
    },
    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
        canActivate: [LoggedInGuard],
    },
];
