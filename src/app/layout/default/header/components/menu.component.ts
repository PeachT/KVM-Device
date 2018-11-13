import { Component } from '@angular/core';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'header-menu',
  template: `
    <div class="alain-default__nav header-menu">
      <div class="alain-default__nav-item" (click)="taskVisible = true" [ngClass]="{'active' : '/task' === app.nowUrl}">
          <i nz-icon type="bars" theme="outline"></i>
          <p style="margin-bottom: 0px;">任务</p>
      </div>
      <div class="alain-default__nav-item" *ngFor="let menu of data" [routerLink]="menu.path"
      [ngClass]="{'active' : menu.path === app.nowUrl}">
        <i nz-icon [type]="menu.icon" theme="outline"></i>
        <p style="margin-bottom: 0px;">{{menu.title}}</p>
      </div>
    </div>
    <nz-drawer [nzClosable]="false" [nzVisible]="taskVisible" nzPlacement="right" nzTitle="切换项目" (nzOnClose)="taskVisible = false">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </nz-drawer>
  `,
})
export class HeaderMenuComponent {
  data = [
    {path: '/project', icon: 'hdd', title: '项目'},
    {path: '/component', icon: 'cluster', title: '构件'},
    {path: '/device', icon: 'laptop', title: '设备'},
    {path: '/user', icon: 'user', title: '用户'},
    {path: '/setting', icon: 'setting', title: '设置'},
    {path: '/manual', icon: 'medium', title: '手动'},
    {path: '/help', icon: 'question-circle', title: '帮助'},
  ];
  taskVisible = false;

  constructor(public app: AppService) {}
}
