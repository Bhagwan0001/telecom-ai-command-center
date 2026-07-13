export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: string;
  status: 'active' | 'suspended' | 'pending';
}
