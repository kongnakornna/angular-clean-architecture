import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { NodeCanvasComponent } from '../../components/node-canvas/node-canvas.component';
import { Workflow } from '../../../domain/entities/workflow.entity';
import { GetWorkflowsUseCase } from '../../../domain/use-cases/get-workflows.usecase';

@Component({
  selector: 'app-workflow-ai',
  standalone: true,
  imports: [CommonModule, TranslatePipe, NodeCanvasComponent],
  templateUrl: './workflow-ai.component.html',
  styleUrls: ['./workflow-ai.component.scss'],
})
export class WorkflowAIComponent implements OnInit, OnDestroy {
  private workflowsSubject = new BehaviorSubject<Workflow[]>([]);
  workflows$ = this.workflowsSubject.asObservable();

  private selectedWorkflowSubject = new BehaviorSubject<Workflow | null>(null);
  selectedWorkflow$ = this.selectedWorkflowSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(private getWorkflows: GetWorkflowsUseCase) {}

  ngOnInit(): void {
    this.loadWorkflows();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectWorkflow(workflow: Workflow): void {
    this.selectedWorkflowSubject.next(workflow);
  }

  onNodeSelect(node: any): void {
  }

  private loadWorkflows(): void {
    this.loadingSubject.next(true);

    this.getWorkflows.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (workflows) => {
          this.workflowsSubject.next(workflows);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.workflowsSubject.next([]);
          this.loadingSubject.next(false);
        },
      });
  }
}
