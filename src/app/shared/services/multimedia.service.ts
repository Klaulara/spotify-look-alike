import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>();

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio:HTMLAudioElement;
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject("00:00");
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject("-00:00");
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject("paused");
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.audio = new Audio();
    this.trackInfo$.subscribe(responseOk => {
      if( responseOk){
        this.setAudio(responseOk);
      }
    })
    this.listenAllEvents();
  }

  private listenAllEvents(): void {
    this.audio.addEventListener("timeupdate", this.calculateTime, false);
    this.audio.addEventListener("playing", this.setPlayerStatus, false);
    this.audio.addEventListener("play", this.setPlayerStatus, false);
    this.audio.addEventListener("pause", this.setPlayerStatus, false);
    this.audio.addEventListener("ended", this.setPlayerStatus, false);
  }

  private setPlayerStatus = (state: any) => {
    switch(state.type) {
      case "playing":
        this.playerStatus$.next("playing");
        break;
      case "play":
        this.playerStatus$.next("playing");
        break;
      case "pause":
        this.playerStatus$.next("paused");
        break;
      case "ended":
        this.playerStatus$.next("ended");
        break;
      default:
        this.playerStatus$.next("paused");
        break;
    }
  }


  private calculateTime = () => {
    const { duration, currentTime } = this.audio;
    this.setTimeElapsed(currentTime);
    this.setTimeRemaining(duration, currentTime);
    this.setPercentage(currentTime, duration);
  }

  private setTimeElapsed(currentTime: number): void {
    let seconds = Math.floor(currentTime % 60);
    let minutes = Math.floor((currentTime / 60) % 60);

    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `${displayMinutes}:${displaySeconds}`;
    this.timeElapsed$.next(displayFormat);
  }

  private setTimeRemaining(duration: number, currentTime: number): void {
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60);
    let minutes = Math.floor((timeLeft / 60) % 60);
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`;
    this.timeRemaining$.next(displayFormat);
  }

  private setPercentage(currentTime: number, duration: number): void {
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }

  public setAudio(track: TrackModel): void {

    this.audio.src = track.url.replace(/^\/+/, "");
    this.audio.play();
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause();
  }

  public seekAudio(percentage: number): void {
    const duration = this.audio.duration;
    const seekTime = (percentage * duration) / 100;
    this.audio.currentTime = seekTime;
  }
}
