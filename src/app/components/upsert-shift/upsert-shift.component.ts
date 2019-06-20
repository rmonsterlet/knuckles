import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as firebase from 'firebase/app';
import * as moment from 'moment';

@Component({
  selector: 'knuckes-upsert-shift',
  templateUrl: './upsert-shift.component.html',
  styleUrls: ['./upsert-shift.component.scss']
})
export class UpsertShiftComponent implements OnInit {

  public id: number;
  public shiftForm: FormGroup;
  public upload$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public shift;
  private shiftRef;
  private shiftsRef = firebase.firestore().collection('shift');
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.shift = {
      planning_id: null,
      user_id: null,
      start_date: null,
    }
    this.shiftForm = this.formBuilder.group(this.shift);
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if(this.id) {
        this.shiftsRef.where('id', '==', this.id).get().then(({ docs }) => {
          this.shiftRef = docs[0];
          const data = this.shiftRef.data();
          this.shift = {
            ...data,
            start_date: moment(data.start_date).format('L'),
          }
          this.shiftForm = this.formBuilder.group(this.shift);
        });
      }
    });
  }

  public validate() {
    const planning_id = this.shiftForm.get('planning_id').value;
    const user_id = this.shiftForm.get('user_id').value;
    const start_date = this.shiftForm.get('start_date').value;
    const data = {
      planning_id,
      user_id,
      start_date: moment(start_date).format('YYYY-MM-DD')
    };
    this.upload$.next(true);
    !this.id ? this.create(data) : this.update(data);
  }

  private create(data) {
    this.shiftsRef.get().then(docs => {
      this.shiftsRef.doc(this.shiftsRef.doc().id).set({
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
    this.shiftRef.ref.update(data)
      .then(() => this.router.navigate(['/']))
      .catch((e) => {
        alert(e);
        this.upload$.next(false);
      });
  }
}
