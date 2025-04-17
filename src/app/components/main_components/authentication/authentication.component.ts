import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginRequestData } from '../../../models/login.model';
import { UserRegistration } from '../../../models/register.model';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  imports: [CommonModule, FormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit {

  private authenticationService: AuthenticationService;
  private activatedRoute:ActivatedRoute;
  private router: Router;
  isLoginMode = true;
  loginCredentials: LoginRequestData;
  registrationCredentials: UserRegistration;
  emailInput!: string;
  passwordInput!: string;
  errorMessage: string='';
  errorsExist: boolean=false;

  constructor(authenticationService: AuthenticationService, router:Router,activatedRoute:ActivatedRoute){
    this.authenticationService=authenticationService;
    this.router=router;
    this.loginCredentials=new LoginRequestData();
    this.registrationCredentials=new UserRegistration();
    this.activatedRoute=activatedRoute;
  }

  ngOnInit(): void {
    const param=this.activatedRoute.snapshot.paramMap.get('authentication');
    if(param!=null && param==='create-account')
      this.isLoginMode=false;
  }

  switchMode(): void{
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.emailInput='';
    this.passwordInput='';
    this.registrationCredentials.name='';
    if(this.isLoginMode){
      this.router.navigate(['/authentication/login']);
    }
    else this.router.navigate(['/authentication/create-account']);
  }

  authenticate(): void{
    if(this.emailInput.trim()==='' || this.passwordInput.trim()===''){
      this.errorsExist=true;
      this.errorMessage='Empty fields are not allowed.'
    }
    else{
      if(this.isLoginMode){
        this.login();
      }
      else this.registration();
    }
  }

  private login(): void{
    this.loginCredentials.setEmail(this.emailInput);
    this.loginCredentials.setPassword(this.passwordInput);
    this.manageObservable(this.authenticationService.login(this.loginCredentials));
  }

  private registration(): void{
    if(this.registrationCredentials.name.trim()===''){
      this.errorsExist=true;
      this.errorMessage='Empty fields are not allowed.'
    }
    else{
      this.registrationCredentials.setEmail(this.emailInput);
      this.registrationCredentials.setPassword(this.passwordInput);
      this.manageObservable(this.authenticationService.createNewAccount(this.registrationCredentials));
    }
  }

  private manageObservable(observable:Observable<any>): void{
    observable.subscribe({
      next: (data)=>{
        this.router.navigate(['/home']);
      },
      error: (error) =>{
        this.errorsExist=true;
        this.errorMessage=error.message;
      }
    });
  }

}
