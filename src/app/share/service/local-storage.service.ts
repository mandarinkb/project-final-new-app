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
    this.storage.get(key).then((data) => {this.dataStorage = data; });
    return this.dataStorage;
  }

  clearStorage() {
    this.storage.clear();
  }
}
