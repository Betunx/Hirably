// ====================================
// HOW IT WORKS TIMELINE COMPONENT - TypeScript
// how-it-works.component.ts
// ====================================

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TimelineStep } from '../../models/people.model';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {
  
  steps: TimelineStep[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.steps = this.dataService.getTimeline();
  }
}
