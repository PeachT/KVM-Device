import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { AppService } from 'app/services/app.service';
import { Menus } from 'app/models/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.componrnt.less']
})
export class MenuComponent implements OnInit {
  data: any[] = [];
  childrens: Menus[] = null;
  loading = false;
  hasMore = true;
  title = null;

  constructor(
    public msg: NzMessageService,
    public app: AppService
  ) { }

  ngOnInit() {
    this.getData(1);
  }

  getData(number: number): void {
    // this.data = this.data.concat(new Array(number).fill(0));
    const length = this.data.length;
    this.data = this.data.concat(Array.from(new Array(number),
      (val, index) => length + index + 1));
    this.loading = false;
  }

  onScroll(): void {
    if (this.loading) return;
    this.loading = true;
    if (this.data.length > 100) {
      this.msg.warning('Infinite List loaded all');
      this.hasMore = false;
      this.loading = false;
      return;
    }
    this.getData(10);
  }
  menu1(children, title) {
    if (this.childrens) {
      this.childrens = null;
      this.title = null;
    } else {
      this.childrens = children;
      this.title = title;
    }
    console.log(children, this.childrens);
  }
}
