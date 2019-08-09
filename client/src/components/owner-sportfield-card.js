/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Card, Title, Progress } from "../components/ui";
import { Link } from "@reach/router";

function OwnerSportFieldCard({ name, progressStatus, id, image }) {
  const [status, setStatus] = React.useState("0%");

  const styleCard = {
    maxWidth: "40%",
    display: "block",
    textDecoration: "none",
    color: "inherit",
    width: "100%",
    marginBottom: "1.5em",
    "@media screen and (max-width: 530px)": {
      maxWidth: "100%"
    }
  };

  React.useEffect(() => {
    if (status !== progressStatus) {
      setStatus(progressStatus);
    }
  }, [progressStatus, status]);

  return (
    <Link to={`/owner-sport-field/${id}`} css={styleCard}>
      <Card css={{ padding: "1rem" }}>
        <img
          src={image}
          alt={name}
          css={{ width: "100%", height: "180px", objectFit: "cover" }}
        />
        <Title css={{ textTransform: "capitalize" }}>{name}</Title>
        <Progress styles={{ bar: { width: status } }} />
        <p css={{ textAlign: "center" }}>Bookings: {progressStatus}</p>
      </Card>
    </Link>
  );
}

export default OwnerSportFieldCard;
