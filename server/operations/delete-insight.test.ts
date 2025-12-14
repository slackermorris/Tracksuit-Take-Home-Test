import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { withDB } from "../testing.ts";

import type { Insight } from "$models/insight.ts";
import deleteInsight from "./delete-insight.ts";
import lookupInsight from "./lookup-insight.ts";

describe("deleting an insight in the database", () => {
  withDB((fixture) => {
    const insight: Insight = {
      id: 1,
      brand: 1,
      createdAt: new Date(),
      text: "3",
    };

    it("successfully deletes the insight", () => {
      fixture.insights.insert([
        { ...insight, createdAt: insight.createdAt.toISOString() },
      ]);
      expect(lookupInsight({ ...fixture, id: insight.id })).toBeDefined();

      deleteInsight({ ...fixture, id: insight.id });
      expect(lookupInsight({ ...fixture, id: insight.id })).toBeUndefined();
    });
  });
});
