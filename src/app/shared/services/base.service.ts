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
    private urlGetAll = "GetAll";
    private urlGetById = "GetById";
    private urlGetFirst = "GetFirst";
    private urlSave = "Save";
    private urlDelete = "Delete";
    private urlGetAllLite = "GetAllLite";
    entityName: string = "";

    constructor(public _http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }


    getAll(dataSourceModel?): any {
        return this._http.post(this.baseUrl + 'api/' + this.entityName + '/' + this.urlGetAll, dataSourceModel);
    }

    getFirst(): any {
        return this._http.get(this.baseUrl + 'api/' + this.entityName + '/' + this.urlGetFirst);
    }

    getAllLite(): any {
        return this._http.get(this.baseUrl + 'api/' + this.entityName + '/' + this.urlGetAllLite);
    }

    getById(id: number): any {
        return this._http.get(this.baseUrl + "api/" + this.entityName + '/' + this.urlGetById + '/' + id);
    }

    save(entity) {
        return this._http.post(`${this.baseUrl}api/${this.entityName}/${this.urlSave}/`, entity);
    }

    delete(id) {
        return this._http.delete(this.baseUrl + "api/" + this.entityName + "/" + this.urlDelete + "/" + id);
    }

    deleteFarm(id) {
        this._http.delete(this.baseUrl + "api/" + this.entityName + "/" + this.urlDelete + "/" + id)
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