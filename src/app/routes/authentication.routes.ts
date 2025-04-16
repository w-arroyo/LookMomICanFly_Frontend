import { Routes } from "@angular/router";
import { AuthenticationComponent } from "../components/main_components/authentication/authentication.component";

export const routes:Routes=[
    {
        path:'',
        component:AuthenticationComponent
    },
    {
        path:':authentication',
        component:AuthenticationComponent
    }
]