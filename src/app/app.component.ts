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
  convert(){
    this.arabicList.forEach(element => { 
      element = Object.assign({}, element); 
      console.log(element)
    })
  }




  getView() {
    this.mVCHTMLService.getView().subscribe(res => { 
      document.getElementById('view').innerHTML = res;
    })
  }
  getTranslator(){
    this.translatorService.getList().subscribe(data => {
      this.list = data;
      this.arabicList = data[1];
      this.englishList =  data[2];
      this.convert()
    }) 
  } 
  

}
