import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetSetService {
  private _limit = 151;
  private _offset = 0;

  get limit(): number {
    return this._limit;
  }

  set limit(value: number) {
    this._limit = value;
  }

  get offset(): number {
    return this._offset;
  }

  set offset(value: number) {
    this._offset = value;
  }
}
