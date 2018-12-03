import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SFComponent } from '@delon/form';
import { of } from 'rxjs';
import { SettingsService } from '@delon/theme';
import { DbService, tableNames } from 'app/db/db.service';
import { AppService } from 'app/services/app.service';
import { ActivatedRoute } from '@angular/router';
import { Device, deviceInit as datainit } from 'app/db/models/device';

const ui = {
  spanLabelFixed: 100,
  grid: { span: 24 },
};
const ui12 = {
  spanLabelFixed: 100,
  grid: { span: 12 },
};
const ui8 = {
  spanLabelFixed: 100,
  grid: { span: 8 },
};
function detail(name) {
  return {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        title: '',
        name: name,
        ui: {
          widget: 'device-detail',
          spanLabelFixed: 1,
          grid: { span: 24 },
        }
      },
      jackNumber: {
        type: 'string',
        title: '千斤顶编号',
        ui: ui8
      },
      pumpNumber: {
        type: 'string',
        title: '油泵编号',
        ui: ui8
      },
      calibrationDate: {
        type: 'string',
        title: '标定日期',
        format: 'date',
        ui: ui8
      },
      a: {
        type: 'number',
        title: 'a系数',
        ui: ui8,
      },
      b: {
        type: 'number',
        title: 'b系数',
        ui: ui8
      },
      mm: {
        type: 'object',
        properties: {
          0: {type: 'number', title: '20mm', ui: ui8},
          1: {type: 'number', title: '60mm', ui: ui8},
          2: {type: 'number', title: '100mm', ui: ui8},
          3: {type: 'number', title: '140mm', ui: ui8},
          4: {type: 'number', title: '180mm', ui: ui8},
          5: {type: 'number', title: '220mm', ui: ui8},
        },
        required: ['0', '1', '2', '3', '4', '5'],
        ui: {
          grid: { span: 24},
        }
      }
    },
    required: ['a', 'b'],
    ui: {
      spanLabelFixed: 100,
      grid: { span: 24},
    }
  };
}
const a1 = detail('A1');
const a2 = detail('A2');
const b1 = detail('B1');
const b2 = detail('B2');
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.less']
})
export class DeviceComponent implements OnInit, AfterViewInit {
  // /** id */
  // id: number;
  // /** 名称 */
  // name: string;
  // /** 顶型号 */
  // jackModel: string;
  // /** 泵型号 */
  // pumpModel: string;
  // /** 工作模式 */
  // workMode: Array<number>;
  /** 设备 */
  // mode: Array<string>;
  // /** 方程式 */
  // equation: boolean;
  /** 设备详情 */
  // detail: Array<Detail>;
  @ViewChild('sf')
  private sf: SFComponent;
  /** 动态表单 */
  schema = {
    properties: {
      id: {
        type: 'string',
        title: 'id',
        ui: {
          spanLabelFixed: 100,
          grid: { span: 24 },
        }
      },
      name: {
        type: 'string',
        title: '设备名称',
        minLength: 1,
        ui: {
          spanLabelFixed: 100,
          grid: { span: 24 },
        }
      },
      jackModel: {
        type: 'string',
        title: '顶型号',
        ui: {
          spanLabelFixed: 100,
          grid: { span: 12 },
        }
      },
      pumpModel: {
        type: 'string',
        title: '油泵型号',
        ui: {
          spanLabelFixed: 100,
          grid: { span: 12 },
        }
      },
      equation: {
        type: 'string',
        title: '方程式',
        // enum: [
        //   { label: 'P=aF+b F张拉控制应力KN', value: true },
        //   { label: 'F=aP+b P张拉控制应力MPa', value: false },
        // ],
        ui: {
          widget: 'radio',
          spanLabelFixed: 100,
          grid: { span: 24 },
          asyncData: () => of([
            { label: 'P=aF+b F张拉控制应力KN', value: true },
            { label: 'F=aP+b P张拉控制应力MPa', value: false },
          ])
        },
        default: true
      },
      workMode: {
        type: 'string',
        title: '工作模式',
        // enum: [
        //   { label: 'A单顶', value: 0 },
        //   { label: 'B单顶', value: 1 },
        //   { label: 'A两顶', value: 2 },
        //   { label: 'B两顶', value: 3 },
        //   { label: '四顶', value: 4 },
        // ],
        // readOnly: true,
        ui: {
          widget: 'checkbox',
          spanLabelFixed: 100,
          grid: { span: 24 },
          asyncData: () => of([
            { label: 'A单顶', value: 0 },
            { label: 'B单顶', value: 1 },
            { label: 'A两顶', value: 2 },
            { label: 'B两顶', value: 3 },
            { label: '四顶', value: 4 },
          ])
        },
        default: [0],
      },
      // a1: a1,
      // a2: a2,
      // b1: b1,
      // b2: b2,
      a1: detail('A1'),
      a2: detail('A2'),
      b1: detail('B1'),
      b2: detail('B2'),
    },
    required: ['name', 'jackModel', 'pumpModel', 'workMode'],
    ui: {
      spanLabelFixed: 100,
      grid: { span: 12 },
    }
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
    private _db: DbService,
    public app: AppService,
    private _activatedRoute: ActivatedRoute,
    private settingService: SettingsService,
  ) { }

  ngOnInit() {
    this.getMenu();
    /** 路由改变监控 */
    this._activatedRoute.params.subscribe(params => {
      console.log('路由', params);
      this.app.menuAction = [];
      if (params.id) {
        this.getData(params.id);
        this.app.menuAction[0] = params.id;
        this.app.nowRoute = this.app.menuAction.concat();
      }
    });
  }

  ngAfterViewInit() {
    console.log('完成！！');
    // this.inputDisabled();
  }
  // ngDoCheck() {
  //   console.log('更新完成');
  // }
  modeChange(v) {
    console.log('mode', v);
  }
  /** 获取一条数据 */
  getData(id) {
    this._db.getByid(tableNames.device, id).then(d => {
      this.data = d as Device;
      // this.add(this.data);
      this.formData = this.data;
      this.app.edit = false;
    });
  }
  /** 获取菜单 */
  getMenu() {
    const menu = [];
    this._db.db.device.each(d => {
      menu.push({ title: d.name, link: String(d.id) });
    }).then((ds) => {
      this.app.menus = menu;
    });
  }
  /** 提交表单 */
  submit(value: Device) {
    console.log(value);
    const s = this._db.post(tableNames.device, value, (p) => p.name === value.name).subscribe((res) => {
      console.log(res);
      if (res) {
        this.getMenu();
        this.app.goNavigate(res);
        // this.inputDisabled();
      }
      s.unsubscribe();
    });
  }
  /** 删除数据 */
  delete() {
  }

}
