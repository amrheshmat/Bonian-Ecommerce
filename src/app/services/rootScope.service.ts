import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class RootScopeService {
    data: any;
    dataChange: Observable<any>;
    dataChangeObserver: any;
    theDataSource: Observable<any>;

    constructor() {
      this.dataChange = new Observable((observer: Observer<any>) => {
        this.dataChangeObserver = observer;
      });
    }
  
    setData(data:any) {
      this.data = data;
      this.dataChangeObserver.next(this.data);
    }
  }