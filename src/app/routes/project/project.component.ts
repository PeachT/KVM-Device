import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SFComponent } from '@delon/form';
import { Project, projectInit } from 'app/db/models/project';
import { DbService, tableNames } from 'app/db/db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit, AfterViewInit {
  // /** id */
  // id: number;
  // /** 项目名称 */
  // name: string;
  // /** 分布工程 */
  // divisionProject: string;
  // /** 施工单位 */
  // constructionUnit: string;
  // /** 分项工程 */
  // subProject: string;
  // /** 单位工程 */
  // unitProject: string;
  // /** 工程部位 */
  // engineeringSite: string;
  // /** 合同段 */
  // contractSection: string;
  // /** 桩号范围 */
  // stationRange: string;
  // /** 监理 */
  // supervisions: Array<Supervision>;
  // /** 钢绞线 */
  // steelStrands: Array<SteelStrand>;
  @ViewChild('sf')
    private sf: SFComponent;
  @ViewChild('dsf')
    private sfdom: ElementRef;
  schema = {
    properties: {
      id: {
        type: 'string',
        title: 'id',
        ui: {
          grid: { span: 24 }
        }
      },
      name: {
        type: 'string',
        title: '项目名称',
        minLength: 1,
      },
      divisionProject: {
        type: 'string',
        title: '分布工程',
      },
      constructionUnit: {
        type: 'string',
        title: '施工单位',
      },
      subProject: {
        type: 'string',
        title: '分项工程',
      },
      unitProject: {
        type: 'string',
        title: '单位工程',
      },
      engineeringSite: {
        type: 'string',
        title: '工程部位',
      },
      contractSection: {
        type: 'string',
        title: '合同段',
      },
      stationRange: {
        type: 'string',
        title: '桩号范围',
      },
      supervisions: {
        type: 'array',
        title: '监理',
        maxItems: 4,
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              title: '姓名'
            },
            phone: {
              type: 'string',
              title: '联系方式',
            },
            unit: {
              type: 'string',
              title: '公司名称',
            },
            imgbase64: {
              type: 'string',
              title: '头像',
              ui: {
                widget: 'filebase64',
              }
            },
          },
          required: [
            'name',
          ],
          ui: {
            spanLabel: 5,
            spanControl: 19
          }
        },
        ui: {
          grid: { span: 24, arraySpan: 12 }
        }
      },
    },
    required: ['name'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 12
      }
    }
  };
  formData: Project = projectInit;
  ui = {};
  layout = 'horizontal';
  edit = false;
  initSuccess = false;
  data: Project = null;

  constructor(
    private msg: NzMessageService,
    private _db: DbService,
    private router: Router,
    private app: AppService,
    private _activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.getMenu();
    this._activatedRoute.params.subscribe(params => {
      console.log('路由', params);
      if (params.id) {
        this.getData(params.id);
        this.app.menuAction[0] = params.id;
      }
    });
  }
  ngAfterViewInit() {
    this.initSuccess = true;
  }

  getData(id) {
    this._db.getByid(tableNames.project, id).then(d => {
      this.data = d as Project;
      // this.add(this.data);
      this.formData = this.data;
      this.edit = false;
    });
  }
  getMenu() {
    console.log('获取菜单');
    this._db.getAll(tableNames.project).then(p => {
      console.log('菜单', p);
      this.app.menus = p;
    });
  }

  submit(value: any) {
    this.msg.success(JSON.stringify(value));
    const s = this._db.post(tableNames.project, value, (p) => p.name === value.name).subscribe((res) => {
      console.log(res);
      if (res) {
        this.getMenu();
        this.router.navigate([this.app.nowUrl, res]);
      }
      s.unsubscribe();
    });
  }

  change(value: any) {
    // console.log('formChange', value, this.initSuccess);
    if (this.initSuccess) {
      // this.edit = true;
    }
  }

  error(value: any) {
    // console.log('formError', value);
  }
  cancel() {
    console.log(this.app.menuAction[0]);
    if (this.data.id) {
      this.add(this.data);
    } else {
      this.sf.reset();
    }
    this.edit = false;
  }
  add(data = projectInit) {
    // console.log(this.formData);
    this.formData = data;
    this.sf.refreshSchema();
    this.edit = true;
  }
  update() {
    this.edit = true;
  }
  delete() {
  }
  r() {
    this.sf.refreshSchema();
    this.edit = true;
  }
}
