import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  //BehaviourSubject default value is set to '"null"' here in order to create a valid JSON parseable string
  private data$ = new BehaviorSubject('null');
  currentData$: BehaviorSubject<string> = this.data$;

  constructor() {}

  changeData(data: string): void {
    this.data$.next(data);
  }
}
