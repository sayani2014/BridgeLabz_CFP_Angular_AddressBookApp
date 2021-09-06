import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Addressbook } from 'src/app/model/addressbook';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public addressDetails: Addressbook[] = [];

  constructor(
    private httpService: HttpService,
    private router: Router,
    private dataService: DataService,
    private _snackBar: SnackBarComponent
  ) { }

  /**
   * Purpose: Ability to fetch data from the database.
   */

  ngOnInit(): void {
    this.httpService.getData().subscribe(data=> {
      this.addressDetails = data.data;
    });
  }

  /**
   * Purpose: Ability to remove data from the database.
   *          this._snackBar.openSnackBar() provides the success message to the user.
   *          this.ngOnInit() refreshes the HOME page.
   * 
   * @param address whichever person is required to be removed from the database,
   *                its id is send along with the remove method.
   */

  remove(address: Addressbook) {
    this.httpService.deleteData(address.id).subscribe(data=> {
      console.log(data);
      this._snackBar.openSnackBar(data.message,'X','green-snackbar');
      this.ngOnInit();
    });
  }

  /**
   * Purpose: Ability to update data from the database.
   *          this.router.navigateByUrl() navigates to the edit form page along with the person details.
   * 
   * @param address whichever person is required to be removed from the database,
   *                its id is send along with the remove method.
   */

  update(address: Addressbook) {
    this.dataService.changeAddress(address);  
    this.router.navigateByUrl('/edit/' +address.id);
  }
}
