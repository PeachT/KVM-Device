import { SettingsService } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {
  SocialService,
  SocialOpenType,
  TokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core/startup/startup.service';
import { DB, DbService } from 'app/db/db.service';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  loading = false;
  user = {
    name: '',
    password: ''
  };
  db: DB;

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private socialService: SocialService,
    private settingService: SettingsService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
    private _db: DbService,
  ) {
    this.db = _db.db;
  }

  // endregion

  submit() {
    this.loading = true;
    this.db.user.filter(a => a.name === this.user.name && a.password === this.user.password).first().then((user) => {
      console.log(user);
      this.loading = false;
      if (user) {
        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置Token信息
        this.tokenService.set({
          token: `${user.id}`,
          name: this.user.name,
          email: `cipchk@qq.com`,
          id: 10000,
          time: +new Date(),
          // user: user
        });
        // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
        // this.startupSrv.load().then(() => this.router.navigate(['/']));
        // 设置用户信息
        const setUser: any = {
          name: user.name,
          avatar: user.avatar,
          authority: user.authority,
          token: `${user.id}`
        };
        this.settingService.setUser(setUser);
        // 否则直接跳转
        this.msg.success('登录成功🙂');
        this.router.navigate(['/']);
      } else {
        this.msg.error('登录失败😔');
      }
    }).catch(() => {
      this.msg.error('获取数据出错了！😔');
    });
  }

  // endregion

  ngOnDestroy(): void {
  }
}
