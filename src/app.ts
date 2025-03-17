import express, { Express } from 'express';
import { DeviceController } from './controllers/device-controller';
import { DeviceService } from './services/device-service';
import { InMemoryDeviceRepository } from './repositories/in-memory-device-repository';
import { DeviceRoutes } from './routes/device-routes';
import { swaggerUiServe, swaggerUiSetup } from './swagger';

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
    this.app.use('/api-docs', swaggerUiServe, swaggerUiSetup);
  }

  private routes(): void {
    this.app.use('/devices', new DeviceRoutes(this.deviceController).router); 
  }
}