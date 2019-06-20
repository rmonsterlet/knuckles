import { Component, ViewChild, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'knuckes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public shifts = [];
  public workers = [];

  constructor(
  ) {}

  public ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    this.shifts = [];
    firebase.firestore().collection('shift').orderBy('id').get()
      .then(({ docs }) => docs.map(doc => {
        const { id, planning_id, user_id, start_date } = doc.data();
        this.shifts.push({
          id,
          planning_id,
          user_id,
          start_date,
        });
      }));

    this.workers = [];
    firebase.firestore().collection('worker').orderBy('id').get()
      .then(({ docs }) => docs.map(doc => {
        const { id, first_name, status } = doc.data();
        this.workers.push({
          id,
          first_name,
          status,
        });
      }));
  }
}
