import { Directive, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import tippy from 'tippy.js'


@Directive({
  selector: '[appToolTip]'
})

export class ToolTipDirective implements AfterViewInit, OnChanges {
  @Input('appToolTip') toolTipContent?: string

  public tippyInstance: any

  constructor(private elRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['toolTipContent']) {
      this.updateToolTipContent
    }
  }

  ngAfterViewInit(): void {
    this.tippyInstance.tippy(this.elRef.nativeElement, {
      content: this.toolTipContent
    })
  }

  updateToolTipContent(){
    if(this.tippyInstance) {
      this.tippyInstance.setContent(this.toolTipContent)
    }
  }
}
