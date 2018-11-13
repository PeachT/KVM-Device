import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SettingsService } from '@delon/theme';
import { AppService } from 'app/services/app.service';

@Component({
  selector   : 'layout-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(
    public settings: SettingsService,
    public msgSrv: NzMessageService,
    public app: AppService) {
  }
}
