import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EMPTY, Observable, catchError, delay, of } from 'rxjs';

export const metaDataResolver: ResolveFn<any> = (route, state) => {
  console.log('fire resolve!!')
  return getAllProducts().pipe(
    catchError(()=>{
      console.log('error');
      return EMPTY
    })
  );
};


function getAllProducts():Observable<any>{
  return inject(HttpClient).get('https://fakestoreapi.com/products');
  // return of({name:'eslam',age:'24'}).pipe(delay(5000))
}
