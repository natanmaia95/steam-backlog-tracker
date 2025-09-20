import { Injectable, signal } from '@angular/core';
import { GameProgress } from '../model/game-progress.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgressTracker {
  
  gamesProgress = signal<Map<Number, GameProgress>>(new Map<Number, GameProgress>());



  constructor() {
    this.loadProgress();
  }

  getPlayed(appId: number): boolean {
    if (!this.gamesProgress().has(appId)) return false;

    return this.gamesProgress().get(appId)?.played || false;
  }

  setPlayed(appId: number, played: boolean): void {
    let map = this.gamesProgress();
    if (map.has(appId)) {
      map.get(appId)!.played = played;
    } else {
      map.set(appId, {
        appId, played,
        opened: false
      })
    }

    this.gamesProgress.set(map);
    this.saveProgress();
  }

  loadProgress(): void {
    let str = localStorage.getItem("gamesProgress");
    if (str == null) {
      console.log("no existing data found. keeping the empty map.")
      return;
    }

    let array = JSON.parse(str);
    this.gamesProgress.set(new Map(array));
  }

  saveProgress(): void {
    let data = Array.from(this.gamesProgress());
    let str = JSON.stringify(data);
    localStorage.setItem("gamesProgress", str);
  }

  clearProgress(): void {
    this.gamesProgress.set(new Map());
    this.saveProgress();
  }

}
