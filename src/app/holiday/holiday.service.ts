import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { holidayModel } from './holidaymodel';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private events=new BehaviorSubject<holidayModel[]>([])
  constructor() { }
  addEventHoliday( eventName:string, startDate:string, endDate:string){
    this.events.asObservable().pipe(take(1)).subscribe(events => this.events.next(events.concat(new holidayModel(eventName,startDate,endDate))))
    console.log(this.events)
  }
  getEvent(){
    return this.events.asObservable()
  }
}
