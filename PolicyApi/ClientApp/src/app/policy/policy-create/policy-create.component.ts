import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from '../../shared/interfaces/gender.model';
import { PolicyEntity } from '../../shared/interfaces/policy-entity.model';
import { ErrorHandlerService } from '../../shared/services/errorhandler.service';
import { RepositoryService } from '../../shared/services/repository.service';


@Component({
  selector: 'app-policy-create',
  templateUrl: './policy-create.component.html',
  styleUrls: ['./policy-create.component.css']
})
export class PolicyCreateComponent implements OnInit {

  errorMessage: string = '';
  form: FormGroup;
  genders = Array<Gender>();
  selectedGender: string;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {

    this.form = new FormGroup({
      policyNumber: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      age: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
      gender: new FormControl('') 
    }, this.validateForm.bind(this));

    this.genders = Array<Gender>();
    this.genders.push(new Gender("Male", 'male'));
    this.genders.push(new Gender("Female", 'female'));
  }

  validateForm(control: FormGroup) {
    if (((+!!control.value.gender.trim()) ^ +!!(control.value.name)) ^ +!!(control.value.policyNumber) ^ +!!(control.value.age)) {
      return {
        invalidForm: true,
        errorMsg: 'Please provide both values or leave them empty.'
      }
    }
    return null;
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

 
  public createPolicy(policyFormValue) {
    if (this.form.valid) {
      this.executePolicyCreation(policyFormValue);
    }
  }

  selectOption(value: string) {
    this.selectedGender = value;
  }

  private executePolicyCreation(form) {
    let policy: PolicyEntity = {
      policyNumber: form.policyNumber,
      policyHolder: {
        name: form.name,
        age: form.age,
        gender: this.selectedGender
      }
    };

    let apiUrl = 'api/policy';
    this.repository.create(apiUrl, policy)
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

