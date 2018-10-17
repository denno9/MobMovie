import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler,} from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { LoginPage } from '../pages/login/login'
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProvideProvider } from '../providers/provide/provide';
import { AdMobFree} from '@ionic-native/admob-free';
import { AppAvailability } from '@ionic-native/app-availability';
import { Market } from '@ionic-native/market';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    LoginPage,
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
     {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvideProvider,
    AdMobFree,
    OneSignal,
    AppAvailability,
    Market
    // InAppBrowser
    
  ]
})
export class AppModule {}
