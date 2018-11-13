import { Injectable } from '@angular/core';
import { Menus } from 'app/models/menu';

const m1 = [
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据一',
    link: '1',
    childrenHidden: true,
    children: [
      {
        title: '1-1',
        link: '1-1',
        children: [
          {title: '1-1-1', link: '1-1-1'},
          {title: '1-2-1'},
          {title: '1-3-1'},
          {title: '1-4-1'},
        ]
      },
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '1-4'},
      {title: '1-2'},
      {title: '1-3'},
      {title: '100-4'},
    ]
  },
  {
    title: '数据二',
    link: null,
    childrenHidden: true,
    children: [
      {title: '2-1'},
      {title: '2-2'},
      {title: '2-3'},
      {title: '2-4'},
    ]
  },
  {
    title: '数据三',
    link: null,
    children: [
      {title: '3-1'},
      {title: '3-2'},
      {title: '3-3'},
      {title: '3-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四',
    link: null,
    children: [
      {title: '4-1'},
      {title: '4-2'},
      {title: '4-3'},
      {title: '4-4'},
    ]
  },
  {
    title: '数据四8889',
    link: '89856',
  },
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
  public menus: Array<Menus> = m1;
  public menuAction: string[] = ['1', '1-1', '1-1-1'];
  public nowUrl = null;
}
