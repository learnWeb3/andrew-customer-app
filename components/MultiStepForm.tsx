import { styled } from "@mui/system";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  MenuList,
  MenuItem,
  ListItemIcon,
  Divider,
  Badge,
  SvgIcon,
} from "@mui/material";
import {
  JSXElementConstructor,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Logo } from "../icons/Logo";

export interface MultiStepFormStep<T> {
  title: string;
  component: (props: {
    data: T;
    setData: (newData: T) => void;
    save: (data: T) => Promise<void>;
    errors: { [field: string]: string[] };
    setErrors: (
      errors:
        | { [field: string]: string[] }
        | ((errors: { [field: string]: string[] }) => {
            [field: string]: string[];
          })
    ) => any;
  }) => ReactElement | ReactElement[];
  validate: (data: T) => {
    valid: boolean;
    errors: string[];
  };
}

export interface MultiStepFormProps<T> {
  data?: T;
  setData: (newData: T) => void;
  save: (data: T) => Promise<void>;
  initialActiveStepIndex?: number;
  steps?: MultiStepFormStep<T>[];
  onPrevious?: (data: T) => void;
  onNext?: (data: T) => void;
  onSubmit?: (data: T) => void;
  errors: { [field: string]: string[] };
  setErrors: (
    errors:
      | { [field: string]: string[] }
      | ((errors: { [field: string]: string[] }) => {
          [field: string]: string[];
        })
  ) => void;
}

export interface StepperWithErrorProps<T> {
  steps: MultiStepFormStep<T>[];
  data?: T;
  activeStepIndex?: number;
  setActiveStepIndex: (
    stepIndex: number
  ) => void | ((stepIndex: number) => void);
}

export const MaterialUIStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    color: theme.palette.secondary.light,
    fill: theme.palette.secondary.light,
    "& .Mui-active": {
      color: theme.palette.secondary.main,
      fill: theme.palette.secondary.main,
    },
    "& .Mui-completed": {
      color: theme.palette.secondary.main,
      fill: theme.palette.secondary.main,
    },
  },
  "& .MuiStepIcon-text": {
    fill: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  "& .MuiStepLabel-labelContainer": {
    "& .Mui-active": {
      color: theme.palette.secondary.main,
    },
    "& .Mui-completed": {
      color: theme.palette.secondary.main,
    },
    color: theme.palette.secondary.light,
  },
}));

