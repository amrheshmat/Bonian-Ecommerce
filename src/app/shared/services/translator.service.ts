import { BaseService } from './base.service';
 

export class TranslatorService extends BaseService {
    controllerName = "ApiPublicTranslator";
    urlGetList = "GetTranslator";
  
  getList(): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetList}`);
  }
 
}