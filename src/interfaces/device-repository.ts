import { DeviceState } from './device-state';
import { Device } from './device';

export interface DeviceRepository {
  create(device: Device): Promise<Device>;
  update(id: string, device: Partial<Device>): Promise<Device | null>;
  findById(id: string): Promise<Device | null>;
  findAll(): Promise<Device[]>;
  findByBrand(brand: string): Promise<Device[]>;
  findByState(state: DeviceState): Promise<Device[]>;
  delete(id: string): Promise<boolean>;
}