import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { PortalModule } from './portal/portal.module'; // Adjust the path as necessary

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule, // Add HttpClientModule here
        PortalModule // Import the PortalModule here
    ],
    providers: [],
})
export class AppModule { }
