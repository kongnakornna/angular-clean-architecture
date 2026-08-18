import { Component, OnInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil, combineLatest, interval } from 'rxjs';
import {
  Flow, FlowNode, FlowConnection, NodeType, NODE_TEMPLATES,
  SensorDefinition, FlowDeployStatus,
} from '../../../domain/entities/flow.entity';
import { GetFlowsUseCase } from '../../../domain/use-cases/get-flows.use-case';
import { SaveFlowUseCase } from '../../../domain/use-cases/save-flow.use-case';
import { DeleteFlowUseCase } from '../../../domain/use-cases/delete-flow.use-case';
import { GetAvailableSensorsUseCase } from '../../../domain/use-cases/get-available-sensors.use-case';
import { DeployFlowUseCase } from '../../../domain/use-cases/deploy-flow.use-case';

interface DragState {
  type: 'new-node' | 'move-node';
  nodeType?: NodeType;
  nodeId?: string;
  offsetX: number;
  offsetY: number;
}

interface ConnectState {
  sourceNodeId: string;
  sourcePortId: string;
  mouseX: number;
  mouseY: number;
}

interface CanvasTransform {
  x: number;
  y: number;
  scale: number;
}

interface ContextMenu {
  x: number;
  y: number;
  node: FlowNode;
}

interface Particle {
  id: number;
  connId: string;
  progress: number;
  value: number;
  speed: number;
}

@Component({
  selector: 'app-mqtt-flow-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mqtt-flow-editor.component.html',
  styleUrls: ['./mqtt-flow-editor.component.scss'],
})
export class MqttFlowEditorComponent implements OnInit, OnDestroy {
  @ViewChild('canvasContainer') canvasContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private destroy$ = new Subject<void>();
  private animFrame$: Subject<void> = new Subject<void>();

  flows$ = new BehaviorSubject<Flow[]>([]);
  selectedFlow$ = new BehaviorSubject<Flow | null>(null);
  selectedNode$ = new BehaviorSubject<FlowNode | null>(null);
  sensors$ = new BehaviorSubject<SensorDefinition[]>([]);
  loading$ = new BehaviorSubject<boolean>(true);
  saving$ = new BehaviorSubject<boolean>(false);

  canvasTransform: CanvasTransform = { x: 0, y: 0, scale: 1 };
  dragState: DragState | null = null;
  connectState: ConnectState | null = null;
  isPanning = false;
  panStart = { x: 0, y: 0 };

  nodeTypes: NodeType[] = ['sensor', 'transform', 'filter', 'mqtt-output', 'junction'];
  nodeTemplates = NODE_TEMPLATES;

  showFlowList = true;
  showConfig = false;
  newFlowName = '';
  newFlowDesc = '';

  contextMenu: ContextMenu | null = null;
  particles: Particle[] = [];
  isSimulating = false;
  private particleIdSeq = 0;
  private sensorValues: Record<string, number> = {};

  private nextNodeId = 100;
  private nextConnId = 100;

  constructor(
    private getFlows: GetFlowsUseCase,
    private saveFlow: SaveFlowUseCase,
    private deleteFlow: DeleteFlowUseCase,
    private getSensors: GetAvailableSensorsUseCase,
    private deployFlow: DeployFlowUseCase,
    private zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.initSimulation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.animFrame$.next();
    this.animFrame$.complete();
  }

  private initSimulation(): void {
    this.zone.runOutsideAngular(() => {
      interval(30).pipe(takeUntil(this.destroy$)).subscribe(() => {
        if (this.isSimulating) {
          this.updateParticles();
        }
      });
    });
  }

  private updateParticles(): void {
    const flow = this.selectedFlow$.value;
    if (!flow || !this.isSimulating) return;

    const newParticles: Particle[] = [];
    for (const p of this.particles) {
      const updated = { ...p, progress: p.progress + p.speed };
      if (updated.progress < 1) {
        newParticles.push(updated);
      }
    }

    if (this.particles.length < flow.connections.length * 3) {
      const connIdx = this.particles.length % Math.max(flow.connections.length, 1);
      if (flow.connections[connIdx]) {
        const conn = flow.connections[connIdx];
        const sourceNode = flow.nodes.find(n => n.id === conn.sourceNodeId);
        if (sourceNode) {
          const value = this.generateSensorValue(sourceNode);
          newParticles.push({
            id: this.particleIdSeq++,
            connId: conn.id,
            progress: 0,
            value,
            speed: 0.015 + Math.random() * 0.01,
          });
        }
      }
    }

    this.particles = newParticles;
  }

