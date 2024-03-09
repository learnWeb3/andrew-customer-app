import { ContractStatus } from "./contract-status.enum";

export interface Contract {
  _id: string;
  ref: string;
  vehicles?: { count: number }[];
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
    __v: number;
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
  status: ContractStatus;
  ecommerceProduct: string;
  ecommerceSubscription: null;
  ecommerceCheckoutURL: string;
  ecommerceGateway: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
