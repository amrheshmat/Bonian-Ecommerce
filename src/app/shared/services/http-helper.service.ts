import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpHelperService {
    baseUrl: string = "";
    imageUrl: string;
    constructor(public _http: HttpClient) {
        this.baseUrl ="http://Test.boniantech.com/ecommerce/";
        this.imageUrl = "https://test.boniantech.com/erp/Api/ApiAttachment/DownloadImage";
    }
}