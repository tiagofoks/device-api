import { Router } from 'express';
import { DeviceController } from '../controllers/device-controller';

export class DeviceRoutes {
  public router: Router;
  private deviceController: DeviceController;

  constructor(deviceController: DeviceController) {
    this.router = Router();
    this.deviceController = deviceController;
    this.routes();
  }

  private routes(): void {
    this.router.post('/', (req, res) => this.deviceController.createDevice(req, res));
    this.router.put('/:id', (req, res) => this.deviceController.updateDevice(req, res));
    this.router.get('/:id', (req, res) => this.deviceController.getDevice(req, res));
    this.router.get('/', (req, res) => this.deviceController.getAllDevices(req, res));
    this.router.get('/brand/:brand', (req, res) => this.deviceController.getDevicesByBrand(req, res));
    this.router.get('/state/:state', (req, res) => this.deviceController.getDevicesByState(req, res));
    this.router.delete('/:id', (req, res) => this.deviceController.deleteDevice(req, res));
  }
}