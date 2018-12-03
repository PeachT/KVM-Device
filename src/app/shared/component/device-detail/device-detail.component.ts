import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SFComponent } from '@delon/form';
import { of } from 'rxjs';
import { SettingsService } from '@delon/theme';
import { DbService, tableNames } from 'app/db/db.service';
import { AppService } from 'app/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { Device, deviceInit as datainit } from 'app/db/models/device';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.less']
})
export class DeviceDetailComponent implements OnInit, AfterViewInit {
  private sf: SFComponent;
  /** 动态表单 */
  // /** 标定日期 */
  // calibrationDate: Date;
  // /** 千斤顶编号 */
  // jackNumber: string;
  // /** 油泵编号 */
  // pumpNumber: string;
  // /** a系数 */
  // a: number;
  // /** b系数 */
  // b: number;
  // /** 位移校正系数 */
  // mm: Array<number>;
  schema = {
    properties: {
      a1: {
        type: 'object',
        properties: {
          jackNumber: {
            type: 'string',
            title: '千斤顶编号',
          },
          pumpNumber: {
            type: 'string',
            title: '油泵编号',
          },
          calibrationDate: {
            type: 'string',
            title: '标定日期',
            format: 'date',
          },
          a: {
            type: 'number',
            title: 'a系数',
          },
          b: {
            type: 'number',
            title: 'b系数',
          },
        },
        // ui: {
        //   spanLabelFixed: 100,
        //   grid: {span: 8},
        // },
      }
    },
  };
  /** 初始化数据 */
  formData: Device = datainit;
  /** 表单样式 */
  ui = {};
  /** 表单布局 */
  layout = 'horizontal';
  /** 表单编辑状态 */
  edit = false;
  /** 数据 */
  data: Device = null;
  /** 首次错误提示状态 */
  firstVisual = false;

  constructor(
    public app: AppService,
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  /** 提交表单 */
  submit(value: Device) {
  }
  /** 表单变更监控 */
  change(value: Device) {
  }

}
