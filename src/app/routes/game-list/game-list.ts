import { Component, inject, signal } from '@angular/core';
import { SteamUserGame } from '../../model/steam-user-game.interface';
import { SteamApi } from '../../services/steam-api';
import { GameListItem } from '../../components/game-list-item/game-list-item';
import { FormsModule } from '@angular/forms';
import { FilterGamesByNamePipe } from '../../pipes/filter-games-by-name-pipe';
import { ProgressTracker } from '../../services/progress-tracker';
import { FilterGamesByPlayedPipe } from "../../pipes/filter-games-by-played-pipe";
import { NgClass } from '@angular/common';
import { RandomGamesPanel } from '../../components/random-games-panel/random-games-panel';
import { SettingsPanel } from "../../components/settings-panel/settings-panel";
import { AppSettings } from '../../services/app-settings';


@Component({
  selector: 'app-game-list',
  imports: [GameListItem, FormsModule, FilterGamesByNamePipe, FilterGamesByPlayedPipe, NgClass, RandomGamesPanel, SettingsPanel],
  templateUrl: './game-list.html',
  styleUrl: './game-list.css'
})
export class GameList {

  progressTracker = inject(ProgressTracker);
  steamApi = inject(SteamApi);
  appSettings = inject(AppSettings);
  games = signal<Array<SteamUserGame>>([]);

  loaded = signal(false);
  failed = signal(false);

  randomGamesVisible = signal(false);
  randomGames = signal<Array<SteamUserGame>>([]);

  settingsVisible = signal(false);

  searchTerm = signal('');
  filterNotPlayed = signal(false);

  nameFilter = signal('Only Not Played');

  ngOnInit() {
    this.appSettings.loadSettings();
    this.loadGames();
  }

  async loadGames() {
    this.loaded.set(false);
    this.failed.set(false);
    try {
      var loadSuccessful = await this.steamApi.loadGamesFromSteam();

      if (!loadSuccessful) {
        this.failed.set(true);
        return;
      }
    } catch(error) {
      console.log(error);
      this.failed.set(true);
      return;
    }

      
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.loaded.set(true);
    this.games.set(this.steamApi.ogSteamGames());
  }

  onPlayedChanged(appId:number, checked:boolean) {
    this.progressTracker.setPlayed(appId, checked);
  }

  showRandomGames() {
    var unplayedGames = this.games().filter((game) => {
      return this.progressTracker.getPlayed(game.appid) == false;
    })

    this.randomGames.set(unplayedGames
      .sort((_a, _b) => 0.5 - Math.random())
      .slice(0,3)
    );

    this.randomGamesVisible.set(true);
  }

  hideRandomGames() {
    this.randomGamesVisible.set(false);
  }

  showSettings() {
    this.settingsVisible.set(true);
  }

  hideSettings(didApply:boolean) {
    this.settingsVisible.set(false);
    if (didApply) {
      this.loadGames();
      console.log('reloading');
    }
  }
}
