import { Component } from "@angular/core";
import { User } from "../../../models/user/user.model";
import { UserService } from "../../../services/user.sevice";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DatePipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { Observable } from "rxjs";
import { DeleteComponent } from "./delete/delete.component";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        DatePipe
    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})


export class UsersComponent {

    user$: Observable<User[]>;
    users: User[] = [];
    displayedColumns: string[] = ['id', 'fullName', 'email','loginTimestamp', 'logOutTimestamp', 'actions'];
    
    constructor(
        private dialog: MatDialog, 
        private userService: UserService,
        private toastr: ToastrService,) {
            this.user$ = this.userService.users$;
         }
    ngOnInit(): void {
        this.userService.loadUsers().subscribe((data: User[]) => {
             console.log('Users received:', data);  
             this.users = data;
           });


    }
    deleteUser(userId: string): void {
        const dialogRef = this.dialog.open(DeleteComponent, {
          data: userId  
        });
      
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 'success') {
            this.userService.loadUsers().subscribe((data: User[]) => {
              this.users = data;  
            });
            this.toastr.success('Deleted Successfully');
          }
        });
      }
    
      editUser(user: User): void {
        const dialogRef = this.dialog.open(EditComponent, {
          data: user, 
         
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 'success') {
            this.userService.loadUsers().subscribe(
              (data: User[]) => {
                console.log('Users after updating:', data);  
                this.users = data;  
                this.toastr.success('Updated Successfully')
              },
              (error) => {
                console.error('Error loading users:', error);  
                this.toastr.error('Failed to load users');
              }
            );
          }
        });
      }
      openAddUserDialog(): void {
        const dialogRef = this.dialog.open(CreateComponent);
        dialogRef.afterClosed().subscribe((result) => {
          if (result === 'success') {
            this.userService.loadUsers().subscribe(
              (data: User[]) => {
                this.users = data;  
                this.toastr.success('Added Successfully')
              },
              (error) => {
                console.error('Error loading users:', error);  
                this.toastr.error('Failed to load users');
              }
            );
          }
        });
      }
}