import { Routes } from '@angular/router';
import { HomeCarouselComponent } from './components/secondary_components/home-carousel/home-carousel.component';
import { ProfileComponent } from './components/main_components/profile/profile.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { CreateAskComponent } from './components/main_components/create-ask/create-ask.component';
import { AskDetailsComponent } from './components/secondary_components/ask-details/ask-details.component';
import { SaleDetailsComponent } from './components/secondary_components/sale-details/sale-details.component';
import { PaymentScreenComponent } from './components/secondary_components/payment-screen/payment-screen.component';
import { OrderDetailsComponent } from './components/secondary_components/order-details/order-details.component';

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
        path:'asks',
        loadChildren: ()=> import('./routes/ask.routes').then(route=> route.routes),
        canActivate: [AuthGuardService]
    },
    {
        path:'bids',
        loadChildren: ()=> import('./routes/bids.routes').then(route=> route.routes),
        canActivate: [AuthGuardService]
    },
    {
        path:'sales/:saleId',
        component:SaleDetailsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path:'orders/:orderId',
        component:OrderDetailsComponent,
        canActivate:[AuthGuardService]
    },
    {
        path:'payment',
        component:PaymentScreenComponent,
        canActivate:[AuthGuardService]
    },
    {
        path:'**', redirectTo:'home'
    }

];
