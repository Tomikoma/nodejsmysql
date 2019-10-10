import { Component, OnInit, OnDestroy } from '@angular/core';
import { DemoService } from './demo.service';
import { Subscription } from 'rxjs';
import { Demo } from './demo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'client';
  private demoSub: Subscription; //Subscription a feliratkozáshoz
  demos: Demo[] = [];
  constructor(private demoService: DemoService){}// ha így belerakjuk argumentumként a constructorba egy servicet, akkor lepéldányosítja azt

  ngOnInit() {
    this.demoService.getDemo(); // getDemo meghívása, így a servicebe kerülnek az adatok
    this.demoSub = this.demoService.getDemoListener() // feliratkozás, adatok lekérése
      .subscribe(demoData => {
        this.demos = demoData;
      });
  }

  ngOnDestroy() {
    this.demoSub.unsubscribe(); // ha nem beépített service-t használsz (Beépített pl a httpclient), akkor érdemes leiratkozni róla
  }
}
