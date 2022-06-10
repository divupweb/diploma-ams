import { setupWorker, rest } from "msw";
import users from "./users.json";
import groups from "./groups.json";

const worker = setupWorker(
  rest.get("/api/users", (req, res, ctx) => {
    users.map(() => {});
    return res(ctx.delay(2000), ctx.json(users));
  }),

  rest.get("/api/groups", (req, res, ctx) => {
    groups.pcGroups.all.map(() => {});
    groups.pcGroups.default.map(() => {});
    groups.userGroups.all.map(() => {});
    groups.userGroups.default.map(() => {});

    return res(ctx.delay(2000), ctx.json(groups));
  }),

  rest.put("/api/user_change_status/:dn", (req, res, ctx) => {
    const userDnToChange = req.params.dn;
    let flag = false;

    users = users.map((user) => {
      if (user.dn === userDnToChange) {
        user.isActive = !user.isActive;
        flag = true;
      }
      return user;
    });

    return flag ? res(ctx.delay(1000), ctx.json(users)) : null;
  }),

  rest.delete("/api/user_delete/:dn", (req, res, ctx) => {
    const userDnToDrop = req.params.dn;
    let flag = false;
    users = users.filter((user) => {
      if (user.dn !== userDnToDrop) return user;
      else {
        flag = true;
      }
    });

    return flag ? res(ctx.delay(1000), ctx.json(users)) : null;
  }),

  rest.post("/api/user_add", (req, res, ctx) => {
    const newUser = {
      dn: "" + Math.random(),
      login: req.body.login,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      isActive: true,
      groups: req.body.userGroups,
    };
    users.push(newUser);
    users.map(() => {});
    return res(ctx.delay(2000), ctx.json(users));
  }),

  rest.post("/api/auth", (req, res, ctx) => {
    const response = req.body.login == 123 && req.body.password == 123;
    return res(ctx.delay(1000), ctx.json(response));
  })
);

worker.start();
