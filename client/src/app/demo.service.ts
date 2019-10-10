import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Demo } from './demo.model';
import { Subject } from 'rxjs';

// a servicek felelősek azért, hogy lekérjük az adatokat a backendtől (és küldjünk)
@Injectable({providedIn: 'root'})
export class DemoService{

  private demos: Demo[] = []; // tömb az adatnak
  private demoListener = new Subject<Demo[]>(); // ezekre tudnak majd feliratkozni a különböző komponensekből
  constructor(private httpClient: HttpClient) {}

  getDemo() {
    // httpclienttel tudunk get (és egy kéréseket) intézni
    // <{}> -> itt határozzuk meg hogy milyen formátumjön az adat a másik oldalról, ha nem egyezik meg a név a backenddel megadottal,
    // akkor undefined lesz, de ha kilogolod a data-t, meg tudod nézni, hogy egyáltalán érkezik-e valami
    this.httpClient.get<{demoData: Demo[]}>('http://localhost:3000/api/demo')
      .subscribe(data => {
        this.demos = data.demoData; // adatok lementése a saját változóba
        this.demoListener.next([...this.demos]); // adatok küldése a feliratkozottaknak
      });
  }

  getDemoListener() {
    return this.demoListener.asObservable(); // ezzel érik majd a demoListener-t (asObservable() kell ahhoz hogy feliratkozni lehessen)
  }

}
