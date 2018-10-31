import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualRoutingModule } from './manual-routing.module';
import { ManualComponent } from './manual.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ManualRoutingModule
  ],
  declarations: [ManualComponent]
})
export class ManualModule { }
