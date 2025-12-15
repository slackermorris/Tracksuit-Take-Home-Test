import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Insights } from "./insights.tsx";
import userEvent from "@testing-library/user-event";

import type { Insight } from "../../schemas/insight.ts";

const TEST_INSIGHTS: Array<Insight> = [
  {
    id: 1,
    brand: 1,
    createdAt: new Date(),
    text: "Test insight",
  },
];

const mockFetch = vi.fn().mockResolvedValueOnce({
  ok: true,
  status: 204,
});

global.fetch = mockFetch;

const user = userEvent.setup();

describe("insights", () => {
  it("renders", () => {
    const { getByText } = render(<Insights insights={TEST_INSIGHTS} />);

    expect(getByText(TEST_INSIGHTS[0].text)).toBeVisible();
    expect(getByText(`Brand: ${TEST_INSIGHTS[0].brand}`)).toBeVisible();
  });

  it("successfully deletes an insight", async () => {
    const { getAllByTestId } = render(<Insights insights={TEST_INSIGHTS} />);
    const deleteButtons = getAllByTestId("delete-button");
    expect(deleteButtons).toHaveLength(TEST_INSIGHTS.length);

    await user.click(deleteButtons[0]);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `/api/insights/delete/${TEST_INSIGHTS[0].id}`,
      {
        method: "DELETE",
      }
    );
  });

  it.todo("shows an error message if the insight fails to be deleted");
});
