import { Injectable } from '@angular/core';
import { Menus } from 'app/models/menu';

const m1 = [
  {
    title: '数据一',
    link: null,
    children: [
      {title: '1-1'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
    ]
  },
  {
    title: '数据二',
    link: null,
    children: [
      {title: '2-1'},
      {title: '2-2'},
      {title: '2-3'},
      {title: '2-4'},
    ]
  }
];
const m2 = [
  {
    title: '一',
    link: null,
  },
  {
    title: '二',
    link: null,
  }
];
@Injectable({ providedIn: 'root' })
export class AppService {
  public mneus: Array<Menus> = m1;
  public nowUrl = null;
}
