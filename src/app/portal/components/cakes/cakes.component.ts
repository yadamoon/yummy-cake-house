import { CommonModule } from '@angular/common';
import { Cake } from '../../model/cake.model';
import { CakeService } from './../../service/cake.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-cakes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cakes.component.html',
  styleUrl: './cakes.component.css'
})
export class CakesComponent implements OnInit {

  cakes: Cake[] = [];

  cakeService = inject(CakeService);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllCakes();
  }
  getAllCakes() {
    this.cakeService.getCakes().subscribe((cakes) => {
      this.cakes = cakes;
      console.log("all cakes ", cakes)
    });
  }
}