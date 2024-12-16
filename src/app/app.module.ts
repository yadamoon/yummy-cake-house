import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { PortalModule } from './portal/portal.module'; // Adjust the path as necessary
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/reducers/cart.reducer';


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        PortalModule,// Register the reducer
        StoreModule.forRoot({ cart: cartReducer })
    ],
    providers: [],
})
export class AppModule { }
