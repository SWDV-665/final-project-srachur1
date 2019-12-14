import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { GroceriesServiceProvider } from '../../providers/groceries-service/groceries-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: GroceriesServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  //Promt controller method for both Edit & Add item action - showPromt()
  showPromt(item?, index?) {

    const promt = this.alertCtrl.create({
      //Title for Promt
      title: item ? 'Edit Blog' : 'Add Blog',
      //Promt intro message
      message: item ? 'Please enter blog content' : 'Please enter blog content',
      //Promt Input elements
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'description',
          placeholder: 'Description',
          value: item ? item.description : null
        },
        {
          name: 'blogdate',
          placeholder: 'BlogDate',
          value: item ? item.blogdate : null
        },
        {
          name: 'author',
          placeholder: 'Author',
          value: item ? item.author : null
        }
      ],
      //Promt Button elements
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: data => {
            if (index != undefined) {
              item.name = data.name;
              item.description = data.description;
              item.blogdate = data.blogdate;
              item.author = data.author;
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(data);
            }
          }
        }
      ]

    });
    promt.present();
  }

}
