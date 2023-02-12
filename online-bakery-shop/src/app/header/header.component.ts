import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor( private _authService:AuthService){}

  ngOnInit(): void {
    this.checkLoginStatus();
    window.addEventListener('storage', this.checkLoginStatus.bind(this));
  }

  checkLoginStatus() {
   this.isLoggedIn = !!localStorage.getItem('email');
  }
}
