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

    constructor() {
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
 
}