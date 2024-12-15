
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] // Fixed typo here
})
export class SearchComponent {
  @Output() searchTermChanged = new EventEmitter<string>();
  @Output() cakeTypeChanged = new EventEmitter<string>();

  searchTerm: string = '';
  selectedType: string = '';

  onSearchChange() {
    this.searchTermChanged.emit(this.searchTerm);
  }

  onTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
    this.cakeTypeChanged.emit(this.selectedType);
  }
}