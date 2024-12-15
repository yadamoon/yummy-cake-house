import { CommonModule } from '@angular/common';
import { Cake } from '../../model/cake.model';
import { CakeService } from './../../service/cake.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cakes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit {
  @Input() term: string = '';
  cakes: Cake[] = [];
  filteredCakes: Cake[] = [];
  currentPage: number = 1;
  cakesPerPage: number = 6;
  displayedCakes: Cake[] = [];

  constructor(private cakeService: CakeService) { }

  ngOnInit(): void {
    this.getAllCakes();

  }

  getAllCakes() {
    this.cakeService.getCakes().subscribe((cakes) => {
      this.cakes = cakes;
      this.displayedCakes = cakes
      this.filteredCakes = cakes; // Initialize filtered cakes
    });
    // this.updateDisplayedCakes();

  }

  filterCakes(searchTerm: string, cakeType: string) {
    console.log("search term on filter :>> ", searchTerm);
    if (searchTerm === '') {
      // this.filteredCakes = this.cakes;
      this.getAllCakes()
      return;
    }
    this.filteredCakes = this.cakes.filter(cake => {
      const matchesSearch = cake.name.toLowerCase().includes(searchTerm.toLowerCase());
      // const matchesType = cakeType ? cake.type.toLowerCase() === cakeType.toLowerCase() : true;
      return matchesSearch;
    });
    this.currentPage = 1; // Reset to first page on new filter
    this.updateDisplayedCakes();
    console.log("filtered cakes :>> ", this.filteredCakes);
    // this.cakes = this.filteredCakes;
    this.displayedCakes = this.filteredCakes;
  }


  updateDisplayedCakes() {
    const startIndex = (this.currentPage - 1) * this.cakesPerPage;
    const endIndex = startIndex + this.cakesPerPage;
    // this.displayedCakes = this.filteredCakes.slice(startIndex, endIndex);
    console.log("current cakes :>> ", this.cakes);

    // this.displayedCakes = this.cakes.slice(startIndex, endIndex);
    this.displayedCakes = this.cakes.slice(startIndex, endIndex);
    console.log("current displayed cakes :>> ", this.displayedCakes);

  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedCakes();

  }

  get totalPages() {
    return Math.ceil(this.filteredCakes.length / this.cakesPerPage);
  }

  //added cake to cart
  addToCart(cake: Cake) {
    console.log("cake :>> ", cake);
    // Implement your logic to add the cake to the cart
    // For example, you can store the selected cake in a service or local storage
  }
}