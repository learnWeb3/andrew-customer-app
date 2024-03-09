import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

export function TermOfSales({}) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<GridExpandMoreIcon />}>
        <Typography variant={"subtitle2"} component={"h2"}>
          Terms of sale
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box display={"flex"} flexDirection={"column"} gap={4}>
          <Typography variant={"h6"} component={"h2"}>
            Andrew Car Insurance Policy with Connected OBD Sensor
          </Typography>

          <Typography variant={"h6"} component={"h6"}>
            Overview:
          </Typography>

          <Typography>
            The Andrew Car Insurance Policy with Connected OBD Sensor ("Andrew
            Policy") is designed to provide comprehensive coverage while
            utilizing innovative technology to analyze driver behavior. By
            incorporating a connected On-Board Diagnostics (OBD) sensor into the
            vehicle, Andrew promotes safe driving habits and offers potential
            discounts of up to 50% on the monthly subscription plan based on the
            driver's behavior profile computed from the data gathered by the
            device.
          </Typography>

          <Typography variant={"h6"} component={"h6"}>
            Terms and Conditions:
          </Typography>

          <Typography>
            <strong>Policy Coverage:</strong> The Andrew Policy provides
            coverage for the insured vehicle against a range of risks as
            outlined in the policy document.
          </Typography>

          <Typography>
            <strong>Connected OBD Sensor:</strong> The insured vehicle must be
            equipped with a connected OBD sensor provided by Andrew. The sensor
            must be plugged in at all times during driving to analyze driver
            behavior and gather relevant data.
          </Typography>

          <Typography>
            <strong>Driver Behavior Analysis:</strong> The OBD sensor collects
            data related to driving behavior, including but not limited to
            speed, acceleration, braking patterns, and time of driving sessions.
            This data is used to compute a driver behavior profile.
          </Typography>

          <Typography>
            <strong>Discount Eligibility:</strong> Eligibility for discounts on
            the monthly subscription plan is based on the driver's behavior
            profile. Safe driving habits may result in discounts of up to 50% on
            the monthly premium.
          </Typography>

          <Typography>
            <strong>Data Privacy:</strong> Andrew respects the privacy of the
            insured and adheres to strict data protection measures. Data
            collected by the OBD sensor is used solely for the purpose of
            analyzing driver behavior and determining discount eligibility.
          </Typography>

          <Typography>
            <strong>Device Installation:</strong> The insured agrees to allow
            Andrew or its authorized representatives to install the connected
            OBD sensor in the insured vehicle. The sensor remains the property
            of Andrew and must be returned upon policy termination.
          </Typography>

          <Typography>
            <strong>Policy Termination:</strong> In the event of policy
            termination, the insured must return the OBD sensor to Andrew or its
            authorized representatives in good condition. Failure to do so may
            result in additional charges.
          </Typography>

          <Typography>
            <strong>Policy Renewal:</strong> The insured may renew the Andrew
            Policy annually, subject to Andrew's terms and conditions, including
            continued participation in the connected OBD program.
          </Typography>

          <Typography>
            <strong>Modification of Terms:</strong> Andrew reserves the right to
            modify the terms and conditions of the Andrew Policy, including
            discount eligibility criteria, with prior notice to the insured.
          </Typography>

          <Typography>
            <strong>Governing Law:</strong> The Andrew Policy is governed by the
            laws of [Jurisdiction], and any disputes arising out of or related
            to the Andrew Policy shall be subject to the exclusive jurisdiction
            of the courts in [Jurisdiction].
          </Typography>

          <Typography>
            By purchasing the Andrew Policy, the insured acknowledges and agrees
            to abide by the terms and conditions outlined herein.
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
