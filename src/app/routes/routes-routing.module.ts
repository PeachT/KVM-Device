import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
// my component
import { ProjectComponent } from './project/project.component';
import { DeviceComponent } from './device/device.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘', titleI18n: 'dashboard' } },
      { path: '', redirectTo: 'manual', pathMatch: 'full' },
      { path: 'manual', loadChildren: './manual/manual.module#ManualModule',
        data: { title: '手动', titleI18n: 'manual' } },
      { path: 'manual/:id', loadChildren: './manual/manual.module#ManualModule',
        data: { title: '手动', titleI18n: 'manual' } },
      // { path: 'project', loadChildren: './project/project.module#ProjectModule',
      //   data: { title: '项目', titleI18n: 'project' } },
      // { path: 'project/:id', loadChildren: './project/project.module#ProjectModule',
      //   data: { title: '项目', titleI18n: 'project' } },
      { path: 'project', component: ProjectComponent,
      data: { title: '项目', titleI18n: 'project' } },
      { path: 'project/:id', component: ProjectComponent,
        data: { title: '项目', titleI18n: 'project' } },

      { path: 'component', loadChildren: './component/component.module#ComponentModule',
        data: { title: '构件', titleI18n: 'component' } },
      { path: 'component/:componentName/:id', loadChildren: './component/component.module#ComponentModule',
        data: { title: '构件', titleI18n: 'component' } },
      // { path: 'device', loadChildren: './device/device.module#DeviceModule',
      //   data: { title: '设备', titleI18n: 'device' } },
      // { path: 'device/:id', loadChildren: './device/device.module#DeviceModule',
      //   data: { title: '设备', titleI18n: 'device' } },
      { path: 'device', component: DeviceComponent,
        data: { title: '设备', titleI18n: 'device' } },
      { path: 'device/:id', component: DeviceComponent,
        data: { title: '设备', titleI18n: 'device' } },

      { path: 'help', loadChildren: './help/help.module#HelpModule',
        data: { title: '帮助', titleI18n: 'help' } },
      { path: 'help/:id', loadChildren: './help/help.module#HelpModule',
        data: { title: '帮助', titleI18n: 'help' } },
      { path: 'setting', loadChildren: './setting/setting.module#SettingModule',
        data: { title: '设置', titleI18n: 'setting' } },
      { path: 'setting/:id', loadChildren: './setting/setting.module#SettingModule',
        data: { title: '设置', titleI18n: 'setting' } },
      { path: 'user', loadChildren: './user/user.module#UserModule',
        data: { title: '用户', titleI18n: 'user' } },
      { path: 'user/:id', loadChildren: './user/user.module#UserModule',
        data: { title: '用户', titleI18n: 'user' } },
      // { path: 'task', loadChildren: './task/task.module#TaskModule', data: { title: '任务', titleI18n: 'task' } },
      { path: 'task/:projectid', loadChildren: './task/task.module#TaskModule',
        data: { title: '任务', titleI18n: 'task' } },
      { path: 'task/:projectid/:id', loadChildren: './task/task.module#TaskModule',
        data: { title: '任务', titleI18n: 'task' } },
      // 业务子模块
      // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
    ]
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } }
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
