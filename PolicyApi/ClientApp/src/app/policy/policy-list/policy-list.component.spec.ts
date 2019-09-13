import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyListComponent } from './policy-list.component';


import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpLoaderFactory } from "../../app.module";

import { RepositoryService } from '../../shared/services/repository.service';
import { UrlService } from '../../shared/services/url.service';
import { ErrorHandlerService } from '../../shared/services/errorhandler.service';
import { NgxPaginationModule } from 'ngx-pagination';

describe('PolicyListComponent', () => {
  let component: PolicyListComponent;
  let fixture: ComponentFixture<PolicyListComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyListComponent ],
      imports: [ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPaginationModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })],
      providers: [TranslateService, RepositoryService, UrlService, ErrorHandlerService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test table data', () => {

    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBeGreaterThan(0);

    // Header row
    let headerRow = tableRows[0];
    expect(headerRow.cells[0].innerHTML).toBe(translate.instant('policy.policynumber'));
    expect(headerRow.cells[1].innerHTML).toBe(translate.instant('policy.name'));
    expect(headerRow.cells[2].innerHTML).toBe(translate.instant('policy.age'));
    expect(headerRow.cells[3].innerHTML).toBe(translate.instant('policy.gender'));
  });
  
});
