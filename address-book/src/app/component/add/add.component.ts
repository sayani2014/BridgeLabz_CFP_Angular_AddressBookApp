import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Addressbook } from 'src/app/model/addressbook';
import { HttpService } from 'src/app/service/http.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {

  addressFormGroup: FormGroup;
  public addressbook: Addressbook = new Addressbook();
 
  states: Array<any> = []; 
  stateDetails: Array<any> = [];
	cities: Array<any> = []; 
  id: number;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    public router: Router,
    private route: ActivatedRoute,
    private _snackBar: SnackBarComponent,
  ) {

    this.addressFormGroup = this.fb.group({
      name: new FormControl('', [ Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")] ),
      phoneNo: new FormControl('', [ Validators.required, Validators.pattern("^(6|7|8|9)?[0-9]{9}$")] ),
      address: new FormControl('', [ Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")] ),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]{6}$")] ),
    })   
  }

  /**
   * Purpose: getState() is called when the add-form page is loaded.
   *          It loads the state dropdown with the state name from the database.
   */

  getState(): void {
    this.httpService.getStateDetails().subscribe(data=> {
      this.stateDetails = data.data;
      for(let i = 0; i < this.stateDetails.length; i++) {
        this.states.push(this.stateDetails[i]?.stateName);
      }
    });
  }

  /**
   * Purpose: this.getState() is called everytime the form is loaded in order to get the state value.
   *          this.editform() is called only when the person detail needs to be updated.
   */
  
  ngOnInit(): void {
    this.getState();
    this.editform();    
  }

  /**
   * Purpose: This method is called when a person details need to be updated.
   *          this.route.snapshot.params['id'] check the person id send in the url of the edit page.
   *          this.httpService.getDataByID(), when subscribed, fills the edit form with the person details.
   */


  editform(): void {
    if (this.route.snapshot.params['id'] != undefined) {
      this.id = this.route.snapshot.params['id']
      this.httpService.getDataByID(this.id).subscribe(x => {
        this.addressFormGroup.patchValue(x.data);
        if(x.data.state) {
          this.getCity(x.data.state);
        }
      });
    }  
  }

  /**
   * Purpose: getCity() is called whenever the value is selected from the State dropdown.
   *          Each and every state has its own cities customized in it.
   * 
   * @param state name of the state which is selected by the user from the dropdown. 
   */

  getCity(state) { 
    for(let i = 0; i < this.stateDetails.length; i++) {
      if(this.stateDetails[i]?.stateName === state) {
        this.cities = this.stateDetails[i]?.city;
      }
    }
	}

  /**
   * Purpose: onSubmit() is called for submitting a form during Add or Edit form.
   *          The url is checked initially. If it contains any id value of the person details, then the UPDATE HTTP Method is called.
   *          If the url does not have any id, the the CREATE HTTP Method is called.
   *          Finally a success message is displayed to the user using this._snackBar.openSnackBar().
   *          And the page navigates to the HOME page using the this.router.navigateByUrl().
   */
  
  onSubmit() {
    this.addressbook = this.addressFormGroup.value;
    if(this.route.snapshot.params['id'] != undefined) {
      this.httpService.updateData(this.route.snapshot.params['id'], this.addressbook).subscribe(data=>{
        console.log(data);
        this._snackBar.openSnackBar(data.message,'X','green-snackbar');
        this.router.navigateByUrl("/home"); 
      });
    }
    else { 
      this.httpService.postData(this.addressbook).subscribe(res=>{
        console.log(res); 
          this._snackBar.openSnackBar(res.message,'X','green-snackbar');
          this.router.navigateByUrl("/home");   
      },error => {
        this._snackBar.openSnackBar("Person Details already exist!",'X','red-snackbar');
      });
    }
  }

  /**
   * Purpose: checkError() is called during validation of the form fields.
   * 
   * @param controlName field name for which the method is called.
   * @param errorName error details which is displayed to the user.
   * @returns 
   */

  public checkError = (controlName: string, errorName: string) => {
    return this.addressFormGroup.controls[controlName].hasError(errorName);
  } 
  
}

