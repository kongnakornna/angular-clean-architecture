import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';
import { CommandCenterState } from '../../../domain/entities/command-center.entity';
import { GetTasksUseCase } from '../../../domain/use-cases/get-tasks.usecase';

@Component({
  selector: 'app-command-center',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ProgressBarComponent],
  templateUrl: './command-center.component.html',
  styleUrls: ['./command-center.component.scss'],
})
export class CommandCenterComponent implements OnInit, OnDestroy {
  private commandCenterStateSubject = new BehaviorSubject<CommandCenterState | null>(null);
  commandCenterState$ = this.commandCenterStateSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(private getTasks: GetTasksUseCase) {}

  ngOnInit(): void {
    this.loadCommandCenter();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  statusBadge(status: string): string {
    switch (status) {
      case 'running': return 'bg-blue';
      case 'completed': return 'bg-green';
      case 'failed': return 'bg-red';
      case 'queued': return 'bg-yellow';
      case 'paused': return 'bg-secondary';
      default: return 'bg-secondary';
    }
  }

  private loadCommandCenter(): void {
    this.loadingSubject.next(true);

    this.getTasks.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (state) => {
          this.commandCenterStateSubject.next(state);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.commandCenterStateSubject.next(null);
          this.loadingSubject.next(false);
        },
      });
  }
}
