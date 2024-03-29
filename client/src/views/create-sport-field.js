/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Input, Label, Card, Button, MaterialInput } from "../components/ui";
import { postSportField } from "../services/sport-field";
import { navigate } from "@reach/router";
import { useSetNotify } from "../actions/action-hooks";
import { useSelectedClub } from "../selectors/selectors";

function CreateSportField() {
  const club_id = useSelectedClub();
  const [fields, setFields] = React.useState({
    name: "",
    description: "",
    image: null,
    price_day: "",
    price_night: "",
    club_id
  });
  const [error, setError] = React.useState(null);
  const setNotify = useSetNotify();

  React.useEffect(() => {
    if (!club_id) {
      setNotify("You need to select a club");
      navigate("/owner");
    }
  }, []);

  function handleChange(e) {
    if (e.target.name === "image") {
      setFields({ ...fields, image: e.target.files[0] });
    } else {
      setFields({ ...fields, [e.target.name]: e.target.value });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(fields);
    const formData = new FormData();
    Object.keys(fields).forEach(key => {
      formData.append(key, fields[key]);
    });
    try {
      await postSportField(formData);
      setNotify("SportField created");
      navigate("/owner");
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <Card
      css={{
        maxWidth: "500px",
        margin: "auto"
      }}
    >
      <form onSubmit={handleSubmit}>
        <div css={{ marginTop: "2em" }}>
          <MaterialInput
            aria-label="enter name"
            required
            autoComplete="off"
            type="text"
            id="name"
            name="Name"
            placeholder=" "
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <MaterialInput
            aria-label="enter description"
            required
            autoComplete="off"
            type="text"
            id="description"
            name="Description"
            placeholder=" "
            value={fields.description}
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label htmlFor="image">Image(s)</Label>
          <Input
            aria-label="choose image"
            required
            id="image"
            name="image"
            type="file"
            onChange={handleChange}
          />
        </div>
        <div css={{ marginTop: "2em" }}>
          <Label>Prices</Label>
          <div
            css={{ marginTop: "0.75em", display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="price_day"
              css={{
                minWidth: "100px",
                marginRight: "1em"
              }}
            >
              Day:{" "}
            </label>
            <Input
              aria-label="enter price-day"
              id="price_day"
              name="price_day"
              type="number"
              css={{ maxWidth: "80px" }}
              value={fields.price_day}
              onChange={handleChange}
              required
            />
          </div>
          <div
            css={{ marginTop: "0.75em", display: "flex", alignItems: "center" }}
          >
            <label
              htmlFor="price_night"
              css={{
                minWidth: "100px",
                marginRight: "1em"
              }}
            >
              Night:
            </label>
            <Input
              aria-label="enter price-night"
              id="price_night"
              name="price_night"
              type="number"
              css={{ maxWidth: "80px" }}
              value={fields.price_night}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div css={{ marginTop: "2em" }}>
          <Button>Create</Button>
        </div>
        {error && (
          <div css={{ color: "red", marginTop: "1rem" }}>Error: {error}</div>
        )}
      </form>
    </Card>
  );
}

export default CreateSportField;
