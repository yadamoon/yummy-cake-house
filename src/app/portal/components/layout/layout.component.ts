import { Component } from '@angular/core';
import { HeaderComponent } from "../common/header/header.component";
import { HomeComponent } from "../home/home.component";
import { FooterComponent } from "../common/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { BannerComponent } from "../banner/banner.component";
import { SearchComponent } from "../search/search.component";
import { CakesComponent } from "../cakes/cakes.component";
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, HomeComponent, FooterComponent, BannerComponent, SearchComponent, CakesComponent, MapComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
