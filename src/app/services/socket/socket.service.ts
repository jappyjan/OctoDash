import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Temperatures } from '../../model';

@Injectable()
export abstract class SocketService {
  abstract connect(): Promise<void>;

  abstract getTemperatureSubscribable(): Observable<Temperatures>;

  abstract getPrinterStatusSubscribable(): Observable<string>;
}