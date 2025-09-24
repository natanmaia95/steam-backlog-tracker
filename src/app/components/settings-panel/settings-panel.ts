import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppSettings } from '../../services/app-settings';

@Component({
  selector: 'app-settings-panel',
  imports: [FormsModule],
  templateUrl: './settings-panel.html',
  styleUrl: './settings-panel.css'
})
export class SettingsPanel {

  appSettings = inject(AppSettings);

  apiKey = signal('');
  accountId = signal('');

  visible = input(false);
  closePressed = output<boolean>();

  ngOnInit() {
    //this.apiKey.set()
    this.recoverSettings();
  }

  onClearPressed() {
    if (confirm("Are you sure you want to clear the settings?")) {
      this.appSettings.clearSettings();
    }
  }

  onClosePressed() {
    this.recoverSettings();
    this.closePressed.emit(false);
  }

  onApplyPressed() {
    this.applySettings();
    this.appSettings.saveSettings();
    this.closePressed.emit(true);
  }

  recoverSettings() {
    this.apiKey.set(this.appSettings.apiKey());
    this.accountId.set(this.appSettings.accountId());
  }

  applySettings() {
    this.appSettings.apiKey.set(this.apiKey());
    this.appSettings.accountId.set(this.accountId());
  }

  onApiHelpClicked() {
    window.open('https://steamcommunity.com/dev/apikey', '_blank');
  }
  
  onAccountHelpClicked() {
    window.open('https://store.steampowered.com/account/', '_blank');
  }
}
