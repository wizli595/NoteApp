import listEndpoints from "express-list-endpoints";
import app from "../app";

const routes = listEndpoints(app);

/**
 * @description List all routes
 * @param {Array} routes - Array of routes
 * @returns void
 */
routes.forEach((route) => {
  const methods = route.methods.join("|").padEnd(6, " ");
  const path = route.path.padEnd(30, " ");
  const middlewares = route.middlewares.join(", ") || "None";

  console.log(`${methods} || ${path} || ${middlewares}`);
});
