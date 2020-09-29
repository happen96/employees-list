import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { FormModalService } from './form-modal.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormModalComponent implements OnInit, OnDestroy {

  @Input() id: string;
  private element: any;

  constructor(private modalService: FormModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    this.modalInit();
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  modalInit(): void {
    document.body.appendChild(this.element);

    this.element.addEventListener('click', el => {
      if (el.target.className === 'form-modal') {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('form-modal-open');
  }

  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('form-modal-open');
  }
}
