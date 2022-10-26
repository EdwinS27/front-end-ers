import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.css']
})
export class LogCardComponent implements OnInit {
  focus: String = "none";
  user:User = {
    userId: 0,
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  }
  verification = {    
    usernameAvail: false,
    emailAvail: false,
    passwordsMatch: false,
    namesAreValid: false
  }
  input = {
    username: "",
    email: '',
    pass: '',
    passVerify: '',
    firstName: '',
    lastName: '',
  }
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    // if user is not signed in => display this card

    // else set the visibility to none
  }

  logInOption(): void {
    /*
      On selection of this option we might want to hide these buttons and display a log in form, with a submit or go back button
    */
    this.toggleOptions();
  }

  toggleOptions(): void {
    let elOptions: HTMLElement | null = document.getElementById("optionsLog");
    let clickedOptions: HTMLElement | null = document.getElementById("clickedOptions");
    if(elOptions && clickedOptions){
      if(elOptions.style.getPropertyValue("visibility") == "visible"){
        elOptions.style.setProperty("visibility", "hidden");
        elOptions.style.setProperty("display", "none");
        clickedOptions.style.setProperty("visibility", "visible");
        clickedOptions.style.setProperty("display", "block");
      }
      else if(elOptions.style.getPropertyValue("visibility") == "hidden"){
        elOptions.style.setProperty("visibility", "visible");
        elOptions.style.setProperty("display", "block");
        clickedOptions.style.setProperty("visibility", "hidden");
        clickedOptions.style.setProperty("display", "none");
      }
      else{
        elOptions.style.setProperty("visibility", "hidden");
        elOptions.style.setProperty("display", "none");
        clickedOptions.style.setProperty("visibility", "visible");
        clickedOptions.style.setProperty("display", "block");
      }
    }
  }

  revealLogIn(): void {
    let registerElement : HTMLElement | null = document.getElementById("login-option");
    if(registerElement){
      if(registerElement.style.getPropertyValue("display") == "none"){
        this.focus = "login";
        registerElement.style.setProperty("visibility", "visible");
        registerElement.style.setProperty("display", "block");
      }
      else if(registerElement.style.getPropertyValue("display") == "block"){
        registerElement.style.setProperty("visibility", "hidden");
        registerElement.style.setProperty("display", "none");
      }
      else{
        this.focus = "login";
        registerElement.style.setProperty("visibility", "visible");
        registerElement.style.setProperty("display", "block");
      }
    }
    this.toggleOptions();
  }

  revealSignUp(): void {
    let registerElement : HTMLElement | null = document.getElementById("signup-option");
    if(registerElement){
      if(registerElement.style.getPropertyValue("display") == "none"){
        this.focus = "register";
        registerElement.style.setProperty("visibility", "visible");
        registerElement.style.setProperty("display", "block");
      }
      else if(registerElement.style.getPropertyValue("display") == "block"){
        registerElement.style.setProperty("visibility", "hidden");
        registerElement.style.setProperty("display", "none");
      }
      else{
        this.focus = "register";
        registerElement.style.setProperty("visibility", "visible");
        registerElement.style.setProperty("display", "block");
      }
    }
    this.toggleOptions();
  }

  verifyLogin(): void {
    this.authService.loginUser(this.input.username, this.input.pass)
    .subscribe({
      /*
        Upon logging in -> we shall save the userId + username to the localStorage / session.
        this will also remove the log in / sign up part of the page and it will reveal the next part of SPA
      */
    });
  }

  return(): void {
    if(this.focus == "register") this.revealSignUp();
    else if(this.focus == "login") this.revealLogIn();
    else this.focus = "none";  // ?
    this.focus = "none";
  }

  verifyRegister(): void {
    // we are going to verify that the user can register with these inputs
    
    // we are going to verify that the username is valid
    // we are going to check that this username is not taken
    this.userService.validUsernameCheck(this.input.username)
        .subscribe(data => {
          this.verification.usernameAvail = data;
    });
    this.userService.validEmailCheck(this.input.email)
        .subscribe(data => {
          this.verification.emailAvail = data;
    });
    
    // we are going to verify that the user's passwords are matching

    if(this.input.pass == this.input.passVerify)
        this.verification.passwordsMatch = true;

    if(this.input.firstName != ''  && this.input.firstName.length > 0 && this.input.lastName != null && this.input.lastName.length > 0)
        this.verification.namesAreValid = true;

    this.registerUser()
  }

  registerUser(): void {    
    // if all checks pass we are going to create a new user
    let finalCheck = false;
    if(this.verification.emailAvail == true && this.verification.passwordsMatch == true && this.verification.usernameAvail == true && this.verification.namesAreValid == true) {
      this.user.email = this.input.email;
      this.user.username = this.input.username;
      this.user.password = this.input.pass;
      this.user.firstName = this.input.firstName;
      this.user.lastName = this.input.lastName;
      finalCheck = true;
      console.log(finalCheck)
    }
    else{
      console.log(finalCheck)
      this.resetFields();
    }
    if(finalCheck)
    console.log("registering user")
    this.authService.registerUser(this.user)
      .subscribe(data => {
        console.log(data);
      })
  }

  resetFields(): void {
    this.input.email = '';
    this.input.username = '';
    this.input.pass = '';
    this.input.passVerify = '';
    this.input.firstName = '';
    this.input.lastName = '';
    this.verification.usernameAvail = false;
    this.verification.emailAvail = false;
    this.verification.passwordsMatch = false;
    this.verification.namesAreValid = false;
  }

}
