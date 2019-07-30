import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { VoucherService } from '../services/voucher-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  vouchers: Observable<any>;
  constructor(public navCtrl: NavController, public voucherService: VoucherService,
              public alertCtrl: AlertController, public toastCtrl: ToastController,
              public authService: AuthService) {
     this.loadVouchers();
   }
   loadVouchers() {
     this.vouchers = this.voucherService.getVouchers();
   }
   async addVoucher() {
     const prompt = await this.alertCtrl.create({
       message: 'Enter the information about the new voucher',
       inputs: [
         {
           name: 'companyID',
           placeholder: 'companyID'
         },
         {
           name: 'voucherID',
           placeholder: 'voucherID'
         },
         {
           name: 'title',
           placeholder: 'title'
         },
         {
           name: 'offer',
           placeholder: 'offer'
         },
         {
           name: 'price',
           placeholder: 'price'
         },
         {
           name: 'promocode',
           placeholder: 'promocode'
         },
         {
           name: 'status',
           placeholder: 'status'
         }
       ],
       buttons: [
         {
           text: 'Cancel'
         },
         {
           text: 'Save',
           handler: data => {
             // tslint:disable-next-line:no-shadowed-variable
             this.voucherService.addVoucher({companyID: data.companyID, voucherID: data.voucherID,
               // tslint:disable-next-line:no-shadowed-variable
               title: data.title, offer: data.offer, price: data.price,
               // tslint:disable-next-line:no-shadowed-variable
               promocode: data.promocode, status: data.status, color: data.color}).subscribe(data => {
               this.showToast(data.msg);
               this.loadVouchers();
             });
           }
         }
       ]
     });
     await prompt.present();
   }
   removeVoucher(id) {
     this.voucherService.deleteVoucher(id).subscribe(data => {
       this.showToast(data.msg);
       this.loadVouchers();
     });
   }

   postUserVoucher(voucher) {
    this.authService.postUserVoucher(voucher).subscribe(data => {
      this.showToast('Congratulations! You just purchased a voucher from ' + voucher.title + ' !');
      this.updateUserPoints(voucher.price);
      this.loadVouchers();
    });
   }

   updateUserPoints(voucher) {
    this.authService.updateUserPoints(voucher).subscribe(data => {
      this.loadVouchers();
    });
   }

   async presentConfirm(voucher) {
    const alert = await this.alertCtrl.create({
      message: 'Would you like to purchase this offer for ' + voucher.price + ' points?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
           this.postUserVoucher(voucher);
          }
        }
      ]
    });
    alert.present();
  }

   private async showToast(message: string) {
     const toast = await this.toastCtrl.create({
       // tslint:disable-next-line:object-literal-shorthand
       message: message,
       duration: 3000
     });
     await toast.present();
   }
}
