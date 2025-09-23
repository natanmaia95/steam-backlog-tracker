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

  visible = input(false);
  closePressed = output();

  ngOnInit() {
    //this.apiKey.set()
  }

  onClearPressed() {
    if (confirm("Are you sure you want to clear the settings?")) {
      this.appSettings.clearSettings();
    }
  }

  onClosePressed() {
    this.appSettings.saveSettings();
    this.closePressed.emit();
  }
}
