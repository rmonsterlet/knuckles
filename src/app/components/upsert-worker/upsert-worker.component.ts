import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as firebase from 'firebase/app';

@Component({
  selector: 'knuckes-upsert-worker',
  templateUrl: './upsert-worker.component.html',
  styleUrls: ['./upsert-worker.component.scss']
})
export class UpsertWorkerComponent implements OnInit {

  public id: number;
  public workerForm: FormGroup;
  public upload$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public worker;
  private workerRef;
  private workersRef = firebase.firestore().collection('worker');

  public statuses = [
    { value: 'medic', label: 'Médic' },
    { value: 'interne', label: 'Interne' },
    { value: 'interim', label: 'Intérim' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.worker = {
      first_name: null,
      status: null,
    };
    this.workerForm = this.formBuilder.group(this.worker);
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if(this.id) {
       this.workersRef.where('id', '==', this.id).get().then(({ docs }: any) => {
          this.workerRef = docs[0];
          this.worker = this.workerRef.data();
          this.workerForm = this.formBuilder.group(this.worker);
        });
      }
    });
  }

  public validate() {
    const first_name = this.workerForm.get('first_name').value;
    const status = this.workerForm.get('status').value;
    const data = {
      first_name,
      status,
    };
    this.upload$.next(true);
    !this.id ? this.create(data) : this.update(data);
  }

  private create(data) {
    this.workersRef.get().then(docs => {
      this.workersRef.doc(this.workersRef.doc().id).set({
        id: docs.size + 1,
        ...data,
      });
      this.router.navigate(['/']);
    }).catch((e) => {
      alert(e);
      this.upload$.next(false);
    });
  }

  private update(data) {
    this.workerRef.ref.update(data)
      .then(() => this.router.navigate(['/']))
      .catch((e) => {
        alert(e);
        this.upload$.next(false);
      });
  }
}
