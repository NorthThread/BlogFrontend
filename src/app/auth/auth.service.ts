import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService} from 'ngx-webstorage'
import { map } from 'rxjs/operators';
import { JwtAuthResponse } from './jwt-auth-response';
import { RegisterPayload } from './register-payload';
import { LoginPayload } from './login-payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080/api/"

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) { 
    
  }
  register(registerPayload: RegisterPayload): Observable<any>{
    return this.httpClient.post(this.url + "signup",registerPayload);
  }

  login(loginPayload: LoginPayload):Observable<boolean>{
    return this.httpClient.post<JwtAuthResponse>(this.url + 'login', loginPayload).pipe(map( data =>{
      this.localStorageService.store('authenticationToken', data.authenticationToken);
      this.localStorageService.store('username', data.username);
      return true;

    }));
  }

  isAuth(): Boolean{
    return this.localStorageService.retrieve('username') != null;
  }
  logout() {
    this.localStorageService.clear('authenticationToken');
    this.localStorageService.clear('username');
  }
}
