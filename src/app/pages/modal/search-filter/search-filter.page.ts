import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllService } from 'src/app/share/service/all.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.page.html',
  styleUrls: ['./search-filter.page.scss'],
})
export class SearchFilterPage implements OnInit {
  listWebName: any;
  public webName: string;
  public minmaxprice = {
    upper: 1000,
    lower: 0
  };
  dataModal: any;
  constructor(private modalCtrl: ModalController,
              private service: AllService) {
    this.getWebName();
  }

  ngOnInit() {
  }

  closeModal() {
    this.dataModal = {
      min: this.minmaxprice.lower,
      max: this.minmaxprice.upper,
      web: this.webName
    };
    // ส่ง data เมื่อปิด modal
    this.modalCtrl.dismiss(this.dataModal);
  }

  getWebName() {
    this.service.getWebName().subscribe((res) => {
      this.listWebName = res;
    }, err => {
    });
  }

}
