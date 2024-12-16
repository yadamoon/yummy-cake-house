import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from '../store/reducers/cart.reducer';

@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule,
    // Combine all reducers in one object
    StoreModule.forRoot({
      cart: cartReducer,

    }),
  ],
})
export class PortalModule { }
