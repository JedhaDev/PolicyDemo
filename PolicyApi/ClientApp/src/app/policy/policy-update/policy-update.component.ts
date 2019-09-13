import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PolicyEntity } from '../../shared/interfaces/policy-entity.model';
import { PolicyHolderEntity } from '../../shared/interfaces/policy-holder-entity.model';
import { Gender } from '../../shared/interfaces/gender.model';

import { ErrorHandlerService } from '../../shared/services/errorhandler.service';
import { RepositoryService } from '../../shared/services/repository.service';

@Component({
  selector: 'app-policy-update',
  templateUrl: './policy-update.component.html',
  styleUrls: ['./policy-update.component.css']
})
export class PolicyUpdateComponent implements OnInit {

  errorMessage: string = '';
  form: FormGroup;
  policy: PolicyEntity;
  genders = Array<Gender>();
  selectedGender: string;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,
    private router: Router, private activeRoute: ActivatedRoute)
  {
  }

  ngOnInit() {

    this.genders = Array<Gender>();
    this.genders.push(new Gender("Male", 'male'));
    this.genders.push(new Gender("Female", 'female'));

    this.form = new FormGroup({
      policyNumber: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      age: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
      gender: new FormControl('', [Validators.required])
    });

    this.getPolicyDetails();
   
  }

  getPolicyDetails() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/policy/details/${id}`;
 
    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.policy = (res as PolicyEntity);

        this.form.controls["policyNumber"].patchValue(this.policy.policyNumber);
        this.form.controls["name"].patchValue(this.policy.policyHolder.name);
        this.form.controls["age"].patchValue(this.policy.policyHolder.age);
        this.form.controls["gender"].patchValue(this.policy.policyHolder.gender);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });

  }


  public validateControl(controlName: string) {
    if (this.form.controls[controlName].invalid && this.form.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.form.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }

  selectOption(value: string) {
    this.selectedGender = value;
  }


  public updatePolicy(policyFormValue) {
    if (this.form.valid) {
      this.executePolicyUpdate(policyFormValue);
    }
  }

  private executePolicyUpdate(form) {
    let policy: PolicyEntity = {
      policyNumber: form.policyNumber,
      policyHolder: {
        name: form.name,
        age: form.age,
        gender: this.selectedGender
      }
    };

    let apiUrl = 'api/policy';
    this.repository.update(apiUrl, policy)
      .subscribe(res => {
        this.redirectToPolicyList();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      )
  }

  public redirectToPolicyList() {
    this.router.navigate(['/policy/list']);
  }

}
