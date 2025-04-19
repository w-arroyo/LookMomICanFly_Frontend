import { Routes } from '@angular/router';
import { HomeCarouselComponent } from './components/secondary_components/home-carousel/home-carousel.component';
import { ProfileComponent } from './components/main_components/profile/profile.component';
import { AuthGuardService } from './services/guards/auth-guard.service';

export const routes: Routes = [
    {
        path:'', redirectTo:'home', pathMatch:'full'
    },
    {
        path: 'home',
        component: HomeCarouselComponent
    },
    {
        path:'authentication',
        loadChildren: ()=> import('./routes/authentication.routes').then(route=> route.routes)
    },
    {
        path:'products',
        loadChildren: ()=> import('./routes/product.routes').then(route=> route.routes)
    },
    {
        path:'account/:section',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path:'**', redirectTo:'home'
    }

];
