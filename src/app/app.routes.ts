import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './portal/components/layout/layout.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { AuthGuard } from './core/auth.guard';
import { SignupComponent } from './auth/components/signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: SigninComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'home',
        component: LayoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard]
    },
    // {
    //     path: 'auth',
    //     loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    // },
    {
        path: '**',
        redirectTo: '/'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

