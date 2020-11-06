import { Component } from '@angular/core';
import { Translator } from './shared/models/translator.model';
import { MVCHTMLService } from './shared/services/mvc-html.service';
import { TranslatorService } from './shared/services/translator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce';
  constructor(private mVCHTMLService: MVCHTMLService,private translatorService :TranslatorService) {
  }
  list: Translator;
  ngOnInit(){ 
    this.getTranslator();
  }
  
  getTranslator(){
    this.translatorService.getList().subscribe(data => {
      this.list = data;
      this.list.ar = data[1];
      this.list.en =  data[2]
      console.log(this.list.ar)
      console.log(this.list.en)
    }) 
  } 
  
  getView() {
    this.mVCHTMLService.getView().subscribe(res => {
      console.log(res);
      document.getElementById('view').innerHTML = res;
    })
  }

}