  private generateSensorValue(node: FlowNode): number {
    if (!this.sensorValues[node.id]) {
      this.sensorValues[node.id] = 25 + Math.random() * 10;
    }
    const base = this.sensorValues[node.id];
    this.sensorValues[node.id] = base + (Math.random() - 0.5) * 2;
    return Math.round(this.sensorValues[node.id] * 10) / 10;
  }

  private loadData(): void {
    this.loading$.next(true);
    combineLatest([
      this.getFlows.execute(),
      this.getSensors.execute(),
    ]).pipe(takeUntil(this.destroy$)).subscribe({
      next: ([flows, sensors]) => {
        this.flows$.next(flows);
        this.sensors$.next(sensors);
        this.loading$.next(false);
        if (flows.length > 0 && !this.selectedFlow$.value) {
          this.selectFlow(flows[0]);
        }
      },
      error: () => this.loading$.next(false),
    });
  }

  selectFlow(flow: Flow): void {
    this.selectedFlow$.next(flow);
    this.selectedNode$.next(null);
    this.showConfig = false;
    this.canvasTransform = { x: 0, y: 0, scale: 1 };
    this.contextMenu = null;
    this.particles = [];
    this.stopSimulation();
  }

  createFlow(): void {
    const name = this.newFlowName.trim() || 'New Flow';
    const flow: Flow = {
      id: `flow-${Date.now()}`,
      name,
      description: this.newFlowDesc.trim(),
      nodes: [],
      connections: [],
      enabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.saveFlow.execute(flow).pipe(takeUntil(this.destroy$)).subscribe({
      next: (saved) => {
        this.flows$.next([...this.flows$.value, saved]);
        this.selectFlow(saved);
        this.newFlowName = '';
        this.newFlowDesc = '';
      },
    });
  }

  deleteFlowConfirm(flowId: string): void {
    this.deleteFlow.execute(flowId).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        const updated = this.flows$.value.filter(f => f.id !== flowId);
        this.flows$.next(updated);
        if (this.selectedFlow$.value?.id === flowId) {
          this.selectFlow(updated[0] || null as any);
        }
      },
    });
  }

  deployFlowAction(flow: Flow): void {
    this.deployFlow.execute(flow.id).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        const updated = this.flows$.value.map(f =>
          f.id === flow.id ? { ...f, enabled: true } : f
        );
        this.flows$.next(updated);
        this.selectedFlow$.next({ ...flow, enabled: true });
        this.startSimulation();
      },
    });
  }

  stopFlowAction(flow: Flow): void {
    const updated = this.flows$.value.map(f =>
      f.id === flow.id ? { ...f, enabled: false } : f
    );
    this.flows$.next(updated);
    this.selectedFlow$.next({ ...flow, enabled: false });
    this.stopSimulation();
  }

  saveCurrentFlow(): void {
    const flow = this.selectedFlow$.value;
    if (!flow) return;
    this.saving$.next(true);
    this.saveFlow.execute(flow).pipe(takeUntil(this.destroy$)).subscribe({
      next: (saved) => {
        this.flows$.next(this.flows$.value.map(f => f.id === saved.id ? saved : f));
        this.selectedFlow$.next(saved);
        this.saving$.next(false);
      },
      error: () => this.saving$.next(false),
    });
  }

  addNodeToCanvas(type: NodeType, event: MouseEvent): void {
    const flow = this.selectedFlow$.value;
    if (!flow) return;

    const pos = this.clientToCanvas(event.clientX, event.clientY);
    const template = NODE_TEMPLATES[type];
    const newNode: FlowNode = {
      id: `node-${this.nextNodeId++}`,
      type,
      label: template.label,
      x: Math.round(pos.x / 20) * 20,
      y: Math.round(pos.y / 20) * 20,
      config: this.getDefaultConfig(type),
      ports: template.defaultPorts.map(p => ({ ...p })),
    };

    this.selectedFlow$.next({ ...flow, nodes: [...flow.nodes, newNode], updatedAt: new Date() });
    this.selectNode(newNode);
  }

  private getDefaultConfig(type: NodeType): Record<string, any> {
    switch (type) {
      case 'sensor': return { sensorId: '', sampleInterval: 5000 };
      case 'transform': return { expression: 'value' };
      case 'filter': return { minThreshold: 0, maxThreshold: 100 };
      case 'mqtt-output': return { topic: 'factory/dashboard/', qos: 0 };
      case 'junction': return {};
      default: return {};
    }
  }

  onNodeMouseDown(node: FlowNode, event: MouseEvent): void {
    event.stopPropagation();
    this.contextMenu = null;
    this.selectNode(node);

    const pos = this.clientToCanvas(event.clientX, event.clientY);
    this.dragState = {
      type: 'move-node',
      nodeId: node.id,
      offsetX: pos.x - node.x,
      offsetY: pos.y - node.y,
    };
  }

  onNodeContextMenu(node: FlowNode, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.contextMenu = { x: event.clientX, y: event.clientY, node };
  }

  onCanvasMouseMove(event: MouseEvent): void {
    if (this.dragState?.type === 'move-node' && this.dragState.nodeId) {
      const pos = this.clientToCanvas(event.clientX, event.clientY);
      const x = Math.round((pos.x - this.dragState.offsetX) / 20) * 20;
      const y = Math.round((pos.y - this.dragState.offsetY) / 20) * 20;

      const flow = this.selectedFlow$.value;
      if (!flow) return;
      this.selectedFlow$.next({
        ...flow,
        nodes: flow.nodes.map(n => n.id === this.dragState!.nodeId ? { ...n, x, y } : n),
      });
    }

    if (this.connectState) {
      const rect = this.canvasContainer?.nativeElement.getBoundingClientRect();
      this.connectState = {
        ...this.connectState,
        mouseX: event.clientX - (rect?.left || 0),
        mouseY: event.clientY - (rect?.top || 0),
      };
    }

    if (this.isPanning) {
      this.canvasTransform = {
        ...this.canvasTransform,
        x: event.clientX - this.panStart.x,
        y: event.clientY - this.panStart.y,
      };
    }
  }

  onCanvasMouseUp(): void {
    this.dragState = null;
    this.connectState = null;
    this.isPanning = false;
  }

  onCanvasMouseDown(event: MouseEvent): void {
    this.contextMenu = null;
    if (event.target === event.currentTarget || (event.target as HTMLElement).classList.contains('canvas-bg')) {
      this.selectedNode$.next(null);
      this.showConfig = false;
      this.isPanning = true;
      this.panStart = { x: event.clientX - this.canvasTransform.x, y: event.clientY - this.canvasTransform.y };
    }
  }

  onCanvasWheel(event: WheelEvent): void {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    this.zoomBy(delta);
  }

  zoomBy(delta: number): void {
    const newScale = Math.max(0.3, Math.min(2, this.canvasTransform.scale + delta));
    this.canvasTransform = { ...this.canvasTransform, scale: newScale };
  }

  zoomFit(): void {
    this.canvasTransform = { x: 0, y: 0, scale: 1 };
  }

  onPortMouseDown(node: FlowNode, portId: string, event: MouseEvent): void {
    event.stopPropagation();
    this.connectState = {
      sourceNodeId: node.id,
      sourcePortId: portId,
      mouseX: event.clientX,
      mouseY: event.clientY,
    };
  }

  onPortMouseUp(node: FlowNode, portId: string, event: MouseEvent): void {
    event.stopPropagation();
    if (!this.connectState) return;
    if (this.connectState.sourceNodeId === node.id) return;

    const flow = this.selectedFlow$.value;
    if (!flow) return;

    const sourceNode = flow.nodes.find(n => n.id === this.connectState!.sourceNodeId);
    const targetNode = node;
    if (sourceNode && !this.canConnect(sourceNode, this.connectState.sourcePortId, targetNode, portId)) {
      this.connectState = null;
      return;
    }

    const exists = flow.connections.some(c =>
      c.targetNodeId === node.id && c.targetPortId === portId
    );
    if (exists) {
      this.connectState = null;
      return;
    }

    const newConn: FlowConnection = {
      id: `conn-${this.nextConnId++}`,
      sourceNodeId: this.connectState.sourceNodeId,
      sourcePortId: this.connectState.sourcePortId,
      targetNodeId: node.id,
      targetPortId: portId,
    };

    this.selectedFlow$.next({
      ...flow,
      connections: [...flow.connections, newConn],
      updatedAt: new Date(),
    });
    this.connectState = null;
  }

  private canConnect(sourceNode: FlowNode, sourcePortId: string, targetNode: FlowNode, targetPortId: string): boolean {
    const sourcePort = sourceNode.ports.find(p => p.id === sourcePortId);
    const targetPort = targetNode.ports.find(p => p.id === targetPortId);
    if (!sourcePort || !targetPort) return false;
    if (sourcePort.direction !== 'output' || targetPort.direction !== 'input') return false;
    if (sourcePort.dataType !== 'json' && targetPort.dataType !== 'json' && sourcePort.dataType !== targetPort.dataType) return false;
    return true;
  }

  removeConnection(connId: string): void {
    const flow = this.selectedFlow$.value;
    if (!flow) return;
    this.selectedFlow$.next({
      ...flow,
      connections: flow.connections.filter(c => c.id !== connId),
      updatedAt: new Date(),
    });
  }

  removeNode(nodeId: string): void {
    const flow = this.selectedFlow$.value;
    if (!flow) return;
    this.selectedFlow$.next({
      ...flow,
      nodes: flow.nodes.filter(n => n.id !== nodeId),
      connections: flow.connections.filter(c => c.sourceNodeId !== nodeId && c.targetNodeId !== nodeId),
      updatedAt: new Date(),
    });
    this.selectedNode$.next(null);
    this.showConfig = false;
    this.contextMenu = null;
  }

  duplicateNode(node: FlowNode): void {
    const flow = this.selectedFlow$.value;
    if (!flow) return;

    const newNode: FlowNode = {
      id: `node-${this.nextNodeId++}`,
      type: node.type,
      label: node.label + ' (copy)',
      x: node.x + 40,
      y: node.y + 40,
      config: { ...node.config },
      ports: node.ports.map(p => ({ ...p })),
    };

    this.selectedFlow$.next({ ...flow, nodes: [...flow.nodes, newNode], updatedAt: new Date() });
    this.selectNode(newNode);
    this.contextMenu = null;
  }

  selectNode(node: FlowNode): void {
    this.selectedNode$.next(node);
    this.showConfig = true;
  }

  updateNodeConfig(key: string, value: any): void {
    const node = this.selectedNode$.value;
    const flow = this.selectedFlow$.value;
    if (!node || !flow) return;

    const updatedNode = { ...node, config: { ...node.config, [key]: value } };
    this.selectedFlow$.next({
      ...flow,
      nodes: flow.nodes.map(n => n.id === node.id ? updatedNode : n),
      updatedAt: new Date(),
    });
    this.selectedNode$.next(updatedNode);
  }

  updateNodeLabel(label: string): void {
    const node = this.selectedNode$.value;
    const flow = this.selectedFlow$.value;
    if (!node || !flow) return;

    const updatedNode = { ...node, label };
    this.selectedFlow$.next({
      ...flow,
      nodes: flow.nodes.map(n => n.id === node.id ? updatedNode : n),
      updatedAt: new Date(),
    });
    this.selectedNode$.next(updatedNode);
  }

  exportFlow(): void {
    const flow = this.selectedFlow$.value;
    if (!flow) return;

    const json = JSON.stringify(flow, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${flow.name.replace(/\s+/g, '_').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importFlow(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const flow = JSON.parse(reader.result as string) as Flow;
        flow.id = `flow-${Date.now()}`;
        flow.createdAt = new Date();
        flow.updatedAt = new Date();
        flow.enabled = false;

        this.saveFlow.execute(flow).pipe(takeUntil(this.destroy$)).subscribe({
          next: (saved) => {
            this.flows$.next([...this.flows$.value, saved]);
            this.selectFlow(saved);
          },
        });
      } catch {
        alert('Invalid flow JSON file');
      }
    };
    reader.readAsText(file);
    input.value = '';
  }

  triggerImport(): void {
    this.fileInput?.nativeElement.click();
  }

  private startSimulation(): void {
    this.isSimulating = true;
    this.particles = [];
    this.sensorValues = {};
  }

  private stopSimulation(): void {
    this.isSimulating = false;
    this.particles = [];
  }

  getNodePortPosition(node: FlowNode, portId: string): { x: number; y: number } {
    const template = NODE_TEMPLATES[node.type];
    const inputPorts = template.defaultPorts.filter(p => p.direction === 'input');
    const outputPorts = template.defaultPorts.filter(p => p.direction === 'output');
    const isOutput = template.defaultPorts.find(p => p.id === portId)?.direction === 'output';

    if (isOutput) {
      const idx = outputPorts.findIndex(p => p.id === portId);
      const spacing = 40 / (outputPorts.length + 1);
      return { x: node.x + 180, y: node.y + 30 + spacing * (idx + 1) };
    } else {
      const idx = inputPorts.findIndex(p => p.id === portId);
      const spacing = 40 / (inputPorts.length + 1);
      return { x: node.x, y: node.y + 30 + spacing * (idx + 1) };
    }
  }

  getConnectionPath(conn: FlowConnection): string {
    const flow = this.selectedFlow$.value;
    if (!flow) return '';
    const sourceNode = flow.nodes.find(n => n.id === conn.sourceNodeId);
    const targetNode = flow.nodes.find(n => n.id === conn.targetNodeId);
    if (!sourceNode || !targetNode) return '';

    const s = this.getNodePortPosition(sourceNode, conn.sourcePortId);
    const e = this.getNodePortPosition(targetNode, conn.targetPortId);
    const dx = Math.abs(e.x - s.x) * 0.5;
    return `M ${s.x} ${s.y} C ${s.x + dx} ${s.y}, ${e.x - dx} ${e.y}, ${e.x} ${e.y}`;
  }

  getParticlePosition(particle: Particle): { x: number; y: number } | null {
    const flow = this.selectedFlow$.value;
    if (!flow) return null;
    const conn = flow.connections.find(c => c.id === particle.connId);
    if (!conn) return null;

    const sourceNode = flow.nodes.find(n => n.id === conn.sourceNodeId);
    const targetNode = flow.nodes.find(n => n.id === conn.targetNodeId);
    if (!sourceNode || !targetNode) return null;

    const s = this.getNodePortPosition(sourceNode, conn.sourcePortId);
    const e = this.getNodePortPosition(targetNode, conn.targetPortId);
    const t = particle.progress;
    const dx = Math.abs(e.x - s.x) * 0.5;

    const cx1 = s.x + dx, cy1 = s.y;
    const cx2 = e.x - dx, cy2 = e.y;
    const mt = 1 - t;
    const x = mt * mt * mt * s.x + 3 * mt * mt * t * cx1 + 3 * mt * t * t * cx2 + t * t * t * e.x;
    const y = mt * mt * mt * s.y + 3 * mt * mt * t * cy1 + 3 * mt * t * t * cy2 + t * t * t * e.y;
    return { x, y };
  }

  getTempConnectionPath(): string {
    if (!this.connectState) return '';
    const flow = this.selectedFlow$.value;
    if (!flow) return '';

    const sourceNode = flow.nodes.find(n => n.id === this.connectState!.sourceNodeId);
    if (!sourceNode) return '';

    const s = this.getNodePortPosition(sourceNode, this.connectState.sourcePortId);
    const ex = this.connectState.mouseX;
    const ey = this.connectState.mouseY;
    const dx = Math.abs(ex - s.x) * 0.5;
    return `M ${s.x} ${s.y} C ${s.x + dx} ${s.y}, ${ex - dx} ${ey}, ${ex} ${ey}`;
  }

  getPortHighlightClass(node: FlowNode, portId: string): string {
    if (!this.connectState) return '';
    const port = node.ports.find(p => p.id === portId);
    if (!port) return '';
    if (port.direction === 'input' && node.id !== this.connectState.sourceNodeId) {
      return 'port-highlight';
    }
    return '';
  }

  private clientToCanvas(clientX: number, clientY: number): { x: number; y: number } {
    const rect = this.canvasContainer?.nativeElement.getBoundingClientRect();
    return {
      x: (clientX - (rect?.left || 0) - this.canvasTransform.x) / this.canvasTransform.scale,
      y: (clientY - (rect?.top || 0) - this.canvasTransform.y) / this.canvasTransform.scale,
    };
  }

  trackByNodeId(_i: number, node: FlowNode): string { return node.id; }
  trackByConnId(_i: number, conn: FlowConnection): string { return conn.id; }
  trackByParticleId(_i: number, p: Particle): number { return p.id; }
}
