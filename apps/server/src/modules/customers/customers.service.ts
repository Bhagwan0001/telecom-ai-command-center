import { CustomersRepository } from './customers.repository';
import { Customer } from './customers.types';

export class CustomersService {
  constructor(private customersRepository: CustomersRepository) {}

  async listCustomers(): Promise<Customer[]> {
    return this.customersRepository.getCustomers();
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    return this.customersRepository.getCustomerById(id);
  }

  async createCustomer(data: Omit<Customer, 'id' | 'status'>): Promise<Customer> {
    return this.customersRepository.create(data);
  }
}
