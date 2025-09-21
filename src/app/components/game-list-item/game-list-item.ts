import { Component, input, output, signal } from '@angular/core';
import { SteamUserGame } from '../../model/steam-user-game.interface';

@Component({
  selector: 'app-game-list-item',
  imports: [],
  templateUrl: './game-list-item.html',
  styleUrl: './game-list-item.css'
})
export class GameListItem {
  colorTop = signal('rgba(131, 209, 255, 0.3)');
  colorMid = signal('rgba(11, 106, 138, 0.8)');
  colorBottom = signal('rgba(4, 56, 99, 1)');

  game = input.required<SteamUserGame>();
  played = input<boolean>(false);

  playedChanged = output<boolean>();

  onCheckboxChanged(checked: boolean) {
    this.playedChanged.emit(checked);
  }
}
