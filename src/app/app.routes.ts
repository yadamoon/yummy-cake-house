import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './portal/components/layout/layout.component';

export const routes: Routes = [
    {
        path: 'home',
        component: LayoutComponent
    },
    // {
    //     path: 'admin',
    //     loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
    // },
    {
        path: '',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    // {
    //     path: '**',
    //     redirectTo: ''
    // }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

