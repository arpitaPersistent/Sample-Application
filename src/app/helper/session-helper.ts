import { Injectable } from '@angular/core';

@Injectable()
export class SessionHelper {
    private _storage: Storage;

    constructor() {
        this._storage = localStorage;
    }

    set(key: string, value: any) {
        this._storage.setItem(key, value);
    }

    get(key: string) {
        const item = this._storage.getItem(key);
        if (!item || item === 'undefined' || item === null) { return null };
        return (item);
    }
    removeItem(key: string) {
    this._storage.removeItem(key);
  }

  setByStringify(key: string, value: any) {
    this._storage.setItem(key, JSON.stringify(value));
  }
  getByParse(key: string) {
    const item = this._storage.getItem(key);
    if (!item || item === 'undefined' || item === null) { return null };
    return JSON.parse(item);
  }


}
