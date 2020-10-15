import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import {  map, take } from 'rxjs/operators'
import { homeModel } from './homemodel';
import { LocalNotificationSchedule, Plugins } from '@capacitor/core';

// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

const { LocalNotifications } = Plugins

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }
  private events=new BehaviorSubject<homeModel[]>([])
  addEvent( eventName:string, starttime:string, endtime:string, day:number){
    let present = new Date();
    let year = present.getFullYear();
    let hour = parseInt(starttime.slice(0,2));
    let min= parseInt(starttime.slice(3,5));
let Day = present.getDate();
let d1 = present.getDay();

if (! (day === d1)){
var dif = day-d1;
if (dif<0){
  present.setDate(Day+7+dif);

}else{
  present.setDate(Day+dif);
}
}
if(day==d1){
  if (hour<present.getHours()){
    present.setDate(Day+7);
    console.log('set hour')
  }else{
    console.log('set hourdd')

    if (hour==present.getHours()){
      // console.log('hours equal')
      // console.log('hours equal'+min)
      // console.log('it is '+ present.getMinutes()) 
      if (min<present.getMinutes()){
        present.setDate(Day+7);
        console.log('set minute')
      }
    }

  }
}
present.setHours(hour,min,0);
console.log(present)
// let time1 = new Date(year, month, setDate, parseInt(starttime.slice(0,2)), parseInt(starttime.slice(3,5)), 0, 0);

    this.events.asObservable().pipe(take(1)).subscribe(events => this.events.next(events.concat(new homeModel(eventName,starttime,endtime,day))))
    
    
    async function setNotifications() {
      const notifs = await LocalNotifications.schedule({
        notifications: [
          {
            title: eventName,
            body: 'u have one reminder',
            id: new Date().getTime(),
            schedule: {repeats:true,every:'week',at:present},
            sound: null,
            attachments: null,
            actionTypeId: "",
            extra: null
          }
        ]
      });
      console.log('scheduled notifications', notifs);
    }
    setNotifications();
    
    
}
  getEvent(day:number){
    return this.events.asObservable().pipe(map(events => events.filter(p => p.day===day)))
  }
  
 
}
