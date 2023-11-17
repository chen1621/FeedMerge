import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';


@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  state = AuthenticatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;
  constructor() {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void { }

  onResetClick(resetEmail:HTMLInputElement){
    let email = resetEmail.value;
    if(this.isNotEmpty(email)){
      this.firebasetsAuth.sendPasswordResetEmail(
        {
          email: email,
          onComplete: (err) => {
            alert(`Reset email sent to ${email}`);
          }
        }
      )
    }
  }

  onLogin(
    loginEmail: HTMLInputElement,
    loginPassword: HTMLInputElement
  ){
    let email = loginEmail.value;
    let password = loginPassword.value;

    if( this.isNotEmpty(email) && this.isNotEmpty(password)){
      this.firebasetsAuth.signInWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            alert("Logged In");
          },
          onFail: (err) => {
            alert("Incorrect email or password. Please try again.");
          }
        }
      )
    }
  }

  onRegisterClick(
    registerEmail: HTMLInputElement,  /* For the type of each parameter, set it to HTML input element, */
    registerPassword: HTMLInputElement,   /* since we are referencing input elements. */
    registerConfirmPassword: HTMLInputElement
  ){
    let email = registerEmail.value;    /* Inside the function, get the value of each input */
    let password = registerPassword.value;
    let confirmPassword = registerConfirmPassword.value;

    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmPassword) &&
      this.isAMatch(password, confirmPassword)
    ){
      this.firebasetsAuth.createAccountWith(    /* To create an account, grab the firebasetsAuth object*/
      {                                       /* and call the createAccountWith function */
        email: email,                             /* The first two properties are for the email and password */
        password: password,
        onComplete: (uc) => {                 /* The next two properties are for the callback functions onComplete and onFail */
          alert("Account Created")
          registerEmail.value = "";           /* Reset each input when it completes and creates the account */
          registerPassword.value = "";
          registerConfirmPassword.value = "";
        },
        onFail: (err) => {
          alert("Failed to create the account.");
        }
      }
    )
    }

  }

  isNotEmpty(text: string){                         /* To check if the email and password is not empty */
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith: string){     /* To check if the password and confirmPassword is the same */
    return text == comparedWith;
  }
  

  onForgotPasswordClick() {
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick() {
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick() {
    this.state = AuthenticatorCompState.LOGIN;
  }


  isForgotPasswordState() {
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }
  isRegisterState() {
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isLoginState() {
    return this.state == AuthenticatorCompState.LOGIN;
  }


  getStateText() {
    switch(this.state) {
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.REGISTER:
        return "Register";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot Password";
    }
  }
  
}


export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
