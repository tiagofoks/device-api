import { DeviceService } from '../services/device-service';
import { InMemoryDeviceRepository } from '../repositories/in-memory-device-repository';
import { Device } from '../interfaces/device';
import { DeviceState } from '../interfaces/device-state';

describe('DeviceService', () => {
  let deviceService: DeviceService;
  let deviceRepository: InMemoryDeviceRepository;

  beforeEach(() => {
    deviceRepository = new InMemoryDeviceRepository();
    deviceService = new DeviceService(deviceRepository);
  });

  it('should create a device', async () => {
    const device = await deviceService.createDevice('Laptop', 'BrandA');
    expect(device).toBeDefined();
    expect(device.name).toBe('Laptop');
    expect(device.brand).toBe('BrandA');
    expect(device.state).toBe(DeviceState.AVAILABLE);
  });

  it('should update a device', async () => {
    const device = await deviceService.createDevice('Laptop', 'BrandA');
    const updatedDevice = await deviceService.updateDevice(device.id, { name: 'Desktop' });
    expect(updatedDevice).toBeDefined();
    expect(updatedDevice?.name).toBe('Desktop');
  });

  it('should not update a device if it is in use', async () => {
    const device = await deviceService.createDevice('Laptop', 'BrandA');
    await deviceService.updateDevice(device.id, { state: DeviceState.IN_USE });
    await expect(deviceService.updateDevice(device.id, { name: 'Desktop' })).rejects.toThrow('Cannot update name or brand of in-use devices');
  });

  it('should not update creationTime', async () => {
    const device = await deviceService.createDevice('Laptop', 'BrandA');
    await expect(deviceService.updateDevice(device.id, { creationTime: new Date() })).rejects.toThrow('Cannot update creation time');
  });

  it('should get a device by id', async () => {
    const device = await deviceService.createDevice('Laptop', 'BrandA');
    const foundDevice = await deviceService.getDevice(device.id);
    expect(foundDevice).toBeDefined();
    expect(foundDevice?.id).toBe(device.id);
  });

  it('should get all devices', async () => {
    await deviceService.createDevice('Laptop', 'BrandA');
    await deviceService.createDevice('Desktop', 'BrandB');
    const devices = await deviceService.getAllDevices();
    expect(devices).toBeDefined();
    expect(devices.length).toBe(2);
  });

  it('should get devices by brand', async () => {
    await deviceService.createDevice('Laptop', 'BrandA');
    await deviceService.createDevice('Desktop', 'BrandB');
    const devices = await deviceService.getDevicesByBrand('BrandA');
    expect(devices).toBeDefined();
    expect(devices.length).toBe(1);
    expect(devices[0].brand).toBe('BrandA');
  });

  it('should get devices by state', async () => {
    await deviceService.createDevice('Laptop', 'BrandA');
    await deviceService.createDevice('Desktop', 'BrandB');
    await deviceService.updateDevice((await deviceService.getAllDevices())[1].id, { state: DeviceState.IN_USE });
    const devices = await deviceService.getDevicesByState(DeviceState.IN_USE);
    expect(devices).toBeDefined();
    expect(devices.length).toBe(1);
    expect(devices[0].state).toBe(DeviceState.IN_USE);
  });

  it('should delete a device', async () => {
    const device = await deviceService.createDevice('Laptop', 'BrandA');
    const deleted = await deviceService.deleteDevice(device.id);
    expect(deleted).toBe(true);
    const foundDevice = await deviceService.getDevice(device.id);
    expect(foundDevice).toBeNull();
  });

  it('should not delete a device if it is in use', async () => {
    const device = await deviceService.createDevice('Laptop', 'BrandA');
    await deviceService.updateDevice(device.id, { state: DeviceState.IN_USE });
    await expect(deviceService.deleteDevice(device.id)).rejects.toThrow('Cannot delete in-use devices');
  });
});