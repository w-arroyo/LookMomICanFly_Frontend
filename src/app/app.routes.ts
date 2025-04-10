import { Routes } from '@angular/router';
import { HomeCarouselComponent } from './components/secondary_components/home-carousel/home-carousel.component';

export const routes: Routes = [
    {
        path:'', redirectTo:'home', pathMatch:'full'
    },
    {
        path: 'home',
        component: HomeCarouselComponent
    },
    {
        path:'**', redirectTo:'home'
    }

];
