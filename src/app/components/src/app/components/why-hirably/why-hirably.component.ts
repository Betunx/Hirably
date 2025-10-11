// ====================================
// WHY HIRABLY COMPONENT - TypeScript
// why-hirably.component.ts
// ====================================

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Benefit } from '../../models/people.model';

@Component({
  selector: 'app-why-hirably',
  templateUrl: './why-hirably.component.html',
  styleUrls: ['./why-hirably.component.css']
})
export class WhyHirablyComponent implements OnInit {
  
  advantages: Benefit[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.advantages = this.dataService.getAdvantages();
  }
}
