import { MdDialogRef } from '@angular/material';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'signup-dialog.component.html',
    providers: [ LoginService ]
})
export class SignupDialogComponent {

    public title: string;
    public message: string;
    complexForm : FormGroup;


    constructor(private LoginService: LoginService, fb: FormBuilder, public dialogRef: MdDialogRef<SignupDialogComponent>) {
      this.complexForm = fb.group({
        // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
        'username' : ['', Validators.required],
        'password': ['', Validators.required]
      });
    }

    createUser(value: any):void{
      this.complexForm.reset();
      this.LoginService.createUser(value.username, value.password)
        .subscribe(
          data => { });
      this.dialogRef.close();

    }
}
