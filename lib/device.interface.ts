export interface Device {
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    _id: string;
    insurer: boolean;
    authorizationServerUserId: string;
    contactInformations: {
      phoneNumber: string;
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
    identityDocs: {
      idCardDocURL: string;
      residencyProofDocURL: string;
    };
    billingInformations: {
      lastName: string;
      firstName: string;
      address: string;
      postCode: string;
      city: string;
      country: string;
    };
  };
  vehicle: {
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
  };
  serialNumber: string;
  pairingDate: string;
  events: {
    count: number;
  }[];
  lastSessions: {
    _id: string;
    device: string;
    start: string;
    end: string;
    __v: number;
  }[];
  eventStat: {
    count: number;
  };
}
