import { Component, input, output, signal } from '@angular/core';
import { SteamUserGame } from '../../model/steam-user-game.interface';

@Component({
  selector: 'app-game-list-item',
  imports: [],
  templateUrl: './game-list-item.html',
  styleUrl: './game-list-item.css'
})
export class GameListItem {
  colorTop = signal('rgba(179, 233, 255, 0.5)');
  colorBottom = signal('rgba(47, 94, 109, 1)');

  game = input.required<SteamUserGame>();
  played = input<boolean>(false);

  playedChanged = output<boolean>();

  onCheckboxChanged(checked: boolean) {
    this.playedChanged.emit(checked);
  }
}
