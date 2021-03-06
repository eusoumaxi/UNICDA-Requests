const { Router } = require("express");
const {
  AuthMiddleware,
  RoleMiddleware,
  CacheMiddleware,
  ParseIntMiddleware
} = require("../middlewares");

const { CacheTimeHelper } = require("../helpers");

module.exports = function({ StepController }) {
  const router = Router();

  router.get(
    "",
    [CacheMiddleware(CacheTimeHelper.ONE_HOUR), ParseIntMiddleware],
    StepController.getAllSteps
  );
  router.get("/:id", StepController.getStep);
  router.post(
    "",
    [AuthMiddleware, RoleMiddleware("ADMIN")],
    StepController.createStep
  );
  router.patch(
    "/:id",
    [AuthMiddleware, RoleMiddleware("ADMIN")],
    StepController.updateStep
  );
  router.delete(
    "/:id",
    [AuthMiddleware, RoleMiddleware("ADMIN")],
    StepController.deleteStep
  );
  router.post(
    "/setSteps/:requestId",
    [AuthMiddleware, RoleMiddleware("ADMIN")],
    StepController.setStepToRequest
  );
  router.get(
    "/getSteps/:requestId",
    [AuthMiddleware],
    StepController.getStepsByRequest
  );

  return router;
};
