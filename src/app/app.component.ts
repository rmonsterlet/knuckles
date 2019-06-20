import { CONFIG } from './constants';
import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public menuExpanded = true;

  constructor(
  ) {
    const config = {
      apiKey: CONFIG.API_KEY,
      authDomain: "knuckles-and-cie.firebaseapp.com",
      databaseURL: "https://knuckles-and-cie.firebaseio.com",
      projectId: "knuckles-and-cie",
      storageBucket: "",
      messagingSenderId: "953772238177",
      appId: "1:953772238177:web:0006d823b9e1055c"
    };
    firebase.initializeApp(config);
  }

  public openTab(url: string) {
    window.open(url, '_blank');
  }
}
