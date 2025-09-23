import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSettings {

  apiKey = signal<string>('');
  accountId = signal<string>('');

  loadSettings() {
    let savedApiKey = localStorage.getItem("apiKey");
    let savedAccountId = localStorage.getItem("accountId");
    if (savedApiKey) this.apiKey.set(savedApiKey);
    if (savedAccountId) this.accountId.set(savedAccountId);
  }

  saveSettings() {
    localStorage.setItem('apiKey', this.apiKey());
    localStorage.setItem('accountId', this.accountId());
  }

  clearSettings() {
    localStorage.setItem('apiKey', '');
    localStorage.setItem('accountId', '');
    this.apiKey.set('');
    this.accountId.set('');
  }
}
