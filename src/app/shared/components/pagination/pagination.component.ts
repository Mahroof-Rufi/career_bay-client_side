import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges{
  @Input() typeOfEntries!: 'userJobs' | 'employerJobs' | 'userPosts' | 'employerPosts' | 'userUsersProfiles' | 'userEmployersProfiles'
  @Input() currentPageNo!:number
  @Input() maxItemInPerPage!:number
  @Input() totalNoOfEntries!:number
  @Input() noOfShowingEntries!:number
  @Input() theme: 'User theme' | 'Admin theme' = 'User theme'

  from!:number;
  to!:number;

  constructor(
    private readonly _router:Router,
    private readonly _activatedRoute:ActivatedRoute,
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
    this.navigateWithPageNo(this.currentPageNo - 1);
  }

  next() {
    this.navigateWithPageNo(this.currentPageNo + 1);
  }

  private navigateWithPageNo(pageNo: number) {
    const queryParams = { page: pageNo };
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

}
