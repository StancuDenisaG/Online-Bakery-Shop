import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor( private _authService:AuthService, private _router: Router){}

  ngOnInit(): void {
    this.checkLoginStatus();
    window.addEventListener('storage', this.checkLoginStatus.bind(this));
  }

  checkLoginStatus() {
   this.isLoggedIn = !!localStorage.getItem('email');
  }

  login(){
    this._router.navigate(['login']);
  }

  logout(){
    this._authService.logout()
    this._router.navigate(['home'])
}
}