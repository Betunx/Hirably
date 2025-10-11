// ====================================
// STATS BAR COMPONENT - TypeScript
// stats-bar.component.ts
// ====================================

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Stat } from '../../models/people.model';

@Component({
  selector: 'app-stats-bar',
  templateUrl: './stats-bar.component.html',
  styleUrls: ['./stats-bar.component.css']
})
export class StatsBarComponent implements OnInit {
  
  stats: Stat[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.stats = this.dataService.getStats();
  }
}
