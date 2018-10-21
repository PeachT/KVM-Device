import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
})
export class UserRegisterComponent implements OnDestroy {
  loading = false;
  user = {
    name: '',
    password: ''
  };

  constructor(
    private router: Router,
  ) {
  }
  submit() {
    this.loading = true;
    if (this.user.name === 'admin' && this.user.password === '888888') {
      // 否则直接跳转
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
  }
}
