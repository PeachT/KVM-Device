import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{settings.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item routerLink="/lock">
        <i nz-icon type="lock" theme="outline"></i>
        锁屏
      </div>
      <div nz-menu-item (click)="logout()">
        <i nz-icon type="logout" theme="outline"></i>
        登出
      </div>
      <li nz-menu-divider></li>
      <div nz-menu-item routerLink="/lock">
        <i nz-icon type="reload" theme="outline"></i>
        重启
      </div>
      <div nz-menu-item (click)="logout()">
        <i nz-icon type="poweroff" theme="outline"></i>
        关机
      </div>
    </div>
  </nz-dropdown>
  `,
})
export class HeaderUserComponent {
  constructor(
    public settings: SettingsService,
    private router: Router,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {}

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
}
