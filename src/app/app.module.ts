import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { PortalModule } from './portal/portal.module'; // Adjust the path as necessary
import { provideStore, StoreModule } from '@ngrx/store';
import { cartReducer } from './store/reducers/cart.reducer';

import { bootstrapApplication } from '@angular/platform-browser';

import { provideStoreDevtools } from '@ngrx/store-devtools';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        PortalModule,// Register the reducer
        StoreModule.forRoot({ cart: cartReducer })
    ],
    providers: [
        provideStore(),
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
            connectInZone: true // If set to true, the connection is established within the Angular zone
        })
    ],
})
export class AppModule { }
