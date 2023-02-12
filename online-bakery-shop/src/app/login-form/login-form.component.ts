import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  authForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;

  constructor( private _fb: FormBuilder, private _aurhService: AuthService, private _router: Router){
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);

  }


  ngOnInit(): void {
    this.createForm();
  }
  

  createForm() {
    this.authForm = this._fb.group({
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    this._aurhService.signIn(
      this.email.value,
      this.password.value
    ).then(() => {
      this._router.navigate(['/home']);
    })
    .catch(error => {
      console.error(error);
    });
    
  }
}
