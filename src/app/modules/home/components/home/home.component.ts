import { Component, OnInit } from '@angular/core';   
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  previousUrl: string;
  constructor(public router: Router) { 
   
  }
  
  ngOnInit(): void {
   
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.previousUrl = event.url;
    });
  }


}
