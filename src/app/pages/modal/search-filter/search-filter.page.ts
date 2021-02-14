import { Component, OnInit } from '@angular/core';
import { Events, ModalController } from '@ionic/angular';
import { AllService } from 'src/app/share/service/all.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {
  listWebName: any;
  public webName = '';
  public minmaxpriceOne = {
    upper: 1000,
    lower: 0
  };
  public minmaxpriceTwo = {
    upper: 10000,
    lower: 1001
  };
  public minmaxpriceThree = {
    lower: 10001
  };

  dataModal: any;
  isClickOk = false;
  selectPrice: any;
  searchName: any;
  constructor(private modalCtrl: ModalController,
              private service: AllService) {
    this.getWebName();
  }

  ngOnInit() {
  }

  clickClose() {
    console.log('click-close');
    this.isClickOk = true;
  }
  closeModal() {

    // ส่ง data เมื่อปิด modal
    if (this.webName === '' || !this.isClickOk) {
      console.log('close modal without data');
      this.modalCtrl.dismiss(null);
    } else if (this.webName !== '' && this.isClickOk) { // กรณีเลือกชื่อเว็บ และ กดปุ่มok
      // console.log(this.dataModal);
      this.dataModal = {
        min: this.minmaxpriceOne.lower,
        max: this.minmaxpriceOne.upper,
        web: this.webName
      };
      console.log('selectPrice ' + this.selectPrice);
      this.modalCtrl.dismiss(this.dataModal);
    }
  }

  getWebName() {
    this.service.getWebName().subscribe((res) => {
      this.listWebName = res;
    }, err => {
    });
  }

}
