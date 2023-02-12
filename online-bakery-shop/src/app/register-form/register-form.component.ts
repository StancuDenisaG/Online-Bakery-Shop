import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm!: FormGroup;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor( private _fb: FormBuilder, private _authService: AuthService, private _router: Router){
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);

  }


  ngOnInit(): void {
    this.createForm();
  }
  

  createForm() {
    this.registerForm = this._fb.group({
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  }

  onSubmit() {
    if (this.password.value === this.confirmPassword.value){
    this._authService.register(
      this.email.value,
      this.password.value
    )
    this._router.navigate(['home'])
  }
  else {
    console.log('Incorect password')
  }
}
}

