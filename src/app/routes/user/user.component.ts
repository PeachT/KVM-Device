import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SFComponent } from '@delon/form';
import { of, from } from 'rxjs';
import { User, userInit as datainit } from 'app/db/models/user';
import { NzMessageService } from 'ng-zorro-antd';
import { DbService, tableNames } from 'app/db/db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/services/app.service';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { Menus } from 'app/models/menu';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit, AfterViewInit {
    // /** id */
    // id?: number;
    // /** 名称 */
    // name: string;
    // /** 密码 */
    // password: string;
    // /** 权限 */
    // authority: number;
    // /** 头像 */
    // avatar?: any;
  @ViewChild('sf')
  private sf: SFComponent;
  /** 动态表单 */
  schema = {
    properties: {
      id: {
        type: 'string',
        title: 'id',
        ui: {
          grid: { span: 24 },
        },
      },
      name: {
        type: 'string',
        title: '用户名',
        minLength: 2,
      },
      password: {
        type: 'string',
        title: '密码',
      },
      authority: {
        type: 'string',
        title: '权限',
        ui: {
            widget: 'radio',
            'styleType': 'button',
            asyncData: () => of(this.authority())
        },
        default: 0
      },
    },
    required: ['name', 'password'],
    ui: {
      spanLabelFixed: 100,
    },
    // hidden: true,
    disabled: true,
  };
  /** 初始化数据 */
  formData: User = datainit;
  /** 表单样式 */
  ui = {};
  /** 表单布局 */
  layout = 'horizontal';
  /** 表单编辑状态 */
  edit = false;
  /** 数据 */
  data: User = null;
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
  }
  // ngDoCheck() {
  //   console.log('更新完成');
  // }
  authority() {
    const s = [
      { label: '操作员', value: 0},
    ];
    const authority = this.settingService.user.authority;
    if (authority >= 1) {
      s.push({ label: '管理员', value: 1});
    }
    if (authority === 9) {
      s.push({ label: '超级管理员', value: 9});
    }
    return s;
  }
  /** 获取一条数据 */
  getData(id) {
    this._db.getByid(tableNames.user, id).then(d => {
      this.data = d as User;
      // this.add(this.data);
      this.formData = this.data;
      this.app.edit = false;
    });
  }
  /** 获取菜单 */
  getMenu() {
    console.log('获取菜单', this.settingService.user);
    const authority = this.settingService.user.authority;
    const menu = [];
    this._db.db.user.filter(u => u.authority < authority).each(d => {
      menu.push({title: d.name, link: String(d.id)});
    }).then((ds) => {
      this.app.menus = menu;
    });
  }
  /** 提交表单 */
  submit(value: User) {
    const s = this._db.post(tableNames.user, value, (p) => p.name === value.name).subscribe((res) => {
      console.log(res);
      if (res) {
        this.getMenu();
        this.app.goNavigate(res);
      }
      s.unsubscribe();
    });
  }
  /** 删除数据 */
  delete() {
  }
}
