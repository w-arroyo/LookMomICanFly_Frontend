import { Routes } from '@angular/router';
import { HomeCarouselComponent } from './components/secondary_components/home-carousel/home-carousel.component';
import { ProfileComponent } from './components/main_components/profile/profile.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { CreateAskComponent } from './components/main_components/create-ask/create-ask.component';

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
        path:'account/profile',
        //loadChildren: ()=> import('./routes/profile.routes').then(route=> route.routes),
        component:ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path:'asks/create/product/:productId/size/:size',
        component: CreateAskComponent,
        canActivate: [AuthGuardService]
    },
    {
        path:'**', redirectTo:'home'
    }

];
