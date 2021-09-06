import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Addressbook } from '../model/addressbook';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /**
   * BehaviorSubject is a variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.
   */

  private addressSource = new BehaviorSubject(new Addressbook());
  currentAddress = this.addressSource.asObservable();

  constructor() { }

  /**
   * changeAddress() is called when the update function is called. 
   * This method basically replaces the empty space of the add page with the object of the Address Book person details.
   * 
   * @param addressbook object of the person details having the specific id.
   */

  changeAddress(addressbook: Addressbook) {
    this.addressSource.next(addressbook);
  }
}
