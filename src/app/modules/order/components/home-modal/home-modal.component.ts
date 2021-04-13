import {  Subject } from 'rxjs'
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.component.html',
  styleUrls: ['./home-modal.component.scss']
})
export class HomeModalComponent {
    public onClose: Subject<boolean>;

    constructor(public bsModalRef: BsModalRef,public dialogRef: MatDialogRef<HomeModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    public ngOnInit(): void {
        this.onClose = new Subject();
    }

    public onConfirm(): void {
        this.onClose.next(true);
        this.bsModalRef.hide();
    }

    public onCancel(): void {
        this.onClose.next(false);
        this.bsModalRef.hide();
    }
}