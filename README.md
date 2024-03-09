# Andrew customer app

This repository contains the code related to the Andrew Insurance customer front facing application.

## APIs documentation

- [API postman collection online](https://documenter.getpostman.com/view/13953520/2s9YeHbrPg#intro)
- [API postman collection download](./doc/andrew-api.postman_collection.json)
- [Ecommerce postman collection online](https://documenter.getpostman.com/view/13953520/2s9YsGhDL8)
- [Ecommerce postman collection download](./doc/andrew-ecommerce.postman_collection.json)
- 
## GLobal workflow

1. As a superadmin i register devices and flash credentials on the devices firmware (IOT)
2. As a new user from the landing page offering the subscription to Andrew's insurance products i click on call to action to create my customer account and i am redirected back to the application logged in
3. As a logged in user i create a new subscription application and fill out the required informations and documents
4. As a logged in user i submit my subscription application for review
5. As an logged in insurer i review and validate the subscription application generating a contract attached checkout url
6. As the system i takes informations from the subscription application to register a new contract and it's related vehicles generating checkout url using a the configured payment gateway (stripe)
7. As the system i receive confirmation of the user subscription and update the contract status accordingly
8. As a logged in insurer i select a device from the available device pool and link the device to a vehicle
9. As a logged in insurer i activate the selected/linked device
10. As a logged in insurer i send the device to the user address by mail
11. As a logged in user i receive the device
12. As a logged in user i activate the device by plugging it into the obd plug of my vehicle
13. As an authorized device i verify the vehicle VIN is valid in the system
14. As the system i validate the device from a customer point of view
15. As a user, i am now happy i am insured
16. As the device i collect vehicle metrics and send them to the system periodically
17. As the system i classify the vehicle driver behaviour
18. As the system and according to the vehcile driver behaviour classification i grant insurance discount on the user susbscription.

## Subscription application and Contract status workflow

I. A customer create a subscription application with a status of PENDING
II. when all informations filled and the customer wants to apply it confirms it subscription application and asks for a review of it, the status moved from PENDING to REVIEWING
III. An insurer review the subscription application and can directly update the data if wanted, or finalize the subscription by applying a status:
   
   1. PAYMENT_PENDING: initiate the payment/checkout workflow by generating a checkout url
   
      - system register a contract with an INACTIVE status and vehicles linked to the contract from data present in subscription application 
      - customer click on the generated checkout url
      - contract status change from INACTIVE to ACTIVE upon successful subscription initialization

   2. REJECTED: customer can create a new susbcription application the current one won't be changed anymore
   3. TO_AMMEND: customer must update it's subscription application
   
      - customer can ammend its subscription application and restart from step II

## Roles

- superadmin:
  - devices WRITE + DELETE
  - all below roles
- supervisor:
  - devices READ
  - devices to contract link
  - users READ + WRITE + UPDATE + DELETE
  - contracts READ + WRITE + UPDATE + DELETE
  - vehicles READ + WRITE + UPDATE + DELETE
  - subscription application READ + WRITE + UPDATE + DELETE
- user:
  - devices READ own data
  - contracts READ own data
  - vehicle READ own data
  - susbscription application WRITE + UPDATE

## Test users and roles

- elliot.billie@yopmail.com - superadmin
- jacko@yopmail.com - insurer aka supervisor (keycloak)
- jack.williams@yopmail.com - user
- mike@yopmail.com - user


## Quick start

```bash
# install project dependencies
npm install
# lauch developement server
npm run dev
```
