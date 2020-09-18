import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Category } from '../models/category.model';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class CategoryService extends BaseService {

  controllerName: string = "apiinventory";
  urlGetAll = "getallcategories"
}