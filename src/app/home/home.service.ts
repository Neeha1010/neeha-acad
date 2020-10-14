import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { every, map, take } from 'rxjs/operators'
import { homeModel } from './homemodel';
import { LocalNotificationSchedule, Plugins } from '@capacitor/core';
import { on } from 'process';
// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

const { LocalNotifications } = Plugins

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }
  private events=new BehaviorSubject<homeModel[]>([])
  addEvent( eventName:string, starttime:string, endtime:string, day:number){
    let year = new Date().getFullYear();
let month = new Date().getMonth();
let Day = new Date().getDate();

let time1 = new Date(year, month, Day, parseInt(starttime.slice(0,2)), parseInt(starttime.slice(3,5)), 0, 0);

    this.events.asObservable().pipe(take(1)).subscribe(events => this.events.next(events.concat(new homeModel(eventName,starttime,endtime,day))))
    
    const mySchedule: LocalNotificationSchedule = {
      repeats: true,
      
      every:'week',
        on: {day :day,
          hour:parseInt(starttime.slice(0,2)),
          minute:parseInt(starttime.slice(3,5))},
          at:new Date(time1)
        
      
    };
const notifs = LocalNotifications.schedule({
  notifications: [
    {
      title: eventName,
      body: "Body",
      id: 1,
      schedule: mySchedule,
      sound: null,
      attachments: null,
      actionTypeId: "",
      extra: null
    }
  ]
});
console.log('scheduled notifications', notifs);
// this.localNotifications.schedule({
//   id: 1,
//   text: "Notifica 15 ",
//   title: 'Hello!!! ', 
//   trigger: { 
//     every: {
//       day: day,
//       hour:parseInt(starttime.slice(0,2)),
//           minute:parseInt(starttime.slice(3,5))
//     } 
//   } 
// });
    
}
  getEvent(day:number){
    return this.events.asObservable().pipe(map(events => events.filter(p => p.day===day)))
  }
 
}
