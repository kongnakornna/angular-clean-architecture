import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-node-canvas',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './node-canvas.component.html',
  styleUrls: ['./node-canvas.component.scss'],
})
export class NodeCanvasComponent {
  @Input() nodes: any[] = [];
  @Input() edges: any[] = [];
  @Output() nodeSelect = new EventEmitter<any>();

  onNodeClick(node: any): void {
    this.nodeSelect.emit(node);
  }

  getEdgePath(edge: any): { x1: number; y1: number; x2: number; y2: number } | null {
    const source = this.nodes.find((n) => n.id === edge.source);
    const target = this.nodes.find((n) => n.id === edge.target);
    if (!source || !target) {
      return null;
    }
    return {
      x1: source.x + 60,
      y1: source.y + 20,
      x2: target.x,
      y2: target.y + 20,
    };
  }
}
