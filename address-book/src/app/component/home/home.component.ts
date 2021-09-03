import { Component, OnInit } from '@angular/core';
import { Addressbook } from 'src/app/model/addressbook';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public addressDetails: Addressbook[] = [];

  constructor(
    // private httpService: HttpService,
  ) { }

  ngOnInit(): void {
    // this.httpService.getEmployeeData().subscribe(data=> {
    //   this.addressDetails = data.data;
    // });
  }

}
