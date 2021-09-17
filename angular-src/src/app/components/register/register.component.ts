import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'; 
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name !: String;
  email !: String;
  username !: String;
  password !: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }
    if(!this.validateService.validateRegister(user)){
      console.log('Please fill in all feilds!');
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      console.log('Please use valid email!');
      return false;
    }
    this.authService.registerUser(user).subscribe(data => {
      if(data){
        console.log('Your are now registered!');
        this.router.navigate(['/login']);
      }
      else{
        console.log('Someting went wrong!');
        this.router.navigate(['/register']);
      }
    });
    return true;

  }

}
