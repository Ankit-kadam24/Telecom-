import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup} from '@angular/forms';

import { FormControl } from '@angular/forms';
//import { AuthService } from '../Services/auth-guard.service';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Request } from '../../interface/request';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      number: new FormControl( ['', [Validators.required, Validators.minLength(10)]],),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  login(): void {
    this.authService
      .login(this.loginForm.value.name, this.loginForm.value.password)
      .subscribe();
  }
}


  /** 
  showModal: boolean = false;
  registerForm!: FormGroup;;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }
 
  
 // show()
   //{
    //this.showModal = true; 
  //}
  
  hide()
  {
    this.showModal = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        number: ['', [Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
}

get f() { return this.registerForm.controls; }
onSubmit() {
    this.submitted = true;
    
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }
}
}
*/