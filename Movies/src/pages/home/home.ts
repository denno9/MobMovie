import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DetailsPage } from '../details/details';
import 'rxjs/Rx';
import { ProvideProvider } from '../../providers/provide/provide';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  movieObj: any[];
  tempMovie: any[];
  tempSort: any = '';
  page: number = 2;
  constructor(public navCtrl: NavController,
    public http: Http, private provider: ProvideProvider,
    private alertCtrl: AlertController,
    //private toastCtrl:ToastController,
    private actionSheetCtrl: ActionSheetController) {

    this.provider.presentNotification();

    this.onGetMovieList('date_added');
    this.provider.showInterstitial();



  }

  ionViewDidLoad() {
    // this.provider.presentNotification();

  }

  moveToDetailsPage(id: any, title: any) {
    this.navCtrl.push(DetailsPage, { 'movieId': id, 'movieTitle': title });

  }



  onGetMovieList(tempvalue: any) {
    this.provider.getMovieList(tempvalue).subscribe(
      (response) => {
        const temp = response['data'];
        this.movieObj = this.tempMovie = temp['movies'];


      },
      (error) => {
        let alert = this.alertCtrl.create(
          {
            title: 'Something went wrong',
            message: 'Connect to the internet',
            buttons: [{
              text: 'Ok',
              role: 'cancel'
            }]
          }
        );
        alert.present();
      }
    );
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      // this.provider.changePage(this.page++);
      this.provider.getmoreMovieList(this.page++, this.tempSort).subscribe(
        (response) => {
          const temp3 = response.data;
          const infmovie = temp3['movies'];
          console.log(infmovie);
          if (infmovie.length != 0) {
            for (let i = 0; i < infmovie.length; i++) {
              this.movieObj.push(infmovie[i])
            }
          }
          console.log(infmovie);
        },
        (error) => {
          console.log(error);
        }
      );
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }


  getItems(ev: any) {


    let val = ev.target.value;

    if (val && val.trim() != '') {

      this.provider.searchMovie(val).subscribe(
        (response) => {
          if (response.length != 0) {
            const search = response.data;
            this.movieObj = search['movies'];




          }

        });

    } else {
      this.movieObj = this.tempMovie
    }
  }



  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Change  order',
      // androidTheme: this.actionSheetCtrl.ANDROID_THEMES.THEME_HOLO_DARK,
      buttons: [

        {
          text: 'Year',
          role: 'destructive',
          handler: () => {
            console.log('Archive clicked');
            if (this.tempSort != 'year') {
              this.tempSort = 'year';
              this.onGetMovieList(this.tempSort);
              console.log(this.provider.Sort_by + 'Y');
            }
          }
        },
        {
          text: 'Date Added',
          handler: () => {
            console.log('Destructive clicked');
            // console.log(this.provider.Sort_by);
            if (this.tempSort != 'date_added') {
              this.provider.sortBy('date_added');
              this.tempSort = 'date_added';
              this.onGetMovieList(this.tempSort);

            }

          }
        },
        {
          text: 'Rating',
          handler: () => {

            if (this.provider.Sort_by != 'rating') {
              this.provider.sortBy('rating');
              this.tempSort = 'rating';
              this.onGetMovieList(this.tempSort);

            }
          }
        },
        {
          text: 'Title',
          handler: () => {
            if (this.provider.Sort_by != 'title') {
              this.provider.sortBy('title');
              this.tempSort = 'title';
              this.onGetMovieList(this.tempSort);

            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {


          }
        }
      ]
    });

    actionSheet.present();
  }
}


