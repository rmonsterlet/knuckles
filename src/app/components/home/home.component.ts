import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
const workerService = require('../../../fake-backend/worker.service')

@Component({
  selector: 'knuckes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public shifts = [];
  public workers = [];
  public commission;

  constructor(
  ) { }

  public async ngOnInit() {
    await this.fetchShifts();
    await this.fetchWorkers();
    this.getWorkersPriceAndCommission();
  }

  private async fetchShifts() {
    this.shifts = [];
    const { docs }: any = await firebase.firestore().collection('shift').orderBy('id').get();
    docs.map(doc => {
      const { id, planning_id, user_id, start_date } = doc.data();
      this.shifts.push({
        id,
        planning_id,
        user_id,
        start_date,
      });
    });
  }

  private async fetchWorkers() {
    this.workers = [];
    const { docs }: any = await firebase.firestore().collection('worker').orderBy('id').get();
    docs.map(doc => {
      const { id, first_name, status } = doc.data();
      this.workers.push({
        id,
        first_name,
        status,
      });
    });
  }

  private getWorkersPriceAndCommission() {
    const [workers, commission] = workerService.getWorkersPriceAndCommission({
      shifts: this.shifts,
      workers: this.workers,
    });
    this.workers = this.workers.map(_w0 => ({
      ..._w0,
      price: workers.find(_w1 => _w0.id === _w1.id) && workers.find(_w1 => _w0.id === _w1.id).price,
    }));
    this.commission = commission;
  }
}
