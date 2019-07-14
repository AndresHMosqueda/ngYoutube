import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from "@angular/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl:string = "https://www.googleapis.com/youtube/v3";
  private api: string = "AIzaSyABGzZZUCKb8pOf24_987yRHb_qqpfyKBM";
  private playlist:string = "UUECJDeK0MNapZbpaOzxrUPA";
  private nextPageToken: string = "";

  constructor( public http: Http) { }

  getVideos() {

    let url = `${ this.youtubeUrl }/playlistItems`;
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', this.playlist);
    params.set('key', this.api );

    if( this.nextPageToken ){
      params.set('pageToken', this.nextPageToken );

    }

    return this.http.get( url, { search: params}).pipe(map( (res:any) => {
      console.log(res.json());
      this.nextPageToken = res.json().nextPageToken;


      let videos:any[]= [];
      for ( let video of res.json().items ) {
        let snippet = video.snippet;
        videos.push(snippet);
      }
      return videos;
      })
    )

  }
}
