import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.sevice';
import { User } from '../../../../models/user/user.model';
@Component({
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: User 
  ) {
    this.userForm = this.fb.group({
      id: [this.data.id, Validators.required],  
      fullName: [this.data.name, [Validators.required, Validators.min(1)]],
      email: [this.data.email,[Validators.required, Validators.email]],
    });
    this.userForm.patchValue(this.data);

  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }
    const updatedUser: User = this.userForm.value;

    this.userService.updateUser(updatedUser).subscribe({
      next: () => this.dialogRef.close('success'),
      error: () => this.dialogRef.close('error'),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  
}