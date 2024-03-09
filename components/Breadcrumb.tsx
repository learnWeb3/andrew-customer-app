import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as MUILink } from "@mui/material";
import Link from "next/link";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export interface BreadCrumbProps {
  parts: { label: string; href: string }[];
}

export default function Breadcrumb({ parts = [] }: BreadCrumbProps) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        {parts.map(({ label, href }) => (
          <Link href={href} key={href}>
            <MUILink
              component={"span"}
              variant="subtitle2"
              underline="hover"
              color="inherit"
            >
              {label}
            </MUILink>
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
