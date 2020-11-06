import { BaseService } from './base.service';

export class TranslationSet {
    public languange: string
    public values: { [key: string]: string } = {}

}

export class TranslatorService extends BaseService {
    controllerName = "ApiPublicTranslator";
    urlGetList = "GetTranslator";
  
  getList(): any {
    return this._http.get(`${this.baseUrl}api/${this.controllerName}/${this.urlGetList}`);
  }

  public languages = ['ger', 'eng']

  public language = 'ger'

  private dictionary: { [key: string]: TranslationSet } = {
    ger: {
      languange: 'ger',
      values: {
        example: 'Beispiel',
      },
    },
    eng: {
      languange: 'eng',
      values: {
        example: 'Example',
      },
    },
  }
  
  translate(key: string): string {
    if (this.dictionary[this.language] != null) {
      return this.dictionary[this.language].values[key]
    }
  }
}