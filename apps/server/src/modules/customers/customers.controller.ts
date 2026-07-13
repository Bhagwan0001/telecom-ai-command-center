import { Request, Response, NextFunction } from 'express';
import { CustomersService } from './customers.service';
import { formatSuccessResponse } from '../../utils/response';

export class CustomersController {
  constructor(private customersService: CustomersService) {}

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const customers = await this.customersService.listCustomers();
      res.status(200).json(formatSuccessResponse(customers, 'Customers list retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const customer = await this.customersService.getCustomerById(req.params.id);
      res.status(200).json(formatSuccessResponse(customer, 'Customer details retrieved successfully'));
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const customer = await this.customersService.createCustomer(req.body);
      res.status(201).json(formatSuccessResponse(customer, 'Customer created successfully'));
    } catch (error) {
      next(error);
    }
  };
}
