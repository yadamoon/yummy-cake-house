import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/products/product.service';
import { Product } from '../../../portal/model/product.model';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../../../shard/components/toast/toast.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productForm!: FormGroup;
  products: Product[] = [];
  isEditMode = false;
  editingProductId: number | null = null;
  imagePreview: string | null = null;
  categories: string[] = ['Cake', 'Pastry', 'Cookie', 'Cupcake', 'Beverage'];


  isModalOpen: boolean = false;
  selectedImage: string = '';
  @ViewChild(ToastComponent) toast!: ToastComponent;
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
      image: [null],
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
      console.log("products", this.products);

    });
  }

  addOrUpdateProduct(): void {

    if (this.productForm.invalid) return;

    const product: Product = this.productForm.value;
    console.log("product", product)
    if (this.isEditMode && this.editingProductId !== null) {
      console.log("update");

      this.productService.updateProduct(this.editingProductId, product).subscribe(() => {
        this.loadProducts();
        this.resetForm();
      });
    } else {
      console.log("add");

      this.productService.addCake(product).subscribe(() => {
        console.log("inside addOrUpdateProduct", product)
        this.loadProducts();
        setTimeout(() => {
          this.toast.showToast('Product added successfully', 'success');
        }, 200);
        this.resetForm();
      });
    }
  }

  editProduct(product: Product): void {
    this.productForm.patchValue(product);
    this.imagePreview = product.image || null;
    this.isEditMode = true;
    // this.editingProductId = product.id;
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
      setTimeout(() => {
        this.toast.showToast('Product deleted successfully', 'success');
      }, 200);
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
      this.productForm.patchValue({ image: file });
    }
  }
  openModalImage(imageUrl: string): void {
    this.selectedImage = imageUrl;
    this.isModalOpen = true;
    console.log("img", this.selectedImage);
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedImage = '';
  }
}
