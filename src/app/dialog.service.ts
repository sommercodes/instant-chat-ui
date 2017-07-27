import { Observable } from 'rxjs/Rx';
import { SignupDialogComponent } from './login/signup-dialog/signup-dialog.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MdDialogRef<SignupDialogComponent>;

        dialogRef = this.dialog.open(SignupDialogComponent);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
