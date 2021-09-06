import { Component, NgZone, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {
  private config: MatSnackBarConfig;

  constructor(private snackbar: MatSnackBar) {
  }

  /**
   * Purpose: methods opens a dialog-box to display message to the user.
   * 
   * @param message contains success or failure message to be  displayed to the user.
   * @param action basic actions like CLOSE.
   * @param className refers to customized class mentioned in the .scss file.
   *                  Basically, we can provide customized designs to our snackbar. 
   */

  openSnackBar(message: string, action: string, className: string) {
      this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: [className],
    });
  }

  ngOnInit(): void {
  }

}
  
