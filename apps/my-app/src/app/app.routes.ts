import { Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserListComponent, UserEditComponent, UserDetailsComponent } from '@avans-nx-workshop/features';
import { BandListComponent, BandDetailsComponent, BandEditComponent } from '@avans-nx-workshop/features';
import { AboutComponent } from './components/about/about.component';

export const appRoutes: Route[] = [
    // Hier komen onze URLs te staan.
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', pathMatch: 'full', component: AboutComponent },
    { path: 'users', pathMatch: 'full', component: UserListComponent },
    { path: 'bands', pathMatch: 'full', component: BandListComponent},

    { path: 'users/new', component: UserEditComponent },
    { path: 'users/:id', component: UserDetailsComponent },
    { path: 'users/:id/edit', component: UserEditComponent },

    { path: 'bands/new', component: BandEditComponent },
    { path: 'bands/:id', component: BandDetailsComponent },
    { path: 'bands/:id/edit', component: BandEditComponent },

    // { path: '**', redirectTo: 'dashboard' }
];