import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Variable to handle Authentication Responses
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) { }

  // Get our token from Storage
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');

    if (!out) {
      return '';
    }

    return out;
  }

  // Save our token to Storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout and remove JWT
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Determine if user is logged in and token is valid
  public isLoggedIn(): boolean {
    const token: string = this.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  // Get current user information from JWT
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));

    return { email, name } as User;
  }

  // Login method that leverages the login method in tripDataService 
  // Because that method returns an observable, we subscribe to the  
  // result and only process when the Observable condition is satisfied 
  // Uncomment the two console.log messages for additional debugging 
  // information.

  public login(user: User, passwd: string) : void { 
    this.tripDataService.login(user,passwd) 
      .subscribe({ 
        next: (value: any) => { 
          if(value) 
          { 
            console.log(value); 
            this.authResp = value; 
            this.saveToken(this.authResp.token); 
          } 
        }, 
        error: (error: any) => { 
          console.log('Error: ' + error); 
        } 
      }) 
  }  
 
  // Register method that leverages the register method in 
    // tripDataService


    // Because that method returns an observable, we subscribe to the  
  // result and only process when the Observable condition is satisfied 
  // Uncomment the two console.log messages for additional debugging 
  // information. Please Note: This method is nearly identical to the 
  // login method because the behavior of the API logs a new user in 
  // immediately upon registration 
  public register(user: User, passwd: string) : void { 
    this.tripDataService.register(user,passwd) 
      .subscribe({ 
        next: (value: any) => { 
          if(value) 
          { 
            console.log(value); 
            this.authResp = value; 
            this.saveToken(this.authResp.token); 
          } 
        }, 
        error: (error: any) => { 
          console.log('Error: ' + error); 
        } 
      }) 
  }  
}
