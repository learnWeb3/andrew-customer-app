import { ApplicationStatus } from "./application-status.enum";

export interface Application {
  _id: string;
  ref: string;
  customer: {
    _id: string;
    insurer: boolean;
    authorizationServerUserId: string;
    contactInformations: {
      email: string;
    };
    paymentInformations: {
      ecommerceCustomer: string;
    };
    firstName: string;
    lastName: string;
    fullName: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  status: ApplicationStatus;
  vehicles: {
    vin: string;
    brand: string;
    model: string;
    year: number;
    registrationNumber: string;
    originalInServiceDate: string;
    contractSubscriptionKm: number;
    driverLicenceDocURL: string;
    vehicleRegistrationCardDocURL: string;
  }[];
  contract: {
    contractDocURL: string;
    ecommerceProduct: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
