import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public store(key: string, value: any) {
    localStorage[key] = JSON.stringify(value);
  }

  public load(key: string, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
  }
}
