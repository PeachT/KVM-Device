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

  constructor(
    fb: FormBuilder,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: TokenService,
    private startupSrv: StartupService,
  ) {}

  // endregion

  submit() {
    this.loading = true;
    if (this.user.name === 'admin' && this.user.password === '888888') {
      // 清空路由复用信息
      this.reuseTabService.clear();
      // 设置Token信息
      this.tokenService.set({
        token: '123456789',
        name: this.user.name,
        email: `cipchk@qq.com`,
        id: 10000,
        time: +new Date(),
      });
      // 重新获取 StartupService 内容，若其包括 User 有关的信息的话
      // this.startupSrv.load().then(() => this.router.navigate(['/']));
      // 否则直接跳转
      this.router.navigate(['/']);
    }
  }

  // endregion

  ngOnDestroy(): void {
  }
}
