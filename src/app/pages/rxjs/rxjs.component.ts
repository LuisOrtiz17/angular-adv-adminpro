import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;
  constructor() {
    /*
    this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('Subs', valor),
      err => console.warn('Error:', err),
      () => console.info('Completado')
      
      
    );
    */

    //this.retornaIntervalo().subscribe((valor) => console.log(valor));
    this.intervalSubs = this.retornaIntervalo()
    .subscribe(console.log)
  }


  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }


  retornaIntervalo(): Observable<number> {
    //const intervalo$ =
    return interval(500).pipe(
      //take(30),
      map(valor => valor +1),
      filter( valor => (valor % 2 === 0) ? true : false)
    );

    //return intervalo$;
  }

  retornaObservable(): Observable<number> {
    let i = -1;

    const obs$ = new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        //console.log('Tick');
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          //i = 0;
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });

    return obs$;
  }
}
