import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppSettings } from '../../services/app-settings';
import { Tooltip } from "../tooltip/tooltip";

@Component({
  selector: 'app-settings-panel',
  imports: [FormsModule, Tooltip],
  templateUrl: './settings-panel.html',
  styleUrl: './settings-panel.css'
})
export class SettingsPanel {

  appSettings = inject(AppSettings);

  accountId = signal('');

  visible = input(false);
  closePressed = output<boolean>();

  ngOnInit() {
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
    this.accountId.set(this.appSettings.accountId());
  }

  applySettings() {
    this.appSettings.accountId.set(this.accountId());
  }

  onAccountHelpClicked() {
    window.open('https://store.steampowered.com/account/', '_blank');
  }
}
