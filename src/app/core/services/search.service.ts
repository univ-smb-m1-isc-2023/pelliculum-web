import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  private searchResultsSubject = new BehaviorSubject<any[]>([]);
  searchResults$ = this.searchResultsSubject.asObservable();

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  setSearchResults(results: any[]): void {
    this.searchResultsSubject.next(results);
  }
}
