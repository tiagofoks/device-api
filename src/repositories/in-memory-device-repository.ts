import { DeviceState } from '../interfaces/device-state';
import { Device } from '../interfaces/device';
import { DeviceRepository } from '../interfaces/device-repository';

export class InMemoryDeviceRepository implements DeviceRepository {
  private devices: Device[] = [];

  async create(device: Device): Promise<Device> {
    this.devices.push(device);
    return device;
  }

  async update(id: string, deviceUpdate: Partial<Device>): Promise<Device | null> {
    const index = this.devices.findIndex((d) => d.id === id);
    if (index === -1) {
      return null;
    }
    this.devices[index] = { ...this.devices[index], ...deviceUpdate };
    return this.devices[index];
  }

  async findById(id: string): Promise<Device | null> {
    return this.devices.find((d) => d.id === id) || null;
  }

  async findAll(): Promise<Device[]> {
    return this.devices;
  }

  async findByBrand(brand: string): Promise<Device[]> {
    return this.devices.filter((d) => d.brand === brand);
  }

  async findByState(state: DeviceState): Promise<Device[]> {
    return this.devices.filter((d) => d.state === state);
  }

  async delete(id: string): Promise<boolean> {
    const index = this.devices.findIndex((d) => d.id === id);
    if (index === -1) {
      return false;
    }
    this.devices.splice(index, 1);
    return true;
  }
}