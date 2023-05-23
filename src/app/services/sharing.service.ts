import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private data$ = new BehaviorSubject('');
  currentData$: BehaviorSubject<string> = this.data$;

  constructor() {}

  changeData(data: string): void {
    this.data$.next(data);
  }
}
