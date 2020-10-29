import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/share/service/local-storage.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  public data: any ;

  constructor(private modalCtrl: ModalController,
              private storage: LocalStorageService) {
    this.getWeb();
  }

  ngOnInit() {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  async getWeb() {
    await this.storage.getStorage('web').then((data: any) => {
      this.data = data;
    });
  }
  onChanged(event, name: string ) {
    const newData: any = [];
    for (const item of this.data) {
      if (item.webName !== name) { // เก็บเว็บเดิมที่ไม่ได้แก้ไข
        const obj = { webName: item.webName,
                      status: item.status };
        newData.push(obj);
      } else { // เก็บเว็บที่แก้ไข
        if (event.target.checked) { // open
          const objOpen = {
            webName: name,
            status: 1
          };
          newData.push(objOpen);
        } else { // close
          const objClose = {
            webName: name,
            status: 0
          };
          newData.push(objClose);
        }
      }
    }
    // console.log(newData);
    this.storage.setStorage('web', newData);
  }

}
