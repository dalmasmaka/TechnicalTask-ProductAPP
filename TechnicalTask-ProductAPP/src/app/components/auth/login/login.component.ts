import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';  
import { LottieAnimationComponent } from '../../lottie/lottie.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    LottieAnimationComponent,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

}
