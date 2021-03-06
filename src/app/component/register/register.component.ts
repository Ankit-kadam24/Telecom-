import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Request } from '../../interface/request';
import { ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  signup(): void {
    this.authService.register(this.signupForm.value).subscribe((msg) => {
      console.log(msg);
      this.router.navigate(["/login"]);
    });
  }
}


   
 /**  showModal: boolean = false;
  registerForm!: FormGroup;;
  submitted = false;
  constructor(private formBuilder: FormBuilder) { }
  show()
  {
    this.showModal = true; 
  }

  
  hide()
  {
    this.showModal = false;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        number: ['', [Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        name: ['',[Validators.required]]

    });
}
// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }
onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }
}

}*/
