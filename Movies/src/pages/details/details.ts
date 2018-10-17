import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProvideProvider } from '../../providers/provide/provide';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';



/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
 
  trackerHashcode:any=[];
  hashCode:any='';
  suggestionHashcode:any[];
  trackerMovieTittle:any='';
 
 id: any;
 movie:any={};
 suggestionM:any[];
 upcommngM:any[];
 tab_switch: string='details';

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private provide:ProvideProvider,
     private loadCtrl:LoadingController,
     private admobFree:AdMobFree) {
  this.id = this.navParams.get('movieId');
  this.trackerMovieTittle=this.navParams.get('movieTitle');
  this.MovieDetails();
  this. movieSuggestion();
 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    this.provide. checkAppAvailability()
    this.provide.showInterstitial_details();
    this.setAddmob();
  }

 
  MovieDetails(){
    this.provide.setId(this.id);
   let loading = this.loadCtrl.create({
     content:'Loading please wait..'
   });
   loading.present();
   this.provide.getMovieDetails().subscribe(
     (response)=>{
        const temp= response['data'];
       this.movie= temp['movie'];
       loading.dismiss();
       for(let love of this.movie.torrents){
        this.generateMagneticLink(love.hash,this.movie.title);
       }
       
     },
     (error)=>{
       loading.dismiss();
       this.navCtrl.pop();
     }
   );
  }


  movieSuggestion(){
    this.provide.setId(this.id);
    this.provide.getSuggestions().subscribe(
      (response)=>{
       const temp1= response['data'];
        this.suggestionM = temp1['movies'];
        
       
      }
    );
  }
 generateMagneticLink(hash:any,title:any ){
   
  let magneticLinkgeneraal:any='https://yts.am/torrent/download/'+hash;

  this.trackerHashcode.push(magneticLinkgeneraal);
 }
 generateMagneticLink1(hash:any,title:any,url:any){
   
  let magneticLinkgeneraal:any='magnet:?xt=urn:btih:'+hash +'&dn='+url+'&tr=http://track.one:1234/announce&tr=udp://track.two:80';

  this.trackerHashcode.push(magneticLinkgeneraal);
 }
 upCommingMovies(){
   this.provide.getUpcommingMovies().subscribe(
     (response)=>{
       this.upcommngM = JSON.parse(response.data).movies;
       
     }
   );
 }

 setAddmob(){
  const bannerConfig: AdMobFreeBannerConfig = {
    id:'ca-app-pub-5247575947630985/7707920705',
    isTesting: false,
    autoShow: true,
    bannerAtTop:false
   };
   this.admobFree.banner.config(bannerConfig);
   
   this.admobFree.banner.prepare()
     .then(() => {
       // banner Ad is ready
       // if we set autoShow to false, then we will need to call the show method here
     })
     .catch(e => console.log(e));
 }
 

}
