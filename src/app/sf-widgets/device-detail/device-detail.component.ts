import { Component, OnInit } from '@angular/core';
import { ControlWidget } from '@delon/form';
import { AppService } from 'app/services/app.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sf-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.less']
})
export class DeviceDetailComponent extends ControlWidget implements OnInit {
  /* 用于注册小部件 KEY 值 */
  static readonly KEY = 'device-detail';

  data = {
    name: null
  };
  // 组件所需要的参数，建议使用 `ngOnInit` 获取
  config: any;
  loadingTip: string;

  ngOnInit(): void {
    this.loadingTip = this.ui.loadingTip || '加载中……';
    this.config = this.ui.config || {};
    console.log('title', this);
  }

  // reset 可以更好的解决表单重置过程中所需要的新数据问题
  reset(value: string) {

  }

  upFile(files) {
    const file = files.target.files[0];
    console.log(file);
    if (!/image\/\w+/.test(file.type)) {
      alert('请确保文件为图像类型');
      return false;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // setValue(this.result);
      console.log(reader.result);
      this.setValue(reader.result);
    };
  }
}
