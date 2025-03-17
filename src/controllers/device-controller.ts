import { Request, Response } from 'express';
import { DeviceService } from '../services/device-service';
import { DeviceState } from '../interfaces/device-state';
import { errorHandler } from '../utils/error-handler';

export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  async createDevice(req: Request, res: Response): Promise<void> {
    try {
      const { name, brand } = req.body;
      const device = await this.deviceService.createDevice(name, brand);
      res.status(201).json(device);
    } catch (error: any) {
      errorHandler(res, error);
    }
  }

  async updateDevice(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const device = await this.deviceService.updateDevice(id, req.body);
      if (device) {
        res.json(device);
      } else {
        res.status(404).send();
      }
    } catch (error: any) {
      errorHandler(res, error);
    }
  }

  async getDevice(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const device = await this.deviceService.getDevice(id);
      if (device) {
        res.json(device);
      } else {
        res.status(404).send();
      }
    } catch (error: any) {
      errorHandler(res, error);
    }
  }

  async getAllDevices(req: Request, res: Response): Promise<void> {
    try {
      const devices = await this.deviceService.getAllDevices();
      res.json(devices);
    } catch (error: any) {
      errorHandler(res, error);
    }
  }

  async getDevicesByBrand(req: Request, res: Response): Promise<void> {
    try {
      const { brand } = req.params;
      const devices = await this.deviceService.getDevicesByBrand(brand);
      res.json(devices);
    } catch (error: any) {
      errorHandler(res, error);
    }
  }

  async getDevicesByState(req: Request, res: Response): Promise<void> {
    try {
      const { state } = req.params;
      const devices = await this.deviceService.getDevicesByState(state as DeviceState);
      res.json(devices);
    } catch (error: any) {
      errorHandler(res, error);
    }
  }

  async deleteDevice(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.deviceService.deleteDevice(id);
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (error: any) {
      errorHandler(res, error);
    }
  }
}