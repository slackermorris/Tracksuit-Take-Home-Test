import type * as insightsTable from "$tables/insights.ts";
import type { HasDBClient } from "../shared.ts";

type Input = HasDBClient & {
    id: number;
};

export default (input: Input): void => {
  console.log("Deleting insight");

  const { db, id } = input;

  db.sql<insightsTable.Row>`DELETE FROM insights WHERE id = ${id}`;

  console.log(`Deleted insight successfully for id=${id}`);
  return;
};
