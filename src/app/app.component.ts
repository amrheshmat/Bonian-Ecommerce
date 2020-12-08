import { Component } from '@angular/core'; 
import { MVCHTMLService } from './shared/services/mvc-html.service'; 
import { TranslatorService } from './shared/services/translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce';
  constructor(private mVCHTMLService: MVCHTMLService, private translatorService:TranslatorService) {
  }
  list: any;
  arabicList:any;
  englishList:any;

  ngOnInit(){ 
    this.getTranslator();
  } 
  




  getView() {
    this.mVCHTMLService.getView().subscribe(res => { 
      document.getElementById('view').innerHTML = res;
    })
  }


  getTranslator(){
    this.translatorService.generateTranslation().subscribe(res => { 
      console.log("translation added")
    })
  } 
  

}
