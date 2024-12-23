import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../common/header/header.component";
import { FooterComponent } from "../common/footer/footer.component";
import { SearchComponent } from "../search/search.component";
import { CakesComponent } from "../cakes/cakes.component";
import { Cake } from '../../model/cake.model';
import { CakeService } from '../../service/cake.service';
import { BannerComponent } from '../banner/banner.component';
import { HomeComponent } from '../home/home.component';
import { MapComponent } from '../map/map.component';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/reducers/auth.reducer';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterModule, BannerComponent, HomeComponent, MapComponent, SearchComponent, CakesComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  cakes: Cake[] = [];
  filteredCakes: Cake[] = [];
  searchTerm: string = "";
  @ViewChild(CakesComponent) cakesComponent!: CakesComponent;

  constructor(private cakeService: CakeService, private store: Store<{ auth: AuthState }>, private router: Router) { }

  ngOnInit(): void {
    // this.getAllCakes();

  }

  // getAllCakes() {
  //   this.cakeService.getCakes().subscribe((cakes) => {
  //     this.cakes = cakes;
  //     this.filteredCakes = cakes; // Initialize filtered cakes
  //     this.cakesComponent.filteredCakes = this.cakes; // Pass initial cakes
  //   });
  // }

  onSearchTermChanged(searchTerm: string) {
    this.searchTerm = searchTerm;
    console.log("search term changed", this.searchTerm);
    this.filterCakes();

  }

  onCakeTypeChanged(cakeType: string) {
    this.filterCakes(cakeType);
  }

  filterCakes(cakeType: string = '') {
    this.cakesComponent.filterCakes(this.searchTerm, cakeType);
  }
}