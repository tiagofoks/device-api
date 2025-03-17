import express, { Express } from 'express';
import { DeviceController } from './controllers/device-controller';
import { DeviceService } from './services/device-service';
import { InMemoryDeviceRepository } from './repositories/in-memory-device-repository';

export class App {
  public app: Express;
  public deviceController: DeviceController;

  constructor() {
    this.app = express();
    this.config();
    this.deviceController = new DeviceController(new DeviceService(new InMemoryDeviceRepository()));
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.post('/devices', (req, res) => this.deviceController.createDevice(req, res));
    this.app.put('/devices/:id', (req, res) => this.deviceController.updateDevice(req, res));
    this.app.get('/devices/:id', (req, res) => this.deviceController.getDevice(req, res));
    this.app.get('/devices', (req, res) => this.deviceController.getAllDevices(req, res));
    this.app.get('/devices/brand/:brand', (req, res) => this.deviceController.getDevicesByBrand(req, res));
    this.app.get('/devices/state/:state', (req, res) => this.deviceController.getDevicesByState(req, res));
    this.app.delete('/devices/:id', (req, res) => this.deviceController.deleteDevice(req, res));
  }
}