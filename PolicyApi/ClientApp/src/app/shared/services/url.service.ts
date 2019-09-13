import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class UrlService {

  public urlAddress: string = environment.urlAddress;

  constructor() { }

}
