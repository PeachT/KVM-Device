import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { DbService, tableNames } from 'app/db/db.service';
import { User } from 'app/db/models/user';

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
    private _db: DbService,
  ) {
  }
  submit() {
    this.loading = true;
    const user: User = {
      name: this.user.name,
      password: this.user.password,
      authority: 9
    };
    this._db.post(tableNames.user, user, (u) => u.name === user.name).subscribe((res) => {
      console.log(res);
      if (res) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
  }
}
