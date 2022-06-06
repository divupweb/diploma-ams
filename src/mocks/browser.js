import { setupWorker, rest } from "msw";
import users from "./users.json";
import groups from "./groups.json";

const worker = setupWorker(
  rest.get("/api/users", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json(users));
  }),

  rest.get("/api/groups", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.json(groups));
  }),
  rest.delete("/api/user_delete/:dn", (req, res, ctx) => {
    const userDnToDrop = req.params.dn;

    users = users.filter((user) => user.dn !== userDnToDrop);

    return res(ctx.delay(1000), ctx.json(users));
  }),
  rest.put("/api/user_change_status/:dn", (req, res, ctx) => {
    const userDnToChange = req.params.dn;

    users = users.map((user) => {
      if (user.dn === userDnToChange) {
        user.isActive = !user.isActive;
      }
      return user;
    });

    return res(ctx.delay(1000), ctx.json(users));
  }),
  rest.post("/api/user_add", (req, res, ctx) => {
    const newUser = {
      dn: Math.random,
      login: req.body.login,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      isActive: true,
      groups: req.body.userGroups,
    };
    users.push(newUser);
    return res(ctx.delay(2000), ctx.json(users));
  })
);

worker.start();
