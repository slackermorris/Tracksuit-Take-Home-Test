import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddInsight } from "./add-insight.tsx";

import { BRANDS } from "../../lib/consts.ts";

const mockFetch = vi.fn().mockResolvedValueOnce({
  ok: true,
  json: async () => ({
    id: 1,
    brand: 1,
    text: "Test insight",
    createdAt: new Date(),
  }),
});

global.fetch = mockFetch;

const user = userEvent.setup();

describe("add insights", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the add insight dialog", async () => {
    const { getByText, getByRole, getAllByRole } = render(
      <AddInsight open={true} onClose={() => undefined} />
    );

    // NB: Although in the document, the text is not visible.. must be some inert styling?
    expect(getByRole("dialog")).toBeInTheDocument();
    expect(getByText("Add a new insight")).toBeInTheDocument();
    expect(getByRole("button", { name: "Add insight" })).toBeInTheDocument();
    expect(getAllByRole("option")).toHaveLength(BRANDS.length);
  });

  it("successfully adds an insight", async () => {
    const brand = 1;
    const insightText = "Test insight";

    const { getByRole } = render(
      <AddInsight open={true} onClose={() => undefined} />
    );

    expect(getByRole("dialog")).toBeInTheDocument();
    expect(
      within(getByRole("dialog")).getByRole("heading", {
        name: "Add a new insight",
      })
    ).toBeInTheDocument();
    expect(
      within(getByRole("dialog")).getByRole("button", {
        name: /add insight/i,
      })
    ).toBeInTheDocument();

    await user.selectOptions(getByRole("combobox"), String(brand));
    await user.type(getByRole("textbox"), insightText);
    await user.click(getByRole("button", { name: "Add insight" }));

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith("/api/insights/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brand, text: insightText }),
    });
  });

  it.todo("displays an error message if the insight fails to be added");

  it.todo("retries adding the insight if it fails");

  describe("modal dialog behaviours", () => {
    it.todo("closes the modal when the user clicks the close button");

    it.todo("closes the modal when the user clicks the overlay");

    it.todo("closes the modal when the user clicks the escape key");
  });
});
