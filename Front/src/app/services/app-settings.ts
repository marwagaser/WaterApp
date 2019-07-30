import { Injectable } from '@angular/core';
const CONFIG = {
  apiUrl: 'https://waterapp-server.mybluemix.net/',
};
@Injectable()
export class AppSettings {
  constructor() {
  }
  public getApiUrl() {
    return CONFIG.apiUrl;
  }
}
