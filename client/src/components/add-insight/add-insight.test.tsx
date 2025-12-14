import React from "react";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { AddInsight } from "./add-insight.tsx";

import { BRANDS } from "../../lib/consts.ts";

describe("add insights", () => {
  it("shows the add insight dialog", async () => {
    const { getByText, getByRole, getAllByRole } = render(
      <AddInsight open={true} onClose={() => undefined} />
    );

    // NB: Although in the document, the text is not visible.. must be some inert styling?
    expect(getByText("Add a new insight")).toBeInTheDocument();
    expect(getByRole("button", { name: "Add insight" })).toBeInTheDocument();
    expect(getAllByRole("option")).toHaveLength(BRANDS.length);
  });

  it.todo("successfully adds an insight");

  it.todo("displays an error message if the insight fails to be added");

  it.todo("retries adding the insight if it fails");

  describe("modal dialog behaviours", () => {
    it.todo("closes the modal when the user clicks the close button");

    it.todo("closes the modal when the user clicks the overlay");

    it.todo("closes the modal when the user clicks the escape key");
  });
});
