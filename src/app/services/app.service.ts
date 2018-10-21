import { Injectable } from '@angular/core';
import { Menus } from 'app/models/menu';

@Injectable({ providedIn: 'root' })
export class AppService {
  public mneus: Array<Menus> = [{title: '没有数据'}];
}
