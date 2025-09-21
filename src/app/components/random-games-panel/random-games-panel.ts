import { Component, inject, input, output } from '@angular/core';
import { SteamUserGame } from '../../model/steam-user-game.interface';
import { GameListItem } from '../game-list-item/game-list-item';
import { ProgressTracker } from '../../services/progress-tracker';

@Component({
  selector: 'app-random-games-panel',
  imports: [GameListItem],
  templateUrl: './random-games-panel.html',
  styleUrl: './random-games-panel.css'
})
export class RandomGamesPanel {
  progressTracker = inject(ProgressTracker);

  games = input<Array<SteamUserGame>>([]);
  visible = input(true);

  closePressed = output();

  onClosePressed() {
    this.closePressed.emit();
  }
}
