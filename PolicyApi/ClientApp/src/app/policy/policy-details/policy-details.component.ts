import { Component, OnInit } from '@angular/core';
import { PolicyEntity } from '../../shared/interfaces/policy-entity.model';
import { Gender } from '../../shared/interfaces/gender.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/errorhandler.service';

import { AppComponent } from './../../app.component';

import { from } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {

  public policy: PolicyEntity;
  public errorMessage: string = '';
  public genders = Array<Gender>();
  public app: AppComponent;
  form: FormGroup;

  constructor(private repository: RepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getPolicyDetails();

    this.genders = Array<Gender>();
    this.genders.push(new Gender("Male", 'male'));
    this.genders.push(new Gender("Female", 'female'));

    this.form = new FormGroup({
      policyNumber: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      age: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
      gender: new FormControl('', [Validators.required])
    });
  }

  getPolicyDetails(){
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
    (error) =>{
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

  public redirectToPolicyList() {
    this.router.navigate(['/policy/list']);
  }

}
