import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { apis } from '../../../admin/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup
  constructor (private fb: FormBuilder, private user: apis, private router: Router) {
    this.loginForm = this.fb.group({
      email: [],
      password: []
    })
  }
  submitForm() {
    console.log('form', this.loginForm.value);
    this.user.login(this.loginForm.value).subscribe((res: any) => {
      console.log('ssss', res);
      if (res.data) {
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        if (localStorage.getItem('token')) {
          this.router.navigate(['/admin/page'])
        }
      }
    })
  }
}
