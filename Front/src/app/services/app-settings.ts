import { Injectable } from '@angular/core';
const CONFIG = {
  apiUrl: 'http://127.0.0.1:3000/',
};
@Injectable()
export class AppSettings {
  constructor() {
  }
  public getApiUrl() {
    return CONFIG.apiUrl;
  }
}
