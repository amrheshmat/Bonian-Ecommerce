import { BaseService } from './base.service';
 

export class TranslatorService extends BaseService {
    controllerName = "ApiTranslatorGenerator";
    urlGetList = "GenerateTranslationFiles";
  
  generateTranslation(): any { 
    console.log(`${this.baseUrl}api/${this.controllerName}/${this.urlGetList}`)
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetList}`);
  }
 
}