import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HolidayService } from './holiday.service';
import { holidayModel } from './holidaymodel'

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.page.html',
  styleUrls: ['./holiday.page.scss'],
})
export class HolidayPage implements OnInit {
  Events:holidayModel[]
  constructor(private alertController: AlertController,private HolidayService : HolidayService) { }

  ngOnInit() {
    this.HolidayService.getEvent().subscribe(events => this.Events=events)
  }
  
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      
      header: 'Holiday / Exams',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Holiday',
          value: 0
          
          
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Exams',
          value: 1
          
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, 
        {
          text: 'Ok',
          handler: (data) => {
            if (data===0 ){
              this.presentAlertPrompt("Holidays")
            }
            if (data===1 ){

              this.presentAlertPrompt("Exams")
            }
            
               
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPrompt(reason:string) {
   let min= new Date().getFullYear().toString()+'-'+new Date().getMonth().toString()+'-'+new Date().getDate().toString()
    const alert = await this.alertController.create({
    
      header: 'Add Event',
      backdropDismiss: false,
      inputs: [
        
        {
          name: 'name1',
          type: 'text',
          placeholder: 'EventName'
        },
        
        
        // input date with min & max
        {
          name: 'name2',
          type: 'date',
          
          //
          
        },
        // input date without min nor max
        {
          name: 'name3',
          type: 'date',
          placeholder: 'end date'
        },
        
        
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          
          handler: () => {
            
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.HolidayService.addEventHoliday(data.name1,data.name2,data.name3,reason)
            console.log(data);
          }
        }
      ]
    });
    await alert.present();
  }
  
  

}
