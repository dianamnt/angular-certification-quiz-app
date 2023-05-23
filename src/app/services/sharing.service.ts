import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private data$ = new BehaviorSubject('');
  currentData$ = this.data$;

  constructor() {}

  changeData(data: string): void {
    this.data$.next(data);
  }
}
