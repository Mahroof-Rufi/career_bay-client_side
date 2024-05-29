import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges{
  @Input() typeOfEntries!: 'userJobs' | 'employerJobs' | 'userPosts' | 'employerPosts'
  @Input() currentPageNo!:number
  @Input() maxItemInPerPage!:number
  @Input() totalNoOfEntries!:number
  @Input() noOfShowingEntries!:number

  from!:number;
  to!:number;

  constructor(
    private readonly _router:Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPageNo'] || changes['totalNoOfEntries'] || changes['noOfShowingEntries']) {
      this.updatePaginationInfo();
    }
  }

  updatePaginationInfo() {    
    this.from = (this.currentPageNo - 1) * this.maxItemInPerPage + 1;
    this.to = Math.min(this.currentPageNo * this.maxItemInPerPage, this.totalNoOfEntries);
  }

  prev() {
    switch (this.typeOfEntries) {
      case 'employerJobs':
        this._router.navigateByUrl(`/employer/jobs?page=${this.currentPageNo - 1}`)
        break;
      case 'employerPosts':
        this._router.navigateByUrl(`/employer/posts?page=${this.currentPageNo - 1}`)
        break;
      case 'userJobs':
        this._router.navigateByUrl(`/user/jobs?page=${this.currentPageNo - 1}`)
        break;
      case 'userPosts':
        this._router.navigateByUrl(`/user/posts?page=${this.currentPageNo - 1}`)
        break;
    }
  }

  next() {
    switch (this.typeOfEntries) {
      case 'employerJobs':
        this._router.navigateByUrl(`/employer/jobs?page=${this.currentPageNo + 1}`)
        break;
      case 'employerPosts':
        this._router.navigateByUrl(`/employer/posts?page=${this.currentPageNo + 1}`)
        break;
      case 'userJobs':
        this._router.navigateByUrl(`/user/jobs?page=${this.currentPageNo + 1}`)
        break
      case 'userPosts':
        this._router.navigateByUrl(`/user/posts?page=${this.currentPageNo + 1}`)
        break;
    }
  }

}