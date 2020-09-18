import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable(
    { providedIn: 'root' }
)
export class BaseService {
    baseUrl: string = "";
    urlGetAll = "GetAll";
    urlGetById = "GetById";
    urlGetFirst = "GetFirst";
    urlSave = "Save";
    urlDelete = "Delete";
    urlGetAllLite = "GetAllLite";
    controllerName: string = "";

    constructor(public _http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }


    getAll(dataSourceModel?): any {
        if (dataSourceModel)
            return this._http.post(this.baseUrl + 'api/' + this.controllerName + '/' + this.urlGetAll, dataSourceModel);
        else
            return this._http.get(this.baseUrl + 'api/' + this.controllerName + '/' + this.urlGetAll);
    }

    getFirst(): any {
        return this._http.get(this.baseUrl + 'api/' + this.controllerName + '/' + this.urlGetFirst);
    }

    getAllLite(): any {
        return this._http.get(this.baseUrl + 'api/' + this.controllerName + '/' + this.urlGetAllLite);
    }

    getById(id: number): any {
        return this._http.get(this.baseUrl + "api/" + this.controllerName + '/' + this.urlGetById + '/' + id);
    }

    save(entity) {
        return this._http.post(`${this.baseUrl}api/${this.controllerName}/${this.urlSave}/`, entity);
    }

    delete(id) {
        return this._http.delete(this.baseUrl + "api/" + this.controllerName + "/" + this.urlDelete + "/" + id);
    }

    deleteFarm(id) {
        this._http.delete(this.baseUrl + "api/" + this.controllerName + "/" + this.urlDelete + "/" + id)
            .subscribe((response: Response) => {
                return response;
            })
            , catchError(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}