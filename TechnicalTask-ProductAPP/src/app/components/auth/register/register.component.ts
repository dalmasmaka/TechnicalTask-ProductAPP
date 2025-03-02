import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
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
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
   

}
