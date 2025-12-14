import { expect } from "jsr:@std/expect";
import { describe, it } from "jsr:@std/testing/bdd";
import { withDB } from "../testing.ts";
import createInsight from "./create-insight.ts";

import type { Insight } from "$models/insight.ts";

describe("creating an insight in the database", () => {
  describe("populated DB", () => {
    withDB((fixture) => {
    
      const { db } = fixture;

      const inputInsight: Pick<Insight, "brand" | "text"> = { brand: 0, text: "test" };

      it("successfully creates an insight", () => {
        const insightInDb = { ...inputInsight, id: expect.any(Number), createdAt: expect.any(String) };
        
        const result = createInsight({ db, insight: inputInsight});

        expect(result).toBeDefined();
        expect(result).toMatchObject(insightInDb);
      });

    });
  });
});
