import { PolicyHolderEntity } from './policy-holder-entity.model';

export interface PolicyEntity {
  policyNumber: number;
  policyHolder: PolicyHolderEntity;
}
