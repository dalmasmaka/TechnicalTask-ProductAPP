import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Add this line
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, MatIconModule, CommonModule], // Add CommonModule here
  styleUrls: ['./navbar.component.css'],
  // animations: [
  //   trigger('menuAnimation', [
  //     state('open', style({
  //       opacity: 1,
  //       height: '*',
  //       overflow: 'hidden',
  //     })),
  //     state('closed', style({
  //       opacity: 0,
  //       height: '0px',
  //       overflow: 'hidden',
  //     })),
  //     transition('open <=> closed', [
  //       animate('5s ease-in-out'),
  //     ])
  //   ])
  // ]
})
export class NavbarComponent implements OnInit {
  isMobile: boolean = false;
  isMenuOpened: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.checkIfMobile();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.checkIfMobile);
    }
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.checkIfMobile);
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

  toggleMenu() {
    this.isMenuOpened = !this.isMenuOpened;
  }
  closeMenu() {
    this.isMenuOpened = false; 
  }
}
