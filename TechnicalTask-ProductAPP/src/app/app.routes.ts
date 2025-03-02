import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CategoryComponent } from './components/home/categories/categories';
import { ProductsComponent } from './components/home/products/products.component';
import { ForgotComponent } from './components/auth/forgot/forgot.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch:'full'},
    //{ path: 'products', component: ProductsComponent },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    { path: 'products', component: ProductsComponent },
    { path: 'forgotpassword', component: ForgotComponent },
    { path: 'categories', component: CategoryComponent },
    {
        path: 'home', component: HomeComponent, children: [
            // { path: 'products', component: ProductsComponent },
            // { path: 'categories', component: CategoryComponent },
         ]
        // ], canActivate: [AuthGuard]
    }
];
