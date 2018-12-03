import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppService } from 'app/services/app.service';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.less']
})

export class ManualComponent implements OnInit {
  validateForm: FormGroup;
  fts = [];

  constructor(private fb: FormBuilder, public app: AppService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({});
    this.fts = [];
    for (let index = 0; index < 100; index++) {
      this.fts.push(`F${index}`);
      this.validateForm.addControl(`F${index}`, new FormControl(index, [Validators.required]));
    }
  }
  /** 提交表单 */
  submit(value) {

  }
  /** 删除数据 */
  delete() {

  }

  /** 表单取消编辑 */
  cancel() {

    this.app.edit = false;
    // this.inputDisabled();
  }
  /** 添加一条数据 */
  add() {
    this.refresh();
  }
  /** 刷新数据 */
  refresh() {
    this.app.edit = true;
  }
  /** 更改数据 */
  update() {
    this.app.edit = true;
    // this.inputDisabled();
  }
}
