import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductService } from "../../service/products/product.service";
import { Cake } from "../../../portal/model/cake.model";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  productForm!: FormGroup;
  products: any[] = [];
  isEditMode = false;
  editingProductId: number | null = null;
  imagePreview: string | null = null;

  // Define categories here (you can later fetch from the API if needed)
  categories: string[] = ['Cake', 'Pastry', 'Cookie', 'Cupcake', 'Beverage'];

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadProducts();
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: [''],
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addOrUpdateProduct(): void {
    if (this.productForm.invalid) return;

    const product = this.productForm.value;
    if (this.isEditMode && this.editingProductId !== null) {
      this.productService.updateProduct(this.editingProductId, product).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    } else {
      // const fd = new FormData()
      // fd.append('name', product.name);
      this.productService.addCake(product).subscribe((result) => {
        console.log('Product added successfully', result);
        this.loadProducts();
        this.resetForm();
      });
    }
  }

  editProduct(product: any): void {
    this.productForm.patchValue(product);
    this.imagePreview = product.image || null;
    this.isEditMode = true;
    this.editingProductId = product.id;
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }

  resetForm(): void {
    this.productForm.reset();
    this.isEditMode = false;
    this.editingProductId = null;
    this.imagePreview = null;
  }

  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}