import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  
  searchInput = new FormControl();

  constructor(

  ) {}

  ngOnInit(): void {
    // this.searchInput.valueChanges.pipe(
    //   debounceTime(500), 
    //   distinctUntilChanged(), 
    //   switchMap(query => this.searchService.search(query))
    // ).subscribe(
    //   results => this.store.dispatch(SearchActions.searchSuccess({ results })),
    //   error => this.store.dispatch(SearchActions.searchFailure({ error }))
    // );

  }

}
