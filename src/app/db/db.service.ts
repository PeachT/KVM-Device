import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { User, userIndex } from './models/user';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

export enum tableNames {
  user = 'user'
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
  public post(tableName: string, saveData: User, inquery: Function): Observable<boolean | number> {
    return new Observable((observer) => {
      this.db.user.filter(a => inquery(a)).first().then((oldData) => {
        console.log(tableName, saveData);
        if (oldData) {
          if (!(oldData.id === saveData.id)) {
            observer.next(false);
            return;
          }
        }
        if (saveData.id) {
          this.db.user.update(saveData.id, saveData).then((updated) => {
            if (updated) {
              observer.next(saveData.id);
              this.msg.success('更新成功🙂');
            } else {
              observer.next(false);
              this.msg.warning('数据没有变更？');
            }
          }).catch(() => {
            this.msg.error('出错了😵');
          });
        } else {
          saveData.id = new Date().getTime();
            this.db.user.add(saveData).then(() => {
              observer.next(saveData.id);
              this.msg.success('添加成功🙂');
            }).catch(() => {
              this.msg.error('出错了😵');
            });
        }
      }).catch(() => {
      });
    });
  }
}


export class DB extends Dexie {
  user!: Dexie.Table<User, number>;

  constructor() {
    super('KVM');
    this.version(1).stores({
      user: userIndex,
    });
    this.open();
  }
}
