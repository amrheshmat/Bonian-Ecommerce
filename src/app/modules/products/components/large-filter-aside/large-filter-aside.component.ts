import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-large-filter-aside',
  templateUrl: './large-filter-aside.component.html',
  styleUrls: ['./large-filter-aside.component.scss']
})
export class LargeFilterAsideComponent implements OnInit {

  categories: Array<Category> = new Array<Category>();
  @Output() onCategorySelected: EventEmitter<number> = new EventEmitter<number>();
  constructor(private categoryService: CategoryService) { }

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