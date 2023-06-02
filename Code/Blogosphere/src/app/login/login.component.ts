import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestService } from '../request.service';
import { UserService } from '../UserService';
import { enc, SHA256 } from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';

interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
  userType: string;
  blocked: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginObj: User = {
    userId: 0,
    username: '',
    email: '',
    password: '',
    userType: '',
    blocked: 0
  };

  @ViewChild('wrongCredentialsModal', { static: false }) wrongCredentialsModal!: TemplateRef<any>;

  showWrongCredentialsModal: boolean = false;
  formSubmitted: boolean = false;

  showFormError(): boolean {
    return !this.loginObj.username && !this.loginObj.password;
  }

  constructor(private router: Router, private modalService: NgbModal,private requestService: RequestService,private cookieService: CookieService,private userService: UserService) {
  }

  onLogin(): void {
    this.formSubmitted = true;
  
    if (!this.loginObj || !this.loginObj.username || !this.loginObj.password) {
      console.log('Invalid credentials!');
      return;
    }
  
    const enteredUsername = this.loginObj.username.trim();
    const enteredPassword = this.loginObj.password;
  
    // Check if the username exists
    this.requestService
      .sendRequest(`api/Users/GetByUsername/${enteredUsername}`, 'GET')
      .then((response) => {
        if (!response.success || !response.data) {
          console.log('Invalid credentials!');
          this.handleWrongCredentials();
          return;
        }
  
        // Username exists, verify the login
        this.verifyLogin(enteredUsername, enteredPassword);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }
  
  openWrongCredentialsModal(): void {
    this.modalService.open(this.wrongCredentialsModal, { centered: true });
  }

  closeWrongCredentialsModal(): void {
    this.modalService.dismissAll();
  }

  handleWrongCredentials(): void {
    this.openWrongCredentialsModal();
  }

  users: User[] = [];
  getUsers(): void {
    this.requestService.sendRequest('api/Users/GetAll','GET')
      .then(response => {
        this.users = response.data;
        console.log('Users:', this.users);
      })
      .catch(err => {
        console.error("Error: " + err);
      })
  }

  generateSessionKey(): string {
    const timestamp = Date.now().toString();
    const randomString = Math.random().toString(36).substr(2);
    const sessionKey = timestamp + randomString;
    const encryptedKey = SHA256(sessionKey).toString(enc.Hex);
    return encryptedKey;
  }

  
  verifyLogin(username: string, password: string): void {

    const existingSessionKey = this.cookieService.get('sessionKey');

    if (existingSessionKey) {
      // Session key already exists, handle accordingly (e.g., show error message, redirect to logged-in state)
      console.log('User is already logged in. Please Log out first.');
      return;
    }


    // Perform login verification
    this.requestService
      .sendRequest(`api/Users/VerifyByUsername?UserName=${username}&Password=${password}`, 'GET')
      .then((response) => {
        if (response.success && response.data) {
          console.log(response.data)
          // Login successful

          // Generate a session key for the logged-in user
          const sessionKey = this.generateSessionKey();
          console.log('Session Key:', sessionKey);

          // Create a session in the API
          this.createSession(sessionKey, response.data);
          this.userService.setLoggedInUser(response.data);
        } else {
          // Login failed
          console.log('Invalid credentials!');
          // Handle invalid credentials, display error message, etc.
          this.handleWrongCredentials();
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }

  createSession(sessionKey: string, userId: number): void {
    const url = `api/Sessions/NewSession?SessionKey=${sessionKey}&userId=${userId}`;
    this.requestService
      .sendRequest(url, 'POST')
      .then((response) => {
        if (response.success) {
          // Save the session key in a cookie
          this.cookieService.set('sessionKey', sessionKey);
  
          // Session creation successful
          console.log('Session created successfully!');
          // Redirect to homepage or perform any other actions
          this.router.navigate(['/home']) .then(() => {
            window.location.reload();
          });
          
        } else {
          // Session creation failed
          console.log('Failed to create session!');
          // Handle session creation failure, display error message, etc.
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }
  retrieveUsername(sessionKey: string): void {
    const url = `api/Sessions/FindUser?SessionKey=${sessionKey}`;
    this.requestService.sendRequest(url, 'GET')
      .then((response) => {
        if (response.success && response.data) {
          // Save the user information in the shared service
          this.userService.setLoggedInUser(response.data);

          console.log('Logged-in Username:', response.data.userName);
          // Redirect to the homepage or perform any other actions
          
          this.router.navigate(['/home']);
        } else {
          console.error('Failed to retrieve user data:', response.message);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }
  

  ngOnInit(): void { 
    this.getUsers();
  
    const existingSessionKey = this.cookieService.get('sessionKey');
    if (existingSessionKey) {
      this.retrieveUsername(existingSessionKey);
    }
  }
}