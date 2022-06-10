import { setupWorker, rest } from "msw";
import users from "./users.json";
import groups from "./groups.json";

const checkAccessToken = (accessToken) => {
  return +accessToken + 10 * 1000 < Date.now();
};
const checkRefreshToken = (refreshToken) => {
  return +refreshToken + 24 * 60 * 60 * 1000 < Date.now();
};

const worker = setupWorker(
  rest.get("/api/users", (req, res, ctx) => {
    const token = req.headers.headers.authorization.split(" ")[1];

    if (checkAccessToken(token) || token == "null") {
      return res(ctx.status(401));
    }

    users.map(() => {});
    return res(ctx.delay(2000), ctx.json(users));
  }),

  rest.get("/api/groups", (req, res, ctx) => {
    const token = req.headers.headers.authorization.split(" ")[1];

    if (checkAccessToken(token) || token == "null") {
      return res(ctx.status(401));
    }
    groups.pcGroups.all.map(() => {});
    groups.pcGroups.default.map(() => {});
    groups.userGroups.all.map(() => {});
    groups.userGroups.default.map(() => {});

    return res(ctx.delay(2000), ctx.json(groups));
  }),

  rest.put("/api/user_change_status/:dn", (req, res, ctx) => {
    const token = req.headers.headers.authorization.split(" ")[1];

    if (checkAccessToken(token) || token == "null") {
      return res(ctx.status(401));
    }
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
    const token = req.headers.headers.authorization.split(" ")[1];

    if (checkAccessToken(token) || token == "null") {
      return res(ctx.status(401));
    }

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
    const token = req.headers.headers.authorization.split(" ")[1];

    if (checkAccessToken(token) || token == "null") {
      return res(ctx.status(401));
    }

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

  rest.post("/api/auth/create", (req, res, ctx) => {
    const check = req.body.login == 123 && req.body.password == 123;

    if (check) {
      return res(
        ctx.delay(2000),
        ctx.json({ access: Date.now(), refresh: Date.now() })
      );
    }
    return res(ctx.status(403));
  }),
  rest.post("/api/auth/verify", (req, res, ctx) => {
    return checkAccessToken(req.body.token)
      ? res(ctx.status(403))
      : res(ctx.delay(500), ctx.json({}));
  }),
  rest.post("/api/auth/refresh", (req, res, ctx) => {
    return checkRefreshToken(req.body.refresh)
      ? res(ctx.status(403))
      : res(ctx.delay(500), ctx.json({ access: Date.now() }));
  })
);

worker.start();
