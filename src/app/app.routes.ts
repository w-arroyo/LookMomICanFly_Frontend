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
        path:'authentication',
        loadChildren: ()=> import('./routes/authentication.routes').then(route=> route.routes)
    },
    {
        path:'products',
        loadChildren: ()=> import('./routes/product.routes').then(route=> route.routes)
    },
    {
        path:'**', redirectTo:'home'
    }

];
