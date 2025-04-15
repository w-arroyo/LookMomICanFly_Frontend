import { Routes } from "@angular/router";
import { ProductSummaryListComponent } from "../components/main_components/product-summary-list/product-summary-list.component";

export const routes: Routes = [
    {
        path:'category/:category',
        component: ProductSummaryListComponent
    },
    {
        path:'search/:product-name',
        component:ProductSummaryListComponent
    },
    {
        path:'best-sellers',
        component:ProductSummaryListComponent
    },
    {
        path:'all',
        component:ProductSummaryListComponent
    }
]