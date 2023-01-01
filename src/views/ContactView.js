import React from "react";
import { Typography, Link } from "@mui/material";

export default function ContactView() {
  return (
    <div>
      <Typography variant="h3" align="center" color="text.primary" gutterBottom>
        How can we help?
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        If you have any questions or concerns, please{" "}
        <Link href="mailto:salih.salih@mohawkcollege.ca">contact us</Link>.
      </Typography>
    </div>
  );
}
