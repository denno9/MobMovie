import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { EmailValidator } from '@angular/forms';




/**
 * Generated class for the LoginPage page.
 *s
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  Registration = {
   FirstName:String,
   LastName:String,
   email:EmailValidator,
   phoneNO:Number,
   password:String,
 };


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  goTologin(){
  
  }
 formSubmit(){
  
 }
}
