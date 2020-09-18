import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import { EventEmitter } from '@angular/core'; 
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];


@Component({
  selector: 'app-large-filter-aside',
  templateUrl: './large-filter-aside.component.html',
  styleUrls: ['./large-filter-aside.component.scss']
})

export class LargeFilterAsideComponent implements OnInit {
  
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  categories: Array<Category> = new Array<Category>();
  @Output() onCategorySelected: EventEmitter<number> = new EventEmitter<number>();
  constructor(private categoryService: CategoryService) {
    this.dataSource.data = TREE_DATA;

   }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  ngOnInit(): void {  
    this.getAllCategories();
  }

  private getAllCategories() {
    this.categoryService.getAll().subscribe(res => {
      this.categories = res;
    });
  }

  public selectCategory(categoryId: number) {
    this.onCategorySelected.emit(categoryId);
  }

}
