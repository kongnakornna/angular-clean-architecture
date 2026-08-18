export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, {
    type: string;
    description: string;
    required?: boolean;
  }>;
}

export const BUILT_IN_TOOLS: ToolDefinition[] = [
  {
    name: 'search_records',
    description: 'Search for jobs, customers, products, or other records in the system',
    parameters: {
      type: { type: 'string', description: 'Record type: job, customer, product', required: true },
      query: { type: 'string', description: 'Search query', required: true },
      limit: { type: 'number', description: 'Max results (default 10)' }
    }
  },
  {
    name: 'create_job',
    description: 'Create a new job in the system',
    parameters: {
      title: { type: 'string', description: 'Job title', required: true },
      customerId: { type: 'string', description: 'Customer ID' },
      description: { type: 'string', description: 'Job description' },
      priority: { type: 'string', description: 'Priority: low, medium, high, urgent' }
    }
  },
  {
    name: 'send_email',
    description: 'Send an email to a customer or team member',
    parameters: {
      to: { type: 'string', description: 'Recipient email', required: true },
      subject: { type: 'string', description: 'Email subject', required: true },
      body: { type: 'string', description: 'Email body', required: true }
    }
  },
  {
    name: 'generate_report',
    description: 'Generate a report (sales, jobs, performance, etc.)',
    parameters: {
      type: { type: 'string', description: 'Report type: sales, jobs, performance', required: true },
      dateFrom: { type: 'string', description: 'Start date (YYYY-MM-DD)' },
      dateTo: { type: 'string', description: 'End date (YYYY-MM-DD)' }
    }
  },
  {
    name: 'create_quotation',
    description: 'Create a new quotation for a customer',
    parameters: {
      customerId: { type: 'string', description: 'Customer ID', required: true },
      items: { type: 'array', description: 'Quotation items', required: true },
      notes: { type: 'string', description: 'Additional notes' }
    }
  },
  {
    name: 'create_purchase_order',
    description: 'Create a purchase order',
    parameters: {
      supplierId: { type: 'string', description: 'Supplier ID', required: true },
      items: { type: 'array', description: 'PO items', required: true },
      notes: { type: 'string', description: 'Additional notes' }
    }
  },
  {
    name: 'get_dashboard_data',
    description: 'Get current dashboard summary data (KPIs, revenue, orders)',
    parameters: {}
  }
];
