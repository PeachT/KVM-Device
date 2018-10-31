import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TitleService } from '@delon/theme';
import { VERSION as VERSION_ALAIN } from '@delon/theme';
import { VERSION as VERSION_ZORRO, NzModalService } from 'ng-zorro-antd';
import { DbService, DB } from './db/db.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  db: DB;
  constructor(
    el: ElementRef,
    renderer: Renderer2,
    private router: Router,
    private titleSrv: TitleService,
    private modalSrv: NzModalService,
    private _db: DbService,
  ) {
    renderer.setAttribute(
      el.nativeElement,
      'ng-alain-version',
      VERSION_ALAIN.full,
    );
    renderer.setAttribute(
      el.nativeElement,
      'ng-zorro-version',
      VERSION_ZORRO.full,
    );
    this.db = _db.db;
  }

  ngOnInit() {
    console.log('yuanx');
    this.db.user.count().then((data) => {
      console.log('获取用户', data);
      if (data > 0) {
        // this.getProject();
      } else {
        // this.adminIsVisible = true;
        this.router.navigate(['/passport/register']);
      }
    }).catch((error) => {
      console.log('数据库错误！！', error);
    });
    this.router.events
      .pipe(filter(evt => evt instanceof NavigationEnd))
      .subscribe(() => {
        // this.titleSrv.setTitle();
        // this.modalSrv.closeAll();
      });
  }
}
