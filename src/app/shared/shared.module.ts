import { TooltipModule } from 'ngx-tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListHeaderComponent } from './list-header.component';
import { ButtonFooterComponent } from './button-footer.component';
import { ModalComponent } from './modal.component';
import { SpanTooltipComponent } from './span-tooltip.component';

const components = [
  ButtonFooterComponent,
  ListHeaderComponent,
  ModalComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule,TooltipModule],
  declarations: [components, SpanTooltipComponent],
  exports: [components, FormsModule, ReactiveFormsModule, SpanTooltipComponent]
})
export class SharedModule {}
