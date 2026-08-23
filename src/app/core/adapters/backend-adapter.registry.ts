import { Injectable, inject } from '@angular/core';
import { BackendAdapter } from './backend-adapter.interface';
import { GoBackend5000Adapter } from './go-backend-5000.adapter';
import { NodeBackend3003Adapter } from './node-backend-3003.adapter';
import { PythonBackend8000Adapter } from './python-backend-8000.adapter';

@Injectable({ providedIn: 'root' })
export class BackendAdapterRegistry {
  private goBackend5000 = inject(GoBackend5000Adapter);
  private nodeBackend3003 = inject(NodeBackend3003Adapter);
  private pythonBackend8000 = inject(PythonBackend8000Adapter);

  private adaptersByPort = new Map<string, BackendAdapter>([
    ['5000', this.goBackend5000],
    ['3003', this.nodeBackend3003],
    ['8000', this.pythonBackend8000],
  ]);

  getAdapterForUrl(url: string): BackendAdapter | undefined {
    try {
      const parsed = new URL(url);
      return this.adaptersByPort.get(parsed.port);
    } catch {
      return undefined;
    }
  }

  getAdapterForPort(port: string): BackendAdapter | undefined {
    return this.adaptersByPort.get(port);
  }

  getAllAdapters(): BackendAdapter[] {
    return [this.goBackend5000, this.nodeBackend3003, this.pythonBackend8000];
  }
}
