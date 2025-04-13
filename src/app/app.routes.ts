import { Routes } from '@angular/router';
import { HomeCarouselComponent } from './components/secondary_components/home-carousel/home-carousel.component';
import { AuthenticationComponent } from './components/main_components/authentication/authentication.component';

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
        component: AuthenticationComponent
    },
    {
        path:'**', redirectTo:'home'
    }

];
