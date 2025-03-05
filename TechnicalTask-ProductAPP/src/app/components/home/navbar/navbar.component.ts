import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Add this line
import { trigger, state, style, transition, animate } from '@angular/animations';
import { JwtService } from '../../../services/jwt.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationStart } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user/user.model';
import { UserService } from '../../../services/user.sevice';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, MatIconModule, CommonModule], // Add CommonModule here
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  isMobile: boolean = false;
  isMenuOpened: boolean = false;
  private routerSubscription: Subscription | null = null;

  userId: string | null = null;
  userRole: string | null = null;

  constructor(private userService: UserService, private jwtService: JwtService, private router: Router, private authService: AuthService) {  }

  ngOnInit(): void {
    this.checkIfMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.checkIfMobile);
    }
    this.checkAuth();
    this.getUserDetails();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.checkAuth(); 
      }
    });
  }
  getUserDetails(): void {
    const decodedToken = this.jwtService.decodeToken();

    if (decodedToken) {
      this.userId = decodedToken.sub;  
      this.userRole = decodedToken.role; 
    }
  }
  // loadAndNavigateToUser(): void {
  //   debugger
  //   if (!this.userId) {
  //     console.error('User ID is missing.');
  //     return;
  //   }
  
  //   this.userService.loadUser(this.userId).subscribe({
  //     next: (user: User) => {
  //       console.log('User data loaded:', user);
  //       this.router.navigate(['/usrprofile'], { state: { user } });
  //     },
  //     error: (err) => {
  //       console.error('Error loading user:', err);
  //       this.router.navigate(['/home']); 
  //     }
  //   });
  // }
  
  
  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.checkIfMobile);
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkIfMobile = () => {
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth <= 768;
      if (!this.isMobile) {
        this.isMenuOpened = false;
      }
    }
  };
  logOut() {
    this.jwtService.removeAuth();
    this.router.navigate(['/login'])
  }
  checkAuth() {
    this.isAuthenticated = this.jwtService.isAuthenticated();
  }
  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }
  closeMenu() {
    this.isMenuOpened = false;
  }

}
