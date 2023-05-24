import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  @ViewChild('passwordErrorModal') passwordErrorModal!: ElementRef;
  @ViewChild('errorModal') errorModal!: ElementRef;
  
  signupObj: any = {
    userName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  isSubmitted: boolean = false;

  passwordMatchError: boolean = false;
  formFieldsError: boolean = false;
  modalRef: NgbModalRef | undefined;

  constructor(private modalService: NgbModal) {}

  onSignUp(): void {
    this.passwordMatchError = this.signupObj.password !== this.signupObj.passwordConfirmation;
    this.formFieldsError = this.isFormFieldEmpty();


    if (this.passwordMatchError) {
      this.openPasswordErrorModal();
      return;
    }
    if (this.formFieldsError) {
      this.openErrorModal();
      return;
    }

  
    // Retrieve existing user information list from local storage
    let userList = localStorage.getItem('userList');
    let parsedUserList = userList ? JSON.parse(userList) : [];

    // Push the new user information into the list
    parsedUserList.push(this.signupObj);
    // Store the updated user information list in local storage
    localStorage.setItem('userList', JSON.stringify(parsedUserList));
    // Clear form fields after successful registration
    this.signupObj = {
      userName: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    };

    this.isSubmitted = true; // Set the form submission status to true
  }

  openPasswordErrorModal(): void {
    if (this.passwordErrorModal) {
      this.modalRef = this.modalService.open(this.passwordErrorModal, { ariaLabelledBy: 'passwordErrorModalTitle' });
    }
  }
  openErrorModal(): void {
    if (this.errorModal) {
      this.modalRef = this.modalService.open(this.errorModal, { ariaLabelledBy: 'errorModalTitle' });
    }
  }
  closeErrorModal(): void {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.modalRef = undefined;
    }
  }

  closePasswordErrorModal(): void {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.modalRef = undefined;
    }
  }
  onPasswordConfirmationInput(): void {
    this.passwordMatchError = this.signupObj.password !== this.signupObj.passwordConfirmation;
  }
  isFormFieldEmpty(): boolean {
    return (
      !this.signupObj.userName ||
      !this.signupObj.email ||
      !this.signupObj.password ||
      !this.signupObj.passwordConfirmation
    );
  }
}
