import { OneSignal } from '@ionic-native/onesignal';
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { AdMobFree, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { AlertController} from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';
import { Platform } from 'ionic-angular';
import { Market } from '@ionic-native/market';



// import { map } from 'rxjs/operators';

import 'rxjs/Rx';

/*
  Generated class for the ProvideProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvideProvider {
  temp:any='';
  Sort_by:any='year';
  Filter_by:any='all';
  id:any='';
  genre:any='all ';
  page:number=1;
  movieListurl = 'https://yts.am/api/v2/list_movies.json?quality=all&page=1&sort_by=';
  moreMOvieurl='https://yts.am/api/v2/list_movies.json?quality=all&page=';
  movieDetails = 'https://yts.am/api/v2/movie_details.json?movie_id=';
  movieSearch = 'https://yts.am/api/v2/list_movies.json?query_term=';
  movieSurgestion ='https://yts.am/api/v2/movie_suggestions.json?movie_id=';
  movieUpcomming = 'https://yts.am/api/v2/list_upcoming.json';
  movieReview = 'https://yts.am/api/v2/movie_reviews.json?movie_id=';
  
  constructor(public http: Http, private admobFree:AdMobFree,
              private alertCtrl:AlertController,
              private oneSignal: OneSignal,
              private market:Market,
              private appAvailability: AppAvailability,
               private platform: Platform) {
  
  }
 set Genre(g:any){
 this.genre=g;
 }
  
getMovieList(value:any){
 this.Sort_by=this.temp;
  return this.http.get(this.movieListurl+value ).map(
    (response)=>{
      return response.json();
    },
    (error)=>{
      console.log(error);
    }
  );
}


getMovieDetails(){
 return this.http.get(this.movieDetails+this.id).map(
   (response)=>{
     const details= response.json();
     return details;
   },
   (error)=>{
     console.log(error);
   }
 );
}


gotrial(){
 return  this.http.get('list_movies.json').map(
    (response)=>{
       return response.json();
    }
  );
 }
changePage(p:any){
  this.page=p;
 this.movieListurl;
}
searchMovie(search:any){
  return this.http.get(this.movieSearch + search).map(
(response)=>{
   return response.json();
}

  );
}
getSuggestions(){
 return this.http.get(this.movieSurgestion+this.id).map(
   (response)=>{
     return response.json();
   }
 );
}

getRewiew(id:any){
  return this.http.get(this.movieReview+ id).map(
    (response)=>{
      return response.json();
    }
  );
}
sortBy(sort:any){
this.temp=sort;
}
filterBy(filter:any){
  this.Filter_by=filter;
}
setId(id:any){
  this.id=id
}
getmoreMovieList(page:any,value:any){

  return this.http.get(this.moreMOvieurl +page+'&sort_by='+value ).map(
    (response)=>{
      return response.json();
    },
    (error)=>{
      console.log(error);
    }
  );
}
getUpcommingMovies(){
  return this.http.get(this.movieUpcomming ).map(
    (response)=>{
      return response.json();
    },
    (error)=>{
      console.log(error);
    }
  );
}
async showInterstitial(){
     
  try{
    const bannerConfig: AdMobFreeInterstitialConfig = {
      id:'ca-app-pub-5247575947630985/7433137278',
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: false,
      autoShow: true
     };
     this.admobFree.interstitial.config(bannerConfig);
     
     let admob = await this.admobFree.interstitial.prepare();
       console.log(admob);
  }catch(e){

  }
  
}
async showInterstitial_details(){
     
  try{
    const bannerConfig: AdMobFreeRewardVideoConfig = {
      id:'ca-app-pub-5247575947630985/5395212353',
     
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: false,
      autoShow: true
     };
     this.admobFree.interstitial.config(bannerConfig);
     
     let admob = await this.admobFree.interstitial.prepare();
       console.log(admob);
  }catch(e){

  }
  
}

dataInput(){
  this.http.get('google.com').map(
    (response)=>{
      return response.json();
    }
  );
}

checkAppAvailability(){
  let app;

if (this.platform.is('ios')) {
  app = 'twitter://';
} else if (this.platform.is('android')) {
  app = 'com.utorrent.client';
}

this.appAvailability.check(app)
  .then(
    (yes: boolean) => console.log(app + ' is available'),
    (no: boolean) =>{  console.log(app + ' is NOT available') , this.presentAlert();}
       
   );
}

presentAlert(){
  let alert = this.alertCtrl.create(
    {
      title:' uttorent not found',
      message:'Please install uttorent app',
      buttons:[{
        text:'Ok',
        role:'cancel'
      },
     {
       text:'install...',
       handler:()=>{
         this.market.open("com.utorrent.client");
       }
     }]
    }
  );
  alert.present();
}

presentNotification(){
  if (this.platform.is('cordova')){
    this.oneSignal.startInit('dc8e59f4-1f79-4159-8b3c-7b497a7e75c8', '353042028190');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe(() => {
     // do something when notification is received
    });
    
    this.oneSignal.handleNotificationOpened().subscribe(() => {
      // do something when a notification is opened
    });
    
    this.oneSignal.endInit();
    
  }
 
}
}
