import { DeviceState } from '../interfaces/device-state';
import { Device } from '../interfaces/device';
import { DeviceRepository } from '../interfaces/device-repository';
import { v4 as uuidv4 } from 'uuid';

export class DeviceService {
  constructor(private deviceRepository: DeviceRepository) {}

  async createDevice(name: string, brand: string): Promise<Device> {
    const device: Device = {
      id: uuidv4(),
      name,
      brand,
      state: DeviceState.AVAILABLE,
      creationTime: new Date(),
    };
    return this.deviceRepository.create(device);
  }

  async updateDevice(id: string, deviceUpdate: Partial<Device>): Promise<Device | null> {
    const existingDevice = await this.deviceRepository.findById(id);
    if (!existingDevice) {
      return null;
    }

    if (existingDevice.state === DeviceState.IN_USE) {
        if (deviceUpdate.name || deviceUpdate.brand) {
            throw new Error("Cannot update name or brand of in-use devices");
        }
    }

    if (deviceUpdate.creationTime) {
      throw new Error("Cannot update creation time");
    }

    return this.deviceRepository.update(id, deviceUpdate);
  }

  async getDevice(id: string): Promise<Device | null> {
    return this.deviceRepository.findById(id);
  }

  async getAllDevices(): Promise<Device[]> {
    return this.deviceRepository.findAll();
  }

  async getDevicesByBrand(brand: string): Promise<Device[]> {
    return this.deviceRepository.findByBrand(brand);
  }

  async getDevicesByState(state: DeviceState): Promise<Device[]> {
    return this.deviceRepository.findByState(state);
  }

  async deleteDevice(id: string): Promise<boolean> {
    const existingDevice = await this.deviceRepository.findById(id);
    if (!existingDevice) {
      return false;
    }
    if (existingDevice.state === DeviceState.IN_USE) {
      throw new Error('Cannot delete in-use devices');
    }
    return this.deviceRepository.delete(id);
  }
}