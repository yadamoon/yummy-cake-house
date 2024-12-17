import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './components/lists/lists.component';
import { UsersComponent } from './components/users/users.component';
import { ReportComponent } from './components/report/report.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminLayoutComponent } from './components/layout/layout.component';
import { AddCakesComponent } from './components/add-cakes/add-cakes.component';
import { CakeDashboardComponent } from './components/dashbord/dashbord.component';
import { OrderComponent } from './components/order/order.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProductsComponent } from './components/products/products.component';

// import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: CakeDashboardComponent
      },
      {
        path: 'list',
        component: ListsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'report',
        component: ReportComponent
      },
      {
        path: 'Add-cake',
        component: AddCakesComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'inventory',
        component: InventoryComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      }
      ,
      {
        path: '**',
        redirectTo: 'dashboard'
      }

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
