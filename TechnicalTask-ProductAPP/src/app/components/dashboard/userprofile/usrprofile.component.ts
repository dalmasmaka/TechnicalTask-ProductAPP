import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/user.sevice';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtService } from '../../../services/jwt.service';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-navbar',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule
    ],
    templateUrl: './usrprofile.component.html',
    styleUrls: ['./usrprofile.component.css'],
})
export class UsrProfileComponent implements OnInit {
    userProfileForm!: FormGroup;
    userId: string | null = null;
    user: User | null = null;
    isFormDisabled = true;

    constructor(
        private userService: UserService,
        private fb: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private jwtService: JwtService
    ) { }

    ngOnInit(): void {
        this.userProfileForm = this.fb.group({
            id: [{ value: '', disabled: this.isFormDisabled }, Validators.required],
            fullName: [{ value: '', disabled: this.isFormDisabled }, Validators.required],
            email: [{ value: '', disabled: this.isFormDisabled }, [Validators.required, Validators.email]],
            username: [{ value: '', disabled: this.isFormDisabled }, Validators.required]
        });

        this.getUserCurrentUserId();
        // Initialize the form with the current user's data

    }

    getUserCurrentUserId(): void {
        const decodedToken = this.jwtService.decodeToken();

        if (decodedToken) {
            this.userId = decodedToken.sub;
            this.userProfileForm.get('username')?.setValue(decodedToken.username);
            this.userProfileForm.get('fullName')?.setValue(decodedToken.fullName);
            this.userProfileForm.get('email')?.setValue(decodedToken.email);
            this.userProfileForm.get('id')?.setValue(this.userId);
            console.log(this.userProfileForm)
        }
    }


    onSubmit(): void {
        if (this.userProfileForm.valid) {
            this.userService.updateUser(this.userProfileForm.value).subscribe({
                next: (data) => {
                    this.toastr.success('User updated successfully');
                },
                error: (err) => {
                    this.toastr.error('Error updating user data');
                }
            });
        }
    }
    
    // onSubmit(): void {
    //     if (this.userProfileForm.valid) {
    //         const updatedUser: User = this.userProfileForm.value;
    //         console.log('Form Values:', this.userProfileForm.value);
    //         this.userService.updateUser(updatedUser).subscribe({
    //             next: (data) => {
    //                 this.toastr.success('User updated successfully');
    //             },
    //             error: (err) => {
    //                 this.toastr.error('Error updating user data');
    //             }
    //         });
    //     }
    // }

    onChangeAccountInfo(): void {
        this.isFormDisabled = false;
        this.userProfileForm.controls['fullName'].enable();
        this.userProfileForm.controls['email'].enable();
        this.userProfileForm.controls['username'].enable();
        this.userProfileForm.controls['id'].enable();

    }
}
