import { Device } from "./device.interface";

export interface Vehicle {
  _id: string;
  contract: string;
  customer: string;
  vin: string;
  brand: string;
  model: string;
  year: number;
  registrationNumber: string;
  originalInServiceDate: string;
  contractSubscriptionKm: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  devices?: Device[];
}
