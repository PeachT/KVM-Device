import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SFComponent } from '@delon/form';
import { Comp, compInit as datainit } from 'app/db/models/component';
import { NzMessageService } from 'ng-zorro-antd';
import { DbService, tableNames } from 'app/db/db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/services/app.service';
import { of, from } from 'rxjs';
import { Menus } from 'app/models/menu';
import { groupBy, toArray, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.less']
})

export class ComponentComponent implements OnInit, AfterViewInit {
  // /** id */
  // id: number;
  // /** 构建名称 */
  // componentName: string;
  // /** 孔名称 */
  // holeName: string;
  // /** 孔明细 */
  // holes: Array<string>;
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
      componentName: {
        type: 'string',
        title: '构建名称',
        minLength: 1,
        ui: {
          widget: 'autocomplete',
          debounceTime: 100,
          asyncData: (input: string) => of(this.getComponentNames(input))
        }
      },
      holeName: {
        type: 'string',
        title: '孔名称',
      },
      // 标签
      holes: {
        type: 'string',
        title: 'holes',
        enum: [
          { label: 'N-1', value: 'N-1' },
          { label: 'N-2', value: 'N-2' },
          { label: 'N-3', value: 'N-3' }
        ],
        ui: {
          widget: 'select',
          mode: 'tags',
          grid: { span: 24 },
        },
        default: null
      },
    },
    required: ['componentName', 'holeName', 'holes'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 12
      },
      // hidden: true,
      disabled: true,
    },
    // hidden: true,
    disabled: true,
  };
  /** 初始化数据 */
  formData: Comp = datainit;
  /** 表单样式 */
  ui = {};
  /** 表单布局 */
  layout = 'horizontal';
  /** 表单编辑状态 */
  edit = false;
  /** 数据 */
  data: Comp = null;
  /** 首次错误提示状态 */
  firstVisual = false;

  constructor(
    private msg: NzMessageService,
    private _db: DbService,
    private router: Router,
    public app: AppService,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getMenu();
    /** 路由改变监控 */
    this._activatedRoute.params.subscribe(params => {
      console.log('路由', params);
      this.app.menuAction = [];
      if (params.id) {
        this.getData(params.id);
        this.app.menuAction[0] = params.componentName;
        this.app.menuAction[1] = params.id;
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
  getComponentNames(input): string[] {
    const autos = [];
    this.app.menus.forEach(item => {
      autos.push(item.title);
    });
    return autos;
  }
  /** 获取一条数据 */
  getData(id) {
    this._db.getByid(tableNames.component, id).then(d => {
      this.data = d as Comp;
      // this.add(this.data);
      this.data.holes = this.data.holes.sort();
      this.formData = this.data;
      this.app.edit = false;
    });
  }
  /** 获取菜单 */
  getMenu() {
    console.log('获取菜单');
    // this._db.getAll(tableNames.component, (d: Comp) => ({title: d.componentName, link: String(d.id)})).then(p => {
    //   console.log('菜单', p);
    //   this.app.menus = p;
    // });
    const menu = [];
    this._db.db.component.each(d => {
      menu.push({title: d.componentName, cname: d.holeName, link: String(d.id)});
    }).then((ds) => {
      console.log(ds);
      if (menu.length > 0) {
        // 发出每个 people
        const source = from(menu);
        // 根据 age 分组
        const example = source.pipe(
          groupBy(person => person.title),
          // 为每个分组返回一个数组
          mergeMap(group => group.pipe(toArray()))
        );
        const menus: Menus[] = [];
        const subscribe = example.subscribe(val => {
          console.log(val);
          for (let index = 0; index < val.length; index++) {
            const item = val[index];
            if (index === 0) {
              menus.push({title: item.title, link: item.title, children: [{title: item.cname, link: item.link}]});
            } else {
              menus[menus.length - 1].children.push({title: item.cname, link: item.link});
            }
          }
        });
        this.app.menus = menus;
        console.log(menus);
      }
      // this.app.menus = [];
    });
  }
  /** 提交表单 */
  submit(value: Comp) {
    const s = this._db.post(tableNames.component, value, (p) => (
      p.holeName === value.holeName && p.componentName === value.componentName))
    .subscribe((res) => {
      console.log('保存结果：', res);
      if (res) {
        this.getMenu();
        this.formData = value;
        this.app.goNavigate(res);
      }
      s.unsubscribe();
    });
  }
  /** 删除数据 */
  delete() {
  }
}
