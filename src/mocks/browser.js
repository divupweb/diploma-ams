import { setupWorker, rest } from "msw";
import users from "./users.json";

const worker = setupWorker(
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json(users));
  })
);

worker.start();
