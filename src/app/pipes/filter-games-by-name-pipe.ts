import { Pipe, PipeTransform } from '@angular/core';
import { SteamUserGame } from '../model/steam-user-game.interface';

@Pipe({
  name: 'filterGamesByName'
})
export class FilterGamesByNamePipe implements PipeTransform {

  transform(games: SteamUserGame[], searchTerm: string): SteamUserGame[] {
    if (!searchTerm) return games;

    let filterTerm = searchTerm.toLowerCase().trim();
    return games.filter((game) => {
      return game.name.toLowerCase().includes(filterTerm);
    })
  }
}
