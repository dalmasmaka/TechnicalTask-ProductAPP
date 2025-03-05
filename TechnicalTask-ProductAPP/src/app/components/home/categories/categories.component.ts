import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/categories/categories.model';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  standalone:true,
  selector: 'app-category',
  templateUrl: './categories.component.html',
  imports: [
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  styleUrls: ['./categories.component.css']
})
export class CategoryComponent implements OnInit {

  category$: Observable<Category[]>;

  categories: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'createdBy', 'createdAt', 'actions'];

  constructor(private dialog: MatDialog, private categoryService: CategoryService, private toastr: ToastrService) {
    this.category$ = this.categoryService.categories$;
  }
  ngOnInit(): void {
    
    this.categoryService.loadCategories().subscribe((data: Category[]) => {
      console.log('Categories received:', data);  // Check the data received
      this.categories = data; // Store the data in the component property
    });
  }
  deleteCategory(category: Category): void {
    console.log('Category passed to dialog:', category);
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: category  // Pass the entire category object instead of just the id
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.categoryService.loadCategories().subscribe((data: Category[]) => {
          this.categories = data;  // Update the categories list after deletion
        });
        this.toastr.success('Deleted Successfully');
      }
    });
  }

  editCategory(category: Category): void {
    const dialogRef = this.dialog.open(EditComponent, {
      data: category, // Pass the category data to the dialog
     
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.categoryService.loadCategories().subscribe(
          (data: Category[]) => {
            console.log('Categories after updating:', data);  // Log the response from the service
            this.categories = data;  // Update the categories list after deletion
            this.toastr.success('Updated Successfully')
          },
          (error) => {
            console.error('Error loading categories:', error);  // Handle error scenario
            this.toastr.error('Failed to load categories');
          }
        );
      }
    });
  }
  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.categoryService.loadCategories().subscribe(
          (data: Category[]) => {
            this.categories = data;  
            this.toastr.success('Added Successfully')
          },
          (error) => {
            console.error('Error loading categories:', error);  // Handle error scenario
            this.toastr.error('Failed to load categories');
          }
        );
      }
    });
  }
}