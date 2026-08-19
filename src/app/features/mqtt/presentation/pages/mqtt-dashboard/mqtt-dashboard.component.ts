import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil, combineLatest, map } from 'rxjs';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';
import { Flow, SensorDefinition, MqttBrokerConfig, FlowDeployStatus } from '../../../domain/entities/flow.entity';
import { GetFlowsUseCase } from '../../../domain/use-cases/get-flows.use-case';
import { GetAvailableSensorsUseCase } from '../../../domain/use-cases/get-available-sensors.use-case';
import { GetBrokerConfigUseCase } from '../../../domain/use-cases/get-broker-config.use-case';
import { GetDeployStatusUseCase } from '../../../domain/use-cases/get-deploy-status.use-case';

@Component({
  selector: 'app-mqtt-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  templateUrl: './mqtt-dashboard.component.html',
  styleUrls: ['./mqtt-dashboard.component.scss'],
})
export class MqttDashboardComponent implements OnInit, OnDestroy {
  private flowsSubject = new BehaviorSubject<Flow[]>([]);
  flows$ = this.flowsSubject.asObservable();

  private sensorsSubject = new BehaviorSubject<SensorDefinition[]>([]);
  sensors$ = this.sensorsSubject.asObservable();

  private brokerConfigSubject = new BehaviorSubject<MqttBrokerConfig | null>(null);
  brokerConfig$ = this.brokerConfigSubject.asObservable();

  private deployStatusesSubject = new BehaviorSubject<FlowDeployStatus[]>([]);
  deployStatuses$ = this.deployStatusesSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(true);
  loading$ = this.loadingSubject.asObservable();

  totalFlows$ = this.flows$.pipe(map((flows) => flows.length));
  activeFlows$ = this.flows$.pipe(map((flows) => flows.filter((f) => f.enabled).length));
  deployedFlows$ = this.deployStatuses$.pipe(
    map((statuses) => statuses.filter((s) => s.status === 'deployed').length)
  );
  totalSensors$ = this.sensors$.pipe(map((sensors) => sensors.length));

  private destroy$ = new Subject<void>();

  constructor(
    private getFlowsUseCase: GetFlowsUseCase,
    private getSensorsUseCase: GetAvailableSensorsUseCase,
    private getBrokerConfigUseCase: GetBrokerConfigUseCase,
    private getDeployStatusUseCase: GetDeployStatusUseCase,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  nodeCount(flow: Flow): number {
    return flow.nodes.length;
  }

  connectionCount(flow: Flow): number {
    return flow.connections.length;
  }

  flowStatus(flow: Flow): string {
    return flow.enabled ? 'mqttDashboard.enabled' : 'mqttDashboard.disabled';
  }

  flowStatusBadge(flow: Flow): string {
    return flow.enabled ? 'bg-green' : 'bg-secondary';
  }

  deployStatus(flowId: Flow): string {
    const status = this.deployStatusesSubject.value.find((s) => s.flowId === flowId.id);
    return status?.status ?? 'stopped';
  }

  deployStatusBadge(flowId: Flow): string {
    const status = this.deployStatus(flowId);
    if (status === 'deployed') return 'bg-green';
    if (status === 'error') return 'bg-red';
    return 'bg-secondary';
  }

  deleteFlow(flow: Flow): void {
    if (!confirm('Delete this flow?')) return;
  }

  private loadDashboard(): void {
    this.loadingSubject.next(true);

    this.getFlowsUseCase.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (flows) => this.flowsSubject.next(flows),
        error: () => this.flowsSubject.next([]),
      });

    this.getSensorsUseCase.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (sensors) => this.sensorsSubject.next(sensors),
        error: () => this.sensorsSubject.next([]),
      });

    this.getBrokerConfigUseCase.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (config) => this.brokerConfigSubject.next(config),
        error: () => this.brokerConfigSubject.next(null),
      });

    this.getDeployStatusUseCase.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (statuses) => {
          this.deployStatusesSubject.next(statuses);
          this.loadingSubject.next(false);
        },
        error: () => {
          this.deployStatusesSubject.next([]);
          this.loadingSubject.next(false);
        },
      });
  }
}
