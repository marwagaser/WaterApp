import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '../../../../node_modules/@ionic/angular';
import { VoucherService } from '../../services/voucher-service';
import { AuthService } from '../../auth.service';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-admintab2',
  templateUrl: './admintab2.page.html',
  styleUrls: ['./admintab2.page.scss'],
})
export class Admintab2Page {

  vouchers: Observable<any>;
  colors = [];
  public myColor: string;
  constructor(public navCtrl: NavController, public voucherService: VoucherService,
              public alertCtrl: AlertController, public toastCtrl: ToastController,
              public authService: AuthService) {
                this.colors = [{
                  color : this.getRandomColor(),
                }];
                this.loadVouchers();
   }
   loadVouchers() {
     this.vouchers = this.voucherService.getVouchers();
   }
   removeVoucher(id) {
    this.voucherService.deleteVoucher(id).subscribe(data => {
      this.showToast(data.msg);
      this.loadVouchers();
    });
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
  async presentConfirm(voucher) {
    const alert = await this.alertCtrl.create({
      message: 'Hello Admin are you sure you want to delete this offer?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Remove',
          handler: () => {
           this.removeVoucher(voucher._id);
          }
        }
      ]
    });
    alert.present();
  }

  getRandomColor() {
      let color = '#';
      for (let i = 0; i < 3; i++) {
          const part = Math.round(Math.random() * 255).toString(16);
          color += (part.length > 1) ? part : '0' + part;
      }
      this.myColor = color;
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


