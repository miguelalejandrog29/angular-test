import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ProductService]
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  titleFilter: string = '';
  limit: number = 10;
  order: string = 'asc';

  constructor(private productServices: ProductService) { }

  ngOnInit() {
    this.showList();
  }

  filterResults() {
    this.titleFilter = this.titleFilter.trim();
    this.showList();
  }

  private showList() {
    this.productServices.get(this.titleFilter == '' ? this.limit?.toString() : '', this.order).subscribe({
      next: (result) => {
        this.products = this.titleFilter == '' ? result : result.filter(
          housingLocation => housingLocation?.title.toLowerCase().includes(this.titleFilter.toLowerCase())
        );
        if (this.titleFilter != '' && this.products.length > this.limit && this.limit > 0) {
          this.products.length = this.limit;
        }
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => { console.log('Complete') }
    });
  }
}
