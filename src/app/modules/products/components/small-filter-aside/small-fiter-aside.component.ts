import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-small-filter-aside',
  templateUrl: './small-fiter-aside.component.html',
  styleUrls: ['./small-filter-aside.component.scss']
})
export class SmallFilterAsideComponent implements OnInit {

  categories: Array<Category> = new Array<Category>();
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories() {
    this.categoryService.getAll().subscribe(res => {
      this.categories = res;
    });

  }
}
