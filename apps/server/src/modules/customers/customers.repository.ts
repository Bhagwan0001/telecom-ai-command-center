import { Customer } from './customers.types';

export class CustomersRepository {
  private customers: Customer[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', phone: '+123456789', plan: '5G Unlimited Premium', status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+987654321', plan: 'Broadband Plus', status: 'active' },
  ];

  async getCustomers(): Promise<Customer[]> {
    return this.customers;
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    return this.customers.find(cust => cust.id === id) || null;
  }

  async create(data: Omit<Customer, 'id' | 'status'>): Promise<Customer> {
    const newCust: Customer = {
      ...data,
      id: String(this.customers.length + 1),
      status: 'active',
    };
    this.customers.push(newCust);
    return newCust;
  }
}
