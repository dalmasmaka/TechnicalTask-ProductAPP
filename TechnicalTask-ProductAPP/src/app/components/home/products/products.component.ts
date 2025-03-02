import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/products/products.service';  
import { ProductDTO } from '../../../models/products/products.model';  
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator'; 

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  

  ngOnInit(): void {
    
  }


}
