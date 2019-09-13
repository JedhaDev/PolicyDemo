import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/errorhandler.service';
import { TranslateService } from '@ngx-translate/core';

import { PolicyEntity } from './../../shared/interfaces/policy-entity.model';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css']
})
export class PolicyListComponent implements OnInit {
  public policies: PolicyEntity[];
  public errorMessage: string = '';
  config: any;
  policyNumber: number;

  constructor(public repository: RepositoryService, public router: Router,  public errorHandler: ErrorHandlerService,
              public translate: TranslateService) {
  }

  ngOnInit() {

    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 0
    };

    this.getTotal();
    this.getAllPolicysPaged();
  }

  public getTotal() {
    let apiAddress: string = "api/policy/total";
    this.repository.getData(apiAddress)
    .subscribe(res => {
      this.config.totalItems = res;
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  public getAllPolicysPaged() {
    let apiAddress: string = "api/policy/paged/" + this.config.currentPage + "/" + this.config.itemsPerPage;
    this.repository.getData(apiAddress)
      .subscribe(res => {

      this.policies = res as PolicyEntity[];

      for (let i = this.policies.length; i < this.config.itemsPerPage; i++) {
        let data: PolicyEntity;
        this.policies.push(data);
      }
    },
        (error) => {
          console.log("############>");
          console.log(error);
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    });
  }

  public viewPolicy(id: any) {
    let detailsUrl: string = `/policy/details/${id}`;
    this.router.navigate([detailsUrl]);
  }

  public createPolicy() {
    let detailsUrl: string = `policy/create`;
    this.router.navigate([detailsUrl]);
  }

  public updatePolicy(id) {
    let updateUrl: string = `policy/update/${id}`;
    this.router.navigate([updateUrl]);
  }

  private confirmDelete(id) {
    this.policyNumber = id;
    $('#questionModal').modal();
  }

  private deletePolicy() {
    let deleteUrl: string = `api/policy/${this.policyNumber}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        //this.router.navigate(['/policy/list']);
        this.ngOnInit();
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
  }
  
  pageChanged(event) {
    this.config.currentPage = event;
    this.getAllPolicysPaged();
  }

}
