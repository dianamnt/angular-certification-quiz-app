import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  private data$ = new BehaviorSubject('default message');
  currentData$ = this.data$;

  constructor() {}

  changeData(data: string) {
    this.data$.next(data);
    console.log('s-o setat');
  }
}
