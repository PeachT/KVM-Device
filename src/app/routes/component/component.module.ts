import { NgModule } from '@angular/core';

import { ComponentRoutingModule } from './component-routing.module';
import { ComponentComponent } from './component.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ComponentRoutingModule
  ],
  declarations: [ComponentComponent]
})
export class ComponentModule { }
