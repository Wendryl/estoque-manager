import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public displayMobileNavbar: boolean = false;
  public navClass: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleNavbar(): void {
    this.displayMobileNavbar == true ? this.displayMobileNavbar = false : this.displayMobileNavbar = true;
  }

}
