import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginPayload } from '../login-payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginPayload: LoginPayload;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
    this.loginPayload = {
      username: '',
      password: ''
    }
   }

  ngOnInit(): void {
  }

  onSubmit(){
   this.loginPayload.username = this.loginForm.get('username').value;
   this.loginPayload.password = this.loginForm.get('password').value;
   this.authService.login(this.loginPayload).subscribe(data =>{
     if (data){
       console.log('login successful');
       this.router.navigateByUrl('/home');
     }
     else{
       console.log('login-failed');
     }
   });
  }

}
