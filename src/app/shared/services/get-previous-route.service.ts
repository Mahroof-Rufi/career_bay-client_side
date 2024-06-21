import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetPreviousRouteService {

  private _previousURL: string = '';
  private _currentURL: string = '';

  constructor(private readonly _router: Router) {
    this._currentURL = this._router.url;

    this._router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this._previousURL = this._currentURL;
      this._currentURL = event.url;
    });
  }

  getPreviousURL(): string {
    return this._previousURL;
  }
}
