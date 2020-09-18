import { Component } from '@angular/core';
import { MVCHTMLService } from './shared/services/mvc-html.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce';
  constructor(private mVCHTMLService: MVCHTMLService) {
  }

  getView() {
    this.mVCHTMLService.getView().subscribe(res => {
      console.log(res);
      document.getElementById('view').innerHTML = res;
    })
  }

}
