import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Menus } from 'app/models/menu';
import { NzMessageService } from 'ng-zorro-antd';
import { AppService } from 'app/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.less']
})
export class TreeMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('s')
    private scrroll: ElementRef;
  data: any[] = [];
  @Input()
    menus: Menus[] = [];
  @Input()
    ikey = 0;
  @Input()
    url = '';
  childrens: Menus[] = null;
  hidden = false;
  loading = false;
  hasMore = true;
  link = null;
  height = 0;

  constructor(
    public msg: NzMessageService,
    public app: AppService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.height = `${736 - this.ikey * 57}px`;
    // console.log(this.height, this.d.nativeElement.offsetHeight);
  }
  ngAfterViewInit() {
    // this.height = this.scrroll.nativeElement.offsetHeight;
    // this.height = `${h - this.ikey * 57}px`;
    // console.log(h);
  }

  onScroll(): void {
    console.log('00000', this.ikey);
  }
  menu1(item: Menus) {
    const active = this.app.menuAction;
    if (item.children) {
      // this.link = this.link === item.link ? null : item.link;
      if (active[this.ikey] === item.link) {
        this.app.menuAction.splice(this.ikey, active.length - this.ikey);
      } else {
        active[this.ikey] = item.link;
      }
    } else if (active[this.ikey] !== item.link) {
      active[this.ikey] = item.link;
      // this.link = item.link;
      const url = `${this.app.nowUrl}/${item.link}`;
      this.msg.info(`跳转${url}`);
      this.router.navigate([url]);
    }
    // item.state = this.link ? true : false;
    // this.hidden = !item.childrenHidden;
    console.log('菜单', this.app.menuAction);
  }
  scroll(event) {
    console.log(event, event.currentTarget.scrollHeight - event.currentTarget.scrollTop - this.scrroll.nativeElement.offsetHeight);
  }
}
