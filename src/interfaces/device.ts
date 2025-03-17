
import { DeviceState } from './device-state';

export interface Device {
  id: string;
  name: string;
  brand: string;
  state: DeviceState;
  creationTime: Date;
}