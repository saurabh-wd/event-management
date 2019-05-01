import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }
  @Input() currentPage: number = 1;
  @Input() recordsPerPage: number = 3;
  @Input() totalRecords: number;

  @Input() showBtnBeforeAcitve: number = 2;
  @Input() showBtnAfterAcitve: number = 2;


  @Output('doPaginate') doPaginate = new EventEmitter<number>();

  totalPages() {
    return Math.ceil(this.totalRecords / this.recordsPerPage);
  }
  getPages() {
    let pages = [];
    for (let i = 1; i <= this.totalPages(); i++) {
      pages.push(i);
    }
    return pages;
  }
  paginate(pageNum: number) {
    this.currentPage = pageNum;
    this.doPaginate.emit(pageNum);
  }

  showingFrom() {
    return ((this.currentPage - 1) * this.recordsPerPage) + 1;
  } showingTo() {
    let to = this.showingFrom() + this.recordsPerPage - 1;
    return to > this.totalRecords ? this.totalRecords : to;
  }
  ngOnInit() {

  }

}
