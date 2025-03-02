import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login';
import { RegisterComponent } from './components/auth/register/register';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/home/categories/categories';
import { ProductsComponent } from './components/home/products/products.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch:'full'},
    //{ path: 'products', component: ProductsComponent },
    {path: 'register', component: RegisterComponent},
    { path: 'products', component: ProductsComponent },
    { path: 'categories', component: CategoryComponent },
    {
        path: 'home', component: HomeComponent, children: [
            // { path: 'products', component: ProductsComponent },
            // { path: 'categories', component: CategoryComponent },
         ]
        // ], canActivate: [AuthGuard]
    }
];