export function StepperWithError<T>({
  activeStepIndex = 0,
  setActiveStepIndex = (activeStepIndex: number) => {},
  data = {
    vehicles: [
      {
        vin: "2GCEC19T931234567",
        brand: "toyota",
        model: "yaris",
        year: 2017,
        registrationNumber: "AB-123-CD",
        originalInServiceDate: "2023-12-16T11:44:26.916Z",
        contractSubscriptionKm: 100000,
        driverLicenceDocURL: "",
        vehicleRegistrationCardDocURL: "",
      },
    ],
    contract: {
      contractDocURL: "",
      ecommerceProduct: "70b1fcba-3953-4ea3-9f66-8f7f218dd00a",
    },
    contactInformations: {
      phoneNumber: "+33666084313",
      email: "test@yopmail.com",
    },
    billingInformations: {
      lastName: "doe",
      firstName: "mike",
      company: "",
      address: "9 rue de la charité",
      postCode: "75001",
      city: "Paris",
      country: "FRANCE",
    },
    identityDocs: {
      idCardDocURL: "",
      residencyProofDocURL: "",
    },
    paymentDocs: {
      termsOfSaleDocURL: "",
    },
  } as T,
  steps = [
    {
      title: "Contact informations",
      component: ({ data, setData, save }) => <Box>Test</Box>,
      validate: (data: T) => ({ errors: [], valid: true }),
    },
    {
      title: "Identity documents",
      component: ({ data, setData, save }) => <Box>est</Box>,
      validate: (data: T) => ({ errors: [], valid: true }),
    },
    {
      title: "Select your insurance product",
      component: ({ data, setData, save }) => <Box>est</Box>,
      validate: (data: T) => ({ errors: [], valid: true }),
    },
    {
      title: "Vehicles informations",
      component: ({ data, setData, save }) => <Box>est</Box>,
      validate: (data: T) => ({ errors: [], valid: true }),
    },
    {
      title: "Terms of sale",
      component: ({ data, setData, save }) => <Box>est</Box>,
      validate: (data: T) => ({ errors: [], valid: true }),
    },
  ],
}: StepperWithErrorProps<T>) {
  return (
    <Box sx={{ width: "100%", color: "inherit" }}>
      <Stepper activeStep={activeStepIndex} orientation="vertical">
        {steps.map(({ title, validate }, index) => {
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (!validate(data)?.valid) {
            labelProps.optional = (
              <ul
                style={{
                  listStyleType: "disc",
                  paddingLeft: "1em",
                  color: "#ff1744",
                }}
              >
                {validate(data)?.errors?.map((error, index) => (
                  <li>
                    <Typography variant="caption" key={index}>
                      {error}
                    </Typography>
                  </li>
                ))}
              </ul>
            );
            labelProps.error = true;
          }

          return (
            <Step key={title}>
              <MaterialUIStepLabel
                {...labelProps}
                onClick={() => setActiveStepIndex(index)}
              >
                {title}
              </MaterialUIStepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}

export function MultiStepForm<T>({
  setData = (newData) => {},
  save = async (data) => {},
  errors = {},
  setErrors = (errors = {}) => {},
  data = {
    vehicles: [
      {
        vin: "2GCEC19T931234567",
        brand: "toyota",
        model: "yaris",
        year: 2017,
        registrationNumber: "AB-123-CD",
        originalInServiceDate: "2023-12-16T11:44:26.916Z",
        contractSubscriptionKm: 100000,
        driverLicenceDocURL: "",
        vehicleRegistrationCardDocURL: "",
      },
    ],
    contract: {
      contractDocURL: "",
      ecommerceProduct: "70b1fcba-3953-4ea3-9f66-8f7f218dd00a",
    },
    contactInformations: {
      phoneNumber: "+33666084313",
      email: "test@yopmail.com",
    },
    billingInformations: {
      lastName: "doe",
      firstName: "mike",
      company: "",
      address: "9 rue de la charité",
      postCode: "75001",
      city: "Paris",
      country: "FRANCE",
    },
    identityDocs: {
      idCardDocURL: "",
      residencyProofDocURL: "",
    },
    paymentDocs: {
      termsOfSaleDocURL: "",
    },
  } as T,
  initialActiveStepIndex = 0,
  steps = [],
  onPrevious = (data: T) => {},
  onNext = (data: T) => {},
  onSubmit = (data: T) => {},
}: MultiStepFormProps<T>) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(
    initialActiveStepIndex
  );
  const [ActiveStep, setActiveStep] = useState<MultiStepFormStep<T> | null>(
    null
  );
  useEffect(() => {
    setActiveStep(steps[activeStepIndex]);
  }, [activeStepIndex, steps]);

  const handleNext = () => {
    setActiveStepIndex(() => activeStepIndex + 1);
    onNext(data);
  };

  const handleBack = () => {
    setActiveStepIndex(() => activeStepIndex - 1);
    onPrevious(data);
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <Grid container justifyContent="flex-start" alignItems="flex-start">
      <Grid
        item
        xs={12}
        lg={3}
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          minHeight: "100vh",
          backgroundColor: "primary.main",
          color: "secondary.main",
          fill: "secondary.main",
          padding: "1rem",
          display: { xs: "none", sm: "none", lg: "flex" },
        }}
      >
        <MenuList
          sx={{
            width: "100%",
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <Logo height="2.5rem" />
            </ListItemIcon>
          </MenuItem>
          <Divider
            sx={{
              backgroundColor: "secondary.main",
              marginTop: "2rem",
              marginBottom: "2rem",
            }}
          />
          <MenuItem>
            <StepperWithError
              steps={steps}
              data={data}
              activeStepIndex={activeStepIndex}
              setActiveStepIndex={setActiveStepIndex}
            />
          </MenuItem>
        </MenuList>
      </Grid>
      <Grid
        item
        xs={12}
        lg={9}
        py={4}
        sx={{
          background: "secondary.main",
          padding: "1rem",
          height: "100vh",
        }}
      >
        {ActiveStep ? (
          <ul
            style={{
              width: "100%",
              height: "90%",
              overflow: "auto",
              listStyleType: "none",
              padding: 0,
            }}
          >
            <li
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: "primary.main",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "secondary.main",
                }}
              >
                <Typography component="h2" variant="body2">
                  {activeStepIndex + 1}/{steps.length}
                </Typography>
              </Box>
              <Typography
                component="h2"
                variant="h5"
                sx={{
                  fontWeight: 600,
                }}
              >
                {ActiveStep.title}
              </Typography>
            </li>
            <Divider
              sx={{
                backgroundColor: "primary.main",
                marginTop: "1.25rem",
                marginBottom: "1.25rem",
              }}
            />
            <li>
              <ActiveStep.component
                data={data as T}
                setData={setData}
                save={save}
                errors={errors}
                setErrors={setErrors}
              />
            </li>
          </ul>
        ) : (
          false
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            color="inherit"
            disabled={activeStepIndex === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          <Button
            onClick={
              activeStepIndex + 1 <= steps.length - 1
                ? handleNext
                : handleSubmit
            }
            disabled={!steps[activeStepIndex]?.validate(data)?.valid}
            sx={{ mr: 1 }}
          >
            {activeStepIndex + 1 <= steps.length - 1 ? "Next" : "Submit"}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
