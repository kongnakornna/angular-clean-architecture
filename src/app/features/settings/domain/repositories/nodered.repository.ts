import { Observable } from 'rxjs';
import { NodeRed } from '../entities/nodered.entity';

export interface INodeRedRepository {
  list(params?: { search?: string; page?: number; pageSize?: number }): Observable<{ data: NodeRed[]; total: number }>;
  getById(id: string): Observable<NodeRed>;
  create(nodered: Partial<NodeRed>): Observable<NodeRed>;
  update(id: string, nodered: Partial<NodeRed>): Observable<NodeRed>;
  testConnection(id: string): Observable<{ success: boolean; message: string }>;
}
