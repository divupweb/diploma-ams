import { setupWorker, rest } from "msw";
import users from "./users.json";

const worker = setupWorker(
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json(users));
  }),
  rest.delete("/api/user_delete:dn", (req, res, ctx) => {
    const userDnToDrop = req.params.dn.slice(1);

    users = users.filter((user) => user.dn !== userDnToDrop);

    return res(ctx.delay(1000), ctx.json(users));
  })
);

worker.start();
