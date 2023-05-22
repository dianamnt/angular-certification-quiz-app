import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private data$ = new BehaviorSubject('');
  currentData$ = this.data$.asObservable();

  constructor() {}

  setData(data: string) {
    this.data$.next(data);
  }
}
