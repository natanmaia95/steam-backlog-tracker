
import { inject, Injectable, signal } from '@angular/core';
import { SteamUserGame } from '../model/steam-user-game.interface';
import { AppSettings } from './app-settings';

@Injectable({
  providedIn: 'root'
})
export class SteamApi {
  
  appSettings = inject(AppSettings);

  #API_KEY = '';//environment.API_KEY;
  #ACCOUNT_ID = '';//environment.STEAM_ACCOUNT_ID;

  #URL_STEAM = '/steamapi'; //"http://api.steampowered.com";
  #URL_STORE = "http://store.steampowered.com";

  ogSteamGames = signal<Array<SteamUserGame>>([])
  //steamGames = signal([])

  //parsedSteamGames = signal<Array<SteamUserGame>>([]);

  async loadGamesFromSteam() {
    if (this.#API_KEY == '') this.#API_KEY = this.appSettings.apiKey();
    if (this.#ACCOUNT_ID == '') this.#ACCOUNT_ID = this.appSettings.accountId();

    if (!this.#ACCOUNT_ID || !this.#API_KEY) {
      alert("Please enter a Steam ID and ensure API key is set.\nYou can set those up in the settings on the top right.");
      return false;
    }

    //let url = `/steamapi/IPlayerService/GetOwnedGames/v1/?key=${this.#API_KEY}&steamid=${this.#ACCOUNT_ID}&include_appinfo=true&include_played_free_games=true&format=json`
    let url = this.#URL_STEAM + "/IPlayerService/GetOwnedGames/v1/";
    url += `?key=${this.#API_KEY}&steamid=${this.#ACCOUNT_ID}`;
    url += "&include_appinfo=true&include_played_free_games=true&format=json";
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);
    // this.ogSteamGames.set(data.response.games);

    this.ogSteamGames.set(data.response.games.map((game:SteamUserGame) => {
      return {
        ...game,
        img_icon_url: game.img_icon_url
          ? `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
          : 'https://placehold.co/90',
      }
    }))

    return true;
  }

}
