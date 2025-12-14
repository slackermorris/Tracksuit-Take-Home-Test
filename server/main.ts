// deno-lint-ignore-file no-explicit-any
import { Database } from "@db/sqlite";
import * as oak from "@oak/oak";
import * as path from "@std/path";
import { Port } from "../lib/utils/index.ts";
import listInsights from "./operations/list-insights.ts";
import lookupInsight from "./operations/lookup-insight.ts";
import createInsight from "./operations/create-insight.ts";
import * as insightsTable from "$tables/insights.ts";
import type { Insight } from "$models/insight.ts";
import deleteInsight from "./operations/delete-insight.ts";

console.log("Loading configuration");

const env = {
  port: Port.parse(Deno.env.get("SERVER_PORT")),
};

const dbFilePath = path.resolve("tmp", "db.sqlite3");

console.log(`Opening SQLite database at ${dbFilePath}`);

await Deno.mkdir(path.dirname(dbFilePath), { recursive: true });
const db = new Database(dbFilePath);
db.exec(insightsTable.createTable);

console.log("Initialising server");

const router = new oak.Router();

router.get("/_health", (ctx) => {
  ctx.response.body = "OK";
  ctx.response.status = 200;
});

router.get("/insights", (ctx) => {
  const result = listInsights({ db });
  ctx.response.body = result;
  ctx.response.status = 200;
});

router.get("/insights/:id", (ctx) => {
  const params = ctx.params as Record<string, any>;
  const result = lookupInsight({ db, id: params.id });
  ctx.response.body = result;
  ctx.response.status = 200;
});

router.post("/insights/create", async (ctx) => {
  const body = await ctx.request.body.json() as Pick<Insight, "brand" | "text">;
  const result = createInsight({ db, insight: body });
  ctx.response.body = result;
  ctx.response.status = 200;
});

router.delete("/insights/delete/:id", (ctx) => {
  const params = ctx.params as Record<string, any>;
  const id = params.id;
  try {
    deleteInsight({ db, id: Number(id) });
    ctx.response.status = 204;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { error: error.message };
  }

});

const app = new oak.Application();

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(env);
console.log(`Started server on port ${env.port}`);
