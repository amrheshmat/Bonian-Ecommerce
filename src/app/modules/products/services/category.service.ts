import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Category } from '../models/category.model';
 
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    baseUrl: string = "";
    private urlGetAll = "GetAll";
    private urlGetById = "GetById";
    private urlSave = "Save";
    private urlDelete = "Delete";
    private urlGetAllLite = "GetAllLite";
    entityName: string = "";

    constructor(public _http: HttpClient) {
        this.baseUrl = environment.apiUrl;
    }
    
    getAll(): Category[]{
        return [
          {Id:1,CategoryName:"Category A",ParentCategoryId:null},
          {Id:3,CategoryName:"Category B",ParentCategoryId:null},
          {Id:4,CategoryName:"Category C",ParentCategoryId:null},
          {Id:5,CategoryName:"Category D",ParentCategoryId:1},
          {Id:8,CategoryName:"Category E",ParentCategoryId:4},
          
        ]
    }

    getAllLite(): any {
        return this._http.get(this.baseUrl + 'api/' + this.entityName + '/' + this.urlGetAllLite);
        // //     .subscribe((response: Response) => response.json())
        // //     , catchError(this.errorHandler);
    }

    getById(id: number): any {
        return this._http.get(this.baseUrl + "api/" + this.entityName + '/' + this.urlGetById + '/' + id);
        // .subscribe((response: Response) => response.json())
        // , catchError(this.errorHandler);
    }

    save(entity) {
        return this._http.post(`${this.baseUrl}api/${this.entityName}/${this.urlSave}/`, entity);
    }

    delete(id) {
        return this._http.delete(this.baseUrl + "api/" + this.entityName + "/" + this.urlDelete + "/" + id);
        // .subscribe((response: Response) => response.json())
        // , catchError(this.errorHandler);
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