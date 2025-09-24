import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettings {

  accountId = signal<string>('');

  loadSettings() {
    let savedAccountId = localStorage.getItem("accountId");
    if (savedAccountId) this.accountId.set(savedAccountId);
  }

  saveSettings() {
    localStorage.setItem('accountId', this.accountId());
  }

  clearSettings() {
    localStorage.setItem('apiKey', '');
    localStorage.setItem('accountId', '');
    this.accountId.set('');
  }
}
