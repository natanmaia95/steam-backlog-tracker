import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SteamApi } from './services/steam-api';
import { GameList } from "./routes/game-list/game-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('steam-play-tracker');

  steamApi = inject(SteamApi);

  // ngOnInit() {
  //   this.steamApi.loadGamesFromSteam();
  // }
}
