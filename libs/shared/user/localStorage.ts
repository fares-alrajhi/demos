import {Injectable} from '@angular/core';
import {AppComponent} from '../../../apps/custmer/src/app/app.component';
import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  clear(): void {
    if(typeof window !== 'undefined'){
      localStorage.clear();
    }
  }

  getItem(key: string): any {
    if(typeof window !== 'undefined'){
      return localStorage.getItem(key);
    }
  }

  key(index: number): string | null {
    return localStorage.key(index);
  }

  removeItem(key: string): void {
    return localStorage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }
}