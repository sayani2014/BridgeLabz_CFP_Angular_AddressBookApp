import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Addressbook } from '../model/addressbook';
import { catchError } from 'rxjs/operators';
import { SnackBarComponent } from '../component/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseURL: string = "http://localhost:8090/address-book/";

  constructor(
    private httpClient: HttpClient,
    private _snackBar: SnackBarComponent 
    ) { }

  /**
   * Purpose : Error message to be displayeed to the user.
   * 
   * @returns error message.
   */

  private handleError() {
    return (error: HttpErrorResponse) => {
      let errorMessage = 'Unknown error!';
      // if (error.error instanceof ErrorEvent) {
      //   // Client-side errors
      //   errorMessage = `Error: ${error.error.message}`;
      // } else {
      //   // Server-side errors
      //   errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      // }
      // window.alert(errorMessage);

      let checkError:number = 0;
      if(`${error.status}` === checkError.toString()) {
        errorMessage = "Server temporarily unavailable!";
      }
      for (let i = 400; i < 500; i++ ) {
        if(`${error.status}` === i.toString()) {
          errorMessage = "Client Error!";
        }
      }
      for (let i = 500; i < 512; i++ ) {
        if(`${error.status}` === i.toString()) {
          errorMessage = "Server Error!";
        }
      }
      
      this._snackBar.openSnackBar(errorMessage,'X','red-snackbar');
      return throwError(errorMessage);
    }
  }

  /**
   * Purpose: Fetch data from the database.
   * 
   * @returns success or error message.
   */

  getData(): Observable<any> {
    return this.httpClient.get(this.baseURL + "getAddressDetails").pipe(catchError(this.handleError()));
  }

  /**
   * Purpose: Add data to the database.
   * 
   * @param data object of person details to be added in the Address Book DB.
   * @returns success or error message.
   */

  postData(data): Observable<any> {
    console.log(data);
    return this.httpClient.post(this.baseURL + "addAddressDetails", data).pipe(catchError(this.handleError()));
  }

  /**
   * Purpose: Delete data from the database.
   * 
   * @param id person id whose details need to be deleted.
   * @returns success or error message.
   */

  deleteData(id): Observable<any> {
    return this.httpClient.delete(this.baseURL + "deleteAddressDetails",{
      headers: new HttpHeaders(),
      params: new HttpParams().append('id', id),
    }).pipe(catchError(this.handleError()));
  }

  /**
   * Purpose: Updata data in the database.
   * 
   * @param id person id whose details need to be updated.
   * @param data person data object whose details need to be updated.
   * @returns success or error message.
   */

  updateData(id: number, data: Addressbook): Observable<any> {
    return this.httpClient.put(this.baseURL + "updateAddressDetails?id=" +id, data).pipe(catchError(this.handleError()));
  }

}

