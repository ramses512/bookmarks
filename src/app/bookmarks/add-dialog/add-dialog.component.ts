import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Bookmark } from '../bookmark.interface';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
})
export class AddDialogComponent implements OnInit {
  bookmarkForm = new FormGroup({
    name: new FormControl('', Validators.required),
    url: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
      ),
    ]),
    group: new FormControl('', Validators.required),
  });
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: Bookmark
  ) {}

  ngOnInit(): void {}
  public save(): void {
    if (this.bookmarkForm.valid) {
      this.ngZone.run(() => {
        this.dialogRef.close(this.bookmarkForm.value);
      });
    }
  }
}
