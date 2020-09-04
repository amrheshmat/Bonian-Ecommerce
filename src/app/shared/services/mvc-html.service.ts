import { Injectable, Inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable(
)
export class MVCHTMLService {
    baseUrl: string = "";

    constructor(public _http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }

    getView(): any {
        return this._http.get(`${this.baseUrl}Stuffs/MvcStuff2`, { responseType: 'text' });
    }

}