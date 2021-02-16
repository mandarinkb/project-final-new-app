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
  isClickSearch = false;
  selectPrice: any = 'one'; // default one
  searchName: any = '';
  constructor(private modalCtrl: ModalController,
              private service: AllService) {
    this.getWebName();
  }

  ngOnInit() {
  }

  clickSearch() {
    this.isClickSearch = true;
  }
  radioChecked(v) {
    this.selectPrice = v;
  }
  closeModal() {
    // ส่ง data เมื่อปิด modal
    if (!this.isClickSearch) {
      console.log('close modal without data');
      this.modalCtrl.dismiss(null);
    } else if (this.webName !== '' && this.isClickSearch) { // กรณีเลือกชื่อเว็บ และ กดปุ่มok
      switch (this.selectPrice) {
        case 'one':
          console.log('1');
          this.dataModal = {
            min: this.minmaxpriceOne.lower,
            max: this.minmaxpriceOne.upper,
            web: this.webName,
            search: this.searchName
          };
          break;
        case 'two':
          console.log('2');
          this.dataModal = {
            min: this.minmaxpriceTwo.lower,
            max: this.minmaxpriceTwo.upper,
            web: this.webName,
            search: this.searchName
          };
          break;
        case 'three':
          console.log('3');
          this.dataModal = {
            min: this.minmaxpriceThree.lower,
            max: this.minmaxpriceThree.lower,
            web: this.webName,
            search: this.searchName
          };
          break;
        default:
          console.log('not found');
          break;
      }
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
