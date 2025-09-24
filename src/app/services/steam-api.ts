
import { inject, Injectable, signal } from '@angular/core';
import { SteamUserGame } from '../model/steam-user-game.interface';
import { AppSettings } from './app-settings';

@Injectable({
  providedIn: 'root'
})
export class SteamApi {
  
  appSettings = inject(AppSettings);

  #ACCOUNT_ID = '';//environment.STEAM_ACCOUNT_ID;

  ogSteamGames = signal<Array<SteamUserGame>>([])

  //parsedSteamGames = signal<Array<SteamUserGame>>([]);

  

  // CHANGE THIS FUNCTION TO MAKE IT PORTABLE ON ANOTHER BACKEND
  getRequestUrl(mode:string, input:any) {
    let baseUrl = 'https://steamtracker.natanmaia95apps.com.br/';
    let url = '';
    if (mode == 'ownedgames') {
      // url = `/steamapi/IPlayerService/GetOwnedGames/v1/?key=${input.apiKey}&steamid=${input.accountId}&include_appinfo=true&include_played_free_games=true&format=json`
      url = baseUrl + "steam-proxy/ownedgames/" + `?accountId=${input.accountId}`; 
    }

    return url;
  };

  validateAccountId(id:string): boolean {
    //must be a number
    if (!isNaN(Number(id))) return false;

    //must have 17 digits
    if (id.length != 17) return false;

    return true;
  }

  async loadGamesFromSteam() {
    this.#ACCOUNT_ID = this.appSettings.accountId();

    if (!this.#ACCOUNT_ID || !this.validateAccountId(this.#ACCOUNT_ID)) {
      alert("Please enter a valid Steam ID on the settings on the top right. It's a 17 digit number below your Steam nickname.");
      throw new Error("No valid Account ID.")
      return false;
    }

    //let url = `/steamapi/IPlayerService/GetOwnedGames/v1/?key=${this.#API_KEY}&steamid=${this.#ACCOUNT_ID}&include_appinfo=true&include_played_free_games=true&format=json`
    // let url = this.#URL_STEAM + "/IPlayerService/GetOwnedGames/v1/";
    // url += `?key=${this.#API_KEY}&steamid=${this.#ACCOUNT_ID}`;
    // url += "&include_appinfo=true&include_played_free_games=true&format=json";

    let url = this.getRequestUrl('ownedgames', {accountId: this.#ACCOUNT_ID});
    console.log('request URL: ', url);

    try {
      const response = await fetch(url);
      const textData = await response.text(); // Read the body once as text.

      console.log("response text: ", textData);

      // Check for HTTP status code errors (e.g., 401, 403, 404, 500)
      if (!response.ok) {
        const errorMessage = `API_FETCH_ERROR: HTTP Status ${response.status} - ${response.statusText}.`;
        console.error('API Error Response:', textData);
        // We can't guarantee a JSON body, so just use the text data
        throw new Error(`${errorMessage} Details: ${textData}`);
      }

      // Handle successful response
      let data;
      try {
        data = JSON.parse(textData); // Manually parse the text as JSON
      } catch (jsonParseError) {
        console.error('JSON Parse Error:', jsonParseError);
        throw new Error(`JSON_PARSE_ERROR: Failed to parse API response as JSON.`);
      }

      // 4. Validate the structure of the successful JSON response
      // The API returns an object with a 'response' property, which then has 'games'
      // if (!data || !data.response || !Array.isArray(data.response.games)) {
      //   console.error('Unexpected API response structure:', data);
      //   throw new Error(`API_RESPONSE_STRUCTURE_ERROR: Unexpected data structure from Steam API.`);
      // }

      // 5. Process and set the games data
      this.ogSteamGames.set(data.response.games.map((game: any) => { // Use 'any' here as the raw API response might have more fields than SteamUserGame
        return {
          appid: game.appid,
          img_icon_url: game.img_icon_url
            ? `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
            : 'https://placehold.co/32', // Default image
          name: game.name,
          playtime_forever: game.playtime_forever,
          rtime_last_played: game.rtime_last_played,
        } as SteamUserGame; // Assert to SteamUserGame after mapping
      }));

      return true;

    } catch (error: any) {
      console.error('Caught error in loadGamesFromSteam:', error);
      // Re-throw the error so the calling function can catch it and react appropriately
      // Ensure the error message is user-friendly or logged for debugging
      let userFriendlyMessage = 'An unexpected error occurred while loading Steam games.';

      if (error instanceof TypeError && error.message.includes('NetworkError')) {
        userFriendlyMessage = 'A network error occurred. This is often caused by a CORS policy issue. Please ensure the application is running from the correct domain or check your server configuration.';
        console.error('CORS Error Details:', error);
      } else if (error.message.startsWith('API_CONFIG_ERROR')) {
        userFriendlyMessage = error.message.replace('API_CONFIG_ERROR: ', '');
      } else if (error.message.startsWith('API_FETCH_ERROR')) {
        userFriendlyMessage = 'Failed to fetch data from Steam API. Please check your network or API key.';
      } else if (error.message.startsWith('JSON_PARSE_ERROR')) {
        userFriendlyMessage = 'Received invalid data from Steam API.';
      } else if (error.message.startsWith('API_RESPONSE_STRUCTURE_ERROR')) {
        userFriendlyMessage = 'Steam API returned data in an unexpected format.';
      }
      alert(userFriendlyMessage); // Optionally show a user-friendly alert
      throw error; // Re-throw the original error with its detailed message
    }
  }

}
