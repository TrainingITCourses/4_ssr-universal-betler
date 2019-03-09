import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  //@Output() public searchFilters = {estado:'', agencia:'', tipo:''};
  @Output() public searchFilters = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  public search (currentFilter){
    this.searchFilters = currentFilter;
  }
}