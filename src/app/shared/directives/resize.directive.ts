import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  AfterViewInit,
  Input,
} from '@angular/core';

@Directive({
  selector: '[resizeable]',
  standalone: true,
})
export class ResizeDirective implements AfterViewInit {
  @Input() resizableSelector?: string;
  private dragging: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    if (this.resizableSelector) {
      this.el.nativeElement = this.el.nativeElement.querySelector(
        this.resizableSelector
      );
    }

    let resizeHandle = this.renderer.createElement('div');
    this.renderer.addClass(resizeHandle, 'resize-handle');
    this.renderer.appendChild(this.el.nativeElement, resizeHandle);

    // desktop
    this.renderer.listen(
      resizeHandle,
      'mousedown',
      this.onMouseDown.bind(this)
    );

    //mobile
    this.renderer.listen(
      resizeHandle,
      'touchstart',
      this.onTouchStart.bind(this)
    );
  }

  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.dragging = true;
    this.renderer.listen('document', 'mousemove', this.onMouseMove.bind(this));
    this.renderer.listen('document', 'mouseup', this.onMouseUp.bind(this));
  }

  onMouseMove(event: MouseEvent) {
    if (!this.dragging) return;

    let width = event.clientX - this.el.nativeElement.offsetLeft;
    let height = event.clientY - this.el.nativeElement.offsetTop;

    this.renderer.setStyle(this.el.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.el.nativeElement, 'height', `${height}px`);
  }

  onMouseUp() {
    this.dragging = false;
  }

  onTouchStart(event: TouchEvent) {
    event.preventDefault();
    this.dragging = true;
    this.renderer.listen('document', 'touchmove', this.onTouchMove.bind(this));
    this.renderer.listen('document', 'touchend', this.onTouchEnd.bind(this));
  }

  onTouchMove(event: TouchEvent) {
    if (!this.dragging) return;

    const touch = event.touches[0];

    let width = touch.clientX - this.el.nativeElement.offsetLeft;
    let height = touch.clientY - this.el.nativeElement.offsetTop;

    this.renderer.setStyle(this.el.nativeElement, 'width', `${width}px`);
    this.renderer.setStyle(this.el.nativeElement, 'height', `${height}px`);
  }

  onTouchEnd() {
    this.dragging = false;
  }
}
