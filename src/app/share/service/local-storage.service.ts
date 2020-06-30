import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  dataStorage: any;
  constructor(private storage: Storage) { }

  setStorage(key: string , value: any) {
    return this.storage.set(key, value);
  }

  getStorage(key: string) {
    return this.storage.get(key);
  }

  clearStorage() {
    this.storage.clear();
  }
}
