import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PolicyCreateComponent } from './policy-create.component';

import { RouterTestingModule } from '@angular/router/testing';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HttpLoaderFactory } from "../../app.module";

import { RepositoryService } from '../../shared/services/repository.service';
import { UrlService } from '../../shared/services/url.service';
import { ErrorHandlerService } from '../../shared/services/errorhandler.service';

describe('PolicyCreateComponent', () => {
  let component: PolicyCreateComponent;
  let fixture: ComponentFixture<PolicyCreateComponent>;
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })],
      providers: [TranslateService, RepositoryService, UrlService, ErrorHandlerService],
      declarations: [PolicyCreateComponent,],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    translate = TestBed.get(TranslateService);
    http = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('policyNumber validation', () => {
    let item = component.form.controls['policyNumber'];
    expect(item.valid).toBeFalsy();

    let errors = {};
    item.setValue("");
    errors = item.errors || {};
    expect(errors['required']).toBeTruthy(); // this works
  });

  it('name validation', () => {
    let item = component.form.controls['name'];
    expect(item.valid).toBeFalsy();

    let errors = {};
    item.setValue("");
    errors = item.errors || {};
    expect(errors['required']).toBeTruthy(); // this works
  });


  it('age validation', () => {
    let item = component.form.controls['age'];
    expect(item.valid).toBeFalsy();

    let errors = {};
    item.setValue("");
    errors = item.errors || {};
    expect(errors['required']).toBeTruthy(); // this works

    item.setValue("aa");
    errors = item.errors || {};
    expect(errors['pattern']).toBeTruthy(); // this works
  });
});
