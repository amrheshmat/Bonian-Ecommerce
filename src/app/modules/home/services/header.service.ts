import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Header } from '../models/header.model';
import { BaseService } from '../../../shared/services/base.service';

@Injectable()
export class HeaderService extends BaseService {

  entityName = "Header";//Controller Name

}
