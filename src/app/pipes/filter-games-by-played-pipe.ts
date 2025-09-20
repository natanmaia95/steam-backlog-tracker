import { inject, Pipe, PipeTransform } from '@angular/core';
import { ProgressTracker } from '../services/progress-tracker';
import { SteamUserGame } from '../model/steam-user-game.interface';

@Pipe({
  name: 'filterGamesByPlayed'
})
export class FilterGamesByPlayedPipe implements PipeTransform {
  progressTracker = inject(ProgressTracker);

  transform(games: SteamUserGame[], played: boolean, active: boolean): SteamUserGame[] {
    if (!active) return games;

    return games.filter((game) => {
      return this.progressTracker.getPlayed(game.appid) == played;
    })
  }

}
