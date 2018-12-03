import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { SFComponent } from '@delon/form';
import { of } from 'rxjs';
import { SettingsService } from '@delon/theme';
import { DbService, tableNames } from 'app/db/db.service';
import { AppService } from 'app/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { Device, deviceInit as datainit } from 'app/db/models/device';

@Component({
  selector: 'app-sf',
  templateUrl: './sf.component.html',
  styleUrls: ['./sf.component.less']
})
export class SfComponent implements OnInit {
  @ViewChild('sf')
    private sf: SFComponent;
  /** 动态表单 */
  @Input()
    schema: any;
  /** 初始化数据 */
  @Input()
    formData: any;
  /** 表单样式 */
  @Input()
    ui = {};
  /** 数据 */
  @Input()
    data: Device = null;

  /** 表单布局 */
  layout = 'horizontal';

  @Output()
    superSubmit = new EventEmitter();
  @Output()
    superDelete = new EventEmitter();

  constructor(
    private _db: DbService,
    public app: AppService,
    private _activatedRoute: ActivatedRoute,
    private settingService: SettingsService,
  ) { }

  ngOnInit() {
  }


  /** 提交表单 */
  submit(value) {
    this.superSubmit.emit(value);
  }
    /** 删除数据 */
    delete() {
      this.superSubmit.emit();
    }

  /** 表单取消编辑 */
  cancel() {
    console.log(this.app.menuAction[0]);
    if (this.data) {
      this.refresh(this.data);
    } else {
      this.sf.reset();
    }
    this.app.edit = false;
    // this.inputDisabled();
  }
  /** 添加一条数据 */
  add() {
    this.refresh(datainit);
  }
  /** 刷新数据 */
  refresh(data) {
    this.formData = data;
    this.sf.refreshSchema();
    this.app.edit = true;
  }
  /** 更改数据 */
  update() {
    this.app.edit = true;
    // this.inputDisabled();
  }

}
