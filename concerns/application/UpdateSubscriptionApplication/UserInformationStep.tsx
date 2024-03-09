import { Button, Grid, Typography } from "@mui/material";
import { UpdateSubscriptionApplicationData } from ".";
import {
  validateEmail,
  validateMobilePhone,
  validateRequired,
} from "../../../components/TextField/validators";
import { TextField } from "../../../components/TextField";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { FileType } from "../../../lib/file-type.enum";
import { updateSubscriptionApplication } from "../../../services/andrew-api.service";
import { removeEmptyKeys } from "../../../lib/remove-empty-keys.helper";
import { ObjectStorageFileField } from "../../../components/ObjectStorageFileField";
import { MapsAutocompleteTextField } from "../../../components/MapAutocompleteTextField";

export interface ContactInformationStepProps {
  data: UpdateSubscriptionApplicationData;
  errors: { [field: string]: string[] };
  setErrors: (
    errors:
      | { [field: string]: string[] }
      | ((errors: { [field: string]: string[] }) => {
          [field: string]: string[];
        })
  ) => void;
  setData: (newData: UpdateSubscriptionApplicationData) => void;
  save: (data: UpdateSubscriptionApplicationData) => Promise<void>;
  readOnly?: boolean;
}
export function UserInformationStep({
  data,
  errors = {},
  setErrors = (errors = {}) => {},
  setData = (newData: UpdateSubscriptionApplicationData) => {},
  save = async (data: UpdateSubscriptionApplicationData) => {},
  readOnly = false,
}: ContactInformationStepProps) {
  const { accessToken } = useOidcAccessToken();

  async function handleIdCardFilePathChange(filePath: string) {
    const { _id, ref, status, ...other } = data;
    const updatedData = {
      ...other,
      identityDocs: {
        ...data.identityDocs,
        idCardDocURL: filePath,
      },
    };
    await updateSubscriptionApplication(
      _id,
      removeEmptyKeys(updatedData),
      accessToken
    ).then(() => setData({ _id, ref, status, ...updatedData }));
  }

  async function handleResidencyProofFilePathChange(filePath: string) {
    const { _id, ref, status, ...other } = data;
    const updatedData = {
      ...other,
      identityDocs: {
        ...data.identityDocs,
        residencyProofDocURL: filePath,
      },
    };
    await updateSubscriptionApplication(
      _id,
      removeEmptyKeys(updatedData),
      accessToken
    ).then(() => {
      setData({ _id, ref, status, ...updatedData });
    });
  }

  return (
    <Grid
      container
      item
      xs={12}
      spacing={2}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Grid item xs={12}>
        <Typography gutterBottom variant="subtitle2">
          Identity
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          label="Lastname"
          id="lastName"
          validate={validateRequired}
          value={data?.billingInformations?.lastName}
          errors={(errors.lastName as any) || []}
          setErrors={(_errors) =>
            setErrors((errors) => ({
              ...errors,
              lastName: _errors,
            }))
          }
          handleInput={(value) => {
            setData({
              ...data,
              billingInformations: {
                ...(data?.billingInformations ? data.billingInformations : {}),
                lastName: value,
              },
            });
          }}
          readOnly={readOnly}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          label="Firstname"
          id="firstName"
          validate={validateRequired}
          value={data?.billingInformations?.firstName}
          errors={(errors.firstName as any) || []}
          setErrors={(_errors) =>
            setErrors({
              ...errors,
              firstName: _errors,
            })
          }
          handleInput={(value) => {
            setData({
              ...data,
              billingInformations: {
                ...(data?.billingInformations ? data?.billingInformations : {}),
                firstName: value,
              },
            });
          }}
          readOnly={readOnly}
        />
      </Grid>

      {!readOnly ? (
        <Grid
          item
          xs={12}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Button
            onClick={() => {
              save(data);
            }}
            variant="contained"
          >
            SAVE
          </Button>
        </Grid>
      ) : false}

      <Grid item xs={12}>
        <Typography gutterBottom variant="subtitle2">
          Contact
        </Typography>
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          label="Email"
          id="email"
          validate={validateEmail}
          value={data?.contactInformations?.email}
          errors={(errors.email as any) || []}
          setErrors={(_errors) =>
            setErrors((errors) => ({
              ...errors,
              email: _errors,
            }))
          }
          handleInput={(value) => {
            setData({
              ...data,
              contactInformations: {
                ...(data?.contactInformations ? data.contactInformations : {}),
                email: value,
              },
            });
          }}
          readOnly={readOnly}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          label="Mobile Phone"
          id="phoneNumber"
          validate={validateMobilePhone}
          value={data.contactInformations?.phoneNumber}
          errors={(errors.phoneNumber as any) || []}
          setErrors={(_errors) =>
            setErrors((errors) => ({
              ...errors,
              phoneNumber: _errors,
            }))
          }
          handleInput={(value) => {
            setData({
              ...data,
              contactInformations: {
                ...(data?.contactInformations ? data.contactInformations : {}),
                phoneNumber: value,
              },
            });
          }}
          readOnly={readOnly}
        />
      </Grid>

      {!readOnly ? (
        <Grid
          item
          xs={12}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Button onClick={() => save(data)} variant="contained">
            SAVE
          </Button>
        </Grid>
      ) : false}
      <Grid item xs={12}>
        <Typography gutterBottom variant="subtitle2">
          Residency
        </Typography>
      </Grid>
      {!readOnly ? (
        <Grid item xs={12}>
          <MapsAutocompleteTextField
            label="Start typing your address in here..."
            id="address"
            validate={validateRequired}
            value={data?.billingInformations?.address}
            errors={(errors.address as any) || []}
            setErrors={(_errors) =>
              setErrors((errors) => ({
                ...errors,
                address: _errors,
              }))
            }
            handleInput={(value) => {
              setData({
                ...data,
                billingInformations: {
                  ...(data?.billingInformations
                    ? data.billingInformations
                    : {}),
                  address: value.address,
                  city: value.city,
                  postCode: value.postCode,
                  country: value.country,
                },
              });
            }}
          />
        </Grid>
      ) : false}
      <Grid item xs={12}>
        <TextField
          label="Address"
          id="address"
          validate={validateRequired}
          value={data?.billingInformations?.address}
          errors={(errors.address as any) || []}
          setErrors={(_errors) =>
            setErrors((errors) => ({
              ...errors,
              address: _errors,
            }))
          }
          readOnly={true}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          label="City"
          id="city"
          validate={validateRequired}
          value={data?.billingInformations?.city}
          errors={(errors.city as any) || []}
          setErrors={(_errors) =>
            setErrors((errors) => ({
              ...errors,
              city: _errors,
            }))
          }
          readOnly={true}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          label="Postcode"
          id="postCode"
          validate={validateRequired}
          value={data?.billingInformations?.postCode}
          errors={(errors.postCode as any) || []}
          setErrors={(_errors) =>
            setErrors((errors) => ({
              ...errors,
              postCode: _errors,
            }))
          }
          readOnly={true}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <TextField
          label="Country"
          id="country"
          validate={validateRequired}
          value={data?.billingInformations?.country}
          errors={(errors.country as any) || []}
          setErrors={(_errors) =>
            setErrors((errors) => ({
              ...errors,
              country: _errors,
            }))
          }
          readOnly={true}
        />
      </Grid>

      {!readOnly ? (
        <Grid
          item
          xs={12}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Button onClick={() => save(data)} variant="contained">
            SAVE
          </Button>
        </Grid>
      ) : false}

      <Grid item xs={12}>
        <Typography gutterBottom variant="subtitle2">
          Documents
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        lg={6}
        sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
      >
        <ObjectStorageFileField
          label="id card"
          fileType={FileType.ID_CARD}
          filePath={data?.identityDocs?.idCardDocURL || ""}
          onFilePathChange={handleIdCardFilePathChange}
          fileNameOverride={"id-card"}
          readOnly={readOnly}
        />
      </Grid>

      <Grid
        item
        xs={12}
        lg={6}
        sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}
      >
        <ObjectStorageFileField
          label="residency proof"
          fileType={FileType.RESIDENCY_PROOF}
          filePath={data?.identityDocs?.residencyProofDocURL || ""}
          onFilePathChange={handleResidencyProofFilePathChange}
          fileNameOverride={"residency-proof"}
          readOnly={readOnly}
        />
      </Grid>
    </Grid>
  );
}
