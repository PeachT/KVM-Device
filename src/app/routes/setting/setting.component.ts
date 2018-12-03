import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SFComponent } from '@delon/form';
import { Project, projectInit as datainit } from 'app/db/models/project';
import { DbService, tableNames } from 'app/db/db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/services/app.service';

const sfd = {};
const rsfd = [];
for (let index = 0; index < 25; index++) {
  sfd[`F${index}`] =  {
    type: 'string',
    default: index
  };
  rsfd.push(`F${index}`);
}
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less']
})
export class SettingComponent implements OnInit, AfterViewInit {

  @ViewChild('sf')
    private sf: SFComponent;
  /** 动态表单 */
  schema = {
    properties: sfd,
    required: rsfd,
    // ui: {
    //   spanLabelFixed: 100,
    //   grid: {
    //     span: 6
    //   },
    // },
  };
  /** 初始化数据 */
  formData: Project = datainit;
  /** 表单样式 */
  ui = {};
  /** 表单布局 */
  layout = 'horizontal';
  /** 表单编辑状态 */
  edit = false;
  /** 数据 */
  data: Project = null;

  constructor(
    private msg: NzMessageService,
    private _db: DbService,
    private router: Router,
    public app: AppService,
    private _activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    // this.getMenu();
    // /** 路由改变监控 */
    // this._activatedRoute.params.subscribe(params => {
    //   console.log('路由', params);
    //   this.app.menuAction = [];
    //   if (params.id) {
    //     this.getData(params.id);
    //     this.app.menuAction[0] = params.id;
    //     this.app.nowRoute = this.app.menuAction.concat();
    //   }
    // });
  }

  ngAfterViewInit() {
    console.log('完成！！');
    // this.inputDisabled();
  }
  // ngDoCheck() {
  //   console.log('更新完成');
  // }
  /** 获取一条数据 */
  getData(id) {
    this._db.getByid(tableNames.project, id).then(d => {
      this.data = d as Project;
      // this.add(this.data);
      this.formData = this.data;
      this.app.edit = false;
    });
  }
  /** 获取菜单 */
  getMenu() {
    console.log('获取菜单');
    this._db.getAll(tableNames.project, (d) => ({title: d.name, link: String(d.id)})).then(p => {
      console.log('菜单', p);
      this.app.menus = p;
    });
  }
  /** 提交表单 */
  submit(value: any) {
    const s = this._db.post(tableNames.project, value, (p) => p.name === value.name).subscribe((res) => {
      console.log(res);
      if (res) {
        this.getMenu();
        this.getData(res);
        // this.router.navigate([this.app.nowUrl, res]);
        // this.app.edit = false;
        this.app.goNavigate(res);
      }
      s.unsubscribe();
    });
  }
  /** 删除数据 */
  delete() {
  }
}
