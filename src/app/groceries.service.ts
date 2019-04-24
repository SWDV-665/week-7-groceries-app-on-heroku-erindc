import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesService {

  items: any = [];

  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;

  baseUrl = 'https://groceries-server-app.herokuapp.com'

  constructor(private http: HttpClient) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }

  public getItems(): Observable<object[]> {
    return this.http.get<object[]>(this.baseUrl + '/api/groceries');
  }

  removeItem(i: number) {
    return this.http.delete<object[]>(this.baseUrl + `/api/groceries/${i}`);
  }

  addItem(item: {name: string, quantity: number}) {
    this.http.post<object[]>(this.baseUrl + `/api/groceries`, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  editItem(item: {name: string, quantity: number}, id: string) {
    this.http.put<object[]>(this.baseUrl + `/api/groceries/${id}`, {name: item.name, quantity: item.quantity}).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }
}
