import { Component, inject, signal } from '@angular/core';
import { SteamUserGame } from '../../model/steam-user-game.interface';
import { SteamApi } from '../../services/steam-api';
import { GameListItem } from '../../components/game-list-item/game-list-item';
import { FormsModule } from '@angular/forms';
import { FilterGamesByNamePipe } from '../../pipes/filter-games-by-name-pipe';
import { ProgressTracker } from '../../services/progress-tracker';
import { FilterGamesByPlayedPipe } from "../../pipes/filter-games-by-played-pipe";

@Component({
  selector: 'app-game-list',
  imports: [GameListItem, FormsModule, FilterGamesByNamePipe, FilterGamesByPlayedPipe],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css'
})
export class GameList {

  progressTracker = inject(ProgressTracker);
  steamApi = inject(SteamApi)
  games = signal<Array<SteamUserGame>>([]);

  loaded = signal(false);
  failed = signal(false);

  searchTerm = signal('');
  filterNotPlayed = signal(false);



  ngOnInit() {
    this.loadGames();
  }

  async loadGames() {
    var loadSuccessful = await this.steamApi.loadGamesFromSteam();

    if (!loadSuccessful) {
      this.failed.set(true);
      return;
    }
      
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.loaded.set(true);
    this.games.set(this.steamApi.ogSteamGames());
  }

  onPlayedChanged(appId:number, checked:boolean) {
    this.progressTracker.setPlayed(appId, checked);
    console.log(appId, checked);
  }
}
