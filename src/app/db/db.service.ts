import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';
import { Menus } from 'app/models/menu';
import { Project, projectIndex } from './models/project';
import { User, userIndex } from './models/user';
import { Comp, compIndex } from './models/component';
import { Device, deviceIndex } from './models/device';

export enum tableNames {
  user = 'user',
  project = 'project',
  component = 'component',
  device = 'device',
}

@Injectable({ providedIn: 'root' })
export class DbService {
  public db: DB;

  constructor(public msg: NzMessageService) {
    this.db = new DB();
  }

  /**
   * 添加或修改数据
   *
   * @param {string} tableName 表名称
   * @param {User} saveData 数据
   * @param {Function} inquery 过滤方法
   * @returns {(Observable<boolean | number>)} 失败返回false 成功返回id
   * @memberof DbService
   */
  public post(tableName: string, saveData: User | Project | Comp | Device, inquery: Function): Observable<boolean | number> {
    return new Observable((observer) => {
      this.db[tableName].filter(a => inquery(a)).first().then((oldData) => {
        console.log(tableName, saveData, oldData);
        if (oldData) {
          if (!(oldData.id === saveData.id)) {
            this.msg.error('出错了😵！数据一已存在！！');
            observer.next(false);
            return;
          }
        }
        if (saveData.id) {
          this.db[tableName].update(saveData.id, saveData).then((updated) => {
            console.log('更新数据', updated);
            if (updated) {
              observer.next(saveData.id);
              this.msg.success('更新成功🙂');
            } else {
              observer.next(false);
              this.msg.warning('数据没有变更？');
            }
          }).catch((e) => {
            this.msg.error('修改出错了😵');
            console.error(e);
          });
        } else {
          saveData.id = new Date().getTime();
            this.db[tableName].add(saveData).then(() => {
              observer.next(saveData.id);
              this.msg.success('添加成功🙂');
            }).catch(() => {
              this.msg.error('新增出错了😵');
            });
        }
      }).catch(() => {
      });
    });
  }
  public async getByid(tableName: string, id: string | number): Promise<User | Project | Comp | Device> {
    return await this.db[tableName].get(Number(id));
  }
  public async getAll(tableName: string, pushMneu: Function): Promise<Menus[]> {
    const menu: Menus[] = [];
    // await this.db[tableName].each(d => {
    //   menu.push({title: d.name, link: String(d.id)});
    // });
    await this.db[tableName].each(d => {
      menu.push(pushMneu(d));
    });
    return menu;
  }
}


export class DB extends Dexie {
  user!: Dexie.Table<User, number>;
  project!: Dexie.Table<Project, number>;
  component!: Dexie.Table<Comp, number>;
  device!: Dexie.Table<Device, number>;

  constructor() {
    super('KVM');
    this.version(1).stores({
      user: userIndex,
      project: projectIndex,
      component: compIndex,
      device: deviceIndex,
    });
    this.open();
  }
}
