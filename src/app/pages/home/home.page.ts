import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  image: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  icon: string;
  url: string;
  category: string;

  listItem: any;
  searchKey = '';
  constructor(private menuController: MenuController,
              private router: Router ) { }

  ngOnInit() {
    this.listItem = [{
      image: 'https://secure.ap-tescoassets.com/assets/TH/420/9556001132420/ShotType1_540x540.jpg',
      name: 'เนสท์เล่ ซีรีแล็ค อินแฟนท์ ซีเรียล ผสมนม อาหารเสริมธัญพืช สูตรข้าวสาลีผสมกล้วยบดและนม 250กรัม',
      price: 85,
      originalPrice: 99,
      discount: 14.1,
      icon: 'https://www.tescolotus.com/assets/theme2018/tl-theme/img/logo.png',
      url: 'https://shoponline.tescolotus.com/groceries/th-TH/products/6022001840',
      category: 'ผลิตภัณฑ์สำหรับเด็ก'
    },
    {
      image: 'https://secure.ap-tescoassets.com/assets/TH/197/8852796103197/ShotType1_540x540.jpg',
      name: 'พีเดียชัวร์ 1+ คอมพลีท อาหารสูตรครบถ้วนสำหรับเด็กที่เบื่ออาหาร กลิ่นวานิลลา 370กรัม x 6 ซอง',
      price: 2007,
      originalPrice: 2231,
      discount: 10,
      icon: 'https://www.tescolotus.com/assets/theme2018/tl-theme/img/logo.png',
      url: 'https://shoponline.tescolotus.com/groceries/th-TH/products/6072716835',
      category: 'ผลิตภัณฑ์สำหรับเด็ก'
    }
  ];
  }

  async openMenu() {
    return await this.menuController.open();
  }

  redirect(pagename: string) {
    this.router.navigate([pagename]);
  }

}
