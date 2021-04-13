import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { SearchResultRoutingModule } from './search-result-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({}),
    SearchResultRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SearchResultModule { }
