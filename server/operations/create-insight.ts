import type { Insight } from "$models/insight.ts";
import type { HasDBClient } from "../shared.ts";
import * as insightsTable from "$tables/insights.ts";

type Input = HasDBClient & {
  insight: Pick<Insight, "brand" | "text">;
};

export default (input: Input): any => {
  console.log("Creating insight");

  const { db, insight } = input;

  const result = db.sql<insightsTable.Row>`INSERT INTO insights (brand, createdAt, text) VALUES (${
    insight.brand
  }, ${new Date().toISOString()}, ${insight.text}) RETURNING *`;

  console.log("Created insight successfully: ", result);
  return result[0];
};
