import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-question-modal',
  templateUrl: './question-modal.component.html',
  styleUrls: ['./question-modal.component.css', '../modal-shared.component.css']
})
export class QuestionModalComponent implements OnInit {

  @Input() public modalHeaderText: string;
  @Input() public modalBodyText: string;
  @Input() public cancelButtonText: string;
  @Input() public confirmButtonText: string;
  @Output() public redirectOnConfirm = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public emmitEvent() {
    this.redirectOnConfirm.emit();
  }
}
