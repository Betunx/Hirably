import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { DataService } from '@services/data.service';
import { DepartmentDetail } from '@models';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentPageComponent implements OnInit, OnDestroy {

  dept!: DepartmentDetail;
  openFaqIndex: number | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = params.get('departmentId') ?? '';
        const dept = this.dataService.getDepartment(id);
        if (!dept) { this.router.navigate(['/']); return; }
        this.dept = dept;
        this.openFaqIndex = null;
        window.scrollTo(0, 0);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFaq(i: number): void {
    this.openFaqIndex = this.openFaqIndex === i ? null : i;
    this.cdr.markForCheck();
  }

  getSavings(us: number, mx: number): number {
    return Math.round(((us - mx) / us) * 100);
  }

  getBarPct(salary: number): number {
    const max = Math.max(...this.dept.salaryComparisons.map(s => s.usSalary));
    return Math.round((salary / max) * 100);
  }

  formatSalary(n: number): string {
    return '$' + (n / 1000).toFixed(0) + 'k';
  }

  goHire(): void {
    this.router.navigate(['/contact', 'start-hiring']);
  }

  goCall(): void {
    this.router.navigate(['/contact', 'book-a-call']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
