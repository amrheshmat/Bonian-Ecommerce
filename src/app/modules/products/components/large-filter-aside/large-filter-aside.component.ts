import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { EventEmitter } from '@angular/core'; 
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-large-filter-aside',
  templateUrl: './large-filter-aside.component.html',
  styleUrls: ['./large-filter-aside.component.scss']
})

export class LargeFilterAsideComponent implements OnInit {
  treeControl = new NestedTreeControl<Category>(node => node.ChildCategoryList);
  dataSource = new MatTreeNestedDataSource<Category>();

  categories: Array<Category> = new Array<Category>();
  @Output() onCategorySelected: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _categoryService: CategoryService) {
    
   } 

  ngOnInit(): void {   
    this.getAllCategories(); 
  }

  private getAllCategories() {
    this._categoryService.getAll().subscribe(res => { 
      this.categories = res; 
      this.dataSource.data = this.categories;

    });
  }

  hasChild = (_: number, node: Category) => !!node.ChildCategoryList && node.ChildCategoryList.length > 0;

  public selectCategory(categoryId: number) {
    this.onCategorySelected.emit(categoryId);
  }

}
