import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) { }

  showToast(message: string, toastClass?: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: [toastClass]
    });
  }
}
