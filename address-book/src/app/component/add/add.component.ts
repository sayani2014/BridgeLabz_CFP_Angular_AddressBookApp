import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Addressbook } from 'src/app/model/addressbook';
import { DataService } from 'src/app/service/data.service';
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

	states: Array<any> = [
    {name: 'West Bengal', 
      cities: [
        { cityName: 'Kolkata' },
        { cityName: 'Asansol' },
        { cityName: 'Howrah' },
        { cityName: 'Haldia' },
      ]},
    {name: 'Maharashtra', 
      cities: [
        { cityName: 'Mumbai' },
        { cityName: 'Pune' },
        { cityName: 'Nagpur' },
      ]},
    {name: 'Tamil Nadu', 
      cities: [
        { cityName: 'Chennai' },
        { cityName: 'Vellore' },
        { cityName: 'Coimbatore' },
      ]},
    {name: 'Delhi', 
      cities: [
        { cityName: 'New Delhi' },
        { cityName: 'Gurugram' },
        { cityName: 'Noida' },
      ]}
  ]; 

	cities: Array<any> = []; 

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    public router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private _snackBar: SnackBarComponent 
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
   * Purpose: This method is called when a person details need to be updated.
   *          this.route.snapshot.params['id'] check the person id send in the url of the edit page.
   *          this.dataService.currentAddress(), when subscribed, fills the edit form with the person details.
   */

  ngOnInit(): void {
    if(this.route.snapshot.params['id'] != undefined) {
      this.dataService.currentAddress.subscribe(address => {
        if(Object.keys(address).length !== 0) {
          this.addressFormGroup.patchValue({
            name:address.name,
            phoneNo:address.zip,
            address:address.address,
            state:address.state,
            city:address.city,
            zip:address.phoneNo
          });
        }
      });
    }
  }

  /**
   * Purpose: changeState() is called whenever the value is selected from the State dropdown.
   *          Each and every state has its own cities customized in it.
   * 
   * @param state name of the state which is selected by the user from the dropdown. 
   */

  changeState(state) { 
		this.cities = this.states.find(stateName => stateName.name == state.value).cities;
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

