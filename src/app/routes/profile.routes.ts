import { Routes } from "@angular/router"
import { ProfileComponent } from "../components/main_components/profile/profile.component"

export const routes:Routes=[
    {
        path:'', redirectTo: 'profile'
    },
    {
        path:':section',
        component:ProfileComponent
    },
    {
        path:'addresses/add',
        component:ProfileComponent
    }
]