import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpHelperService {
    baseUrl: string = "";
    constructor(public _http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }
}