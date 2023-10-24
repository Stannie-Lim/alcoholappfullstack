const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = router;

// all routes in here are prefixed by /spirits
router.get("/", async (req, res, next) => {
  try {
    res.send(await prisma.spirit.findMany());
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    res.send(
      await prisma.spirit.findUnique({
        where: {
          id: Number(id),
        },
      })
    );
  } catch (error) {
    next(error);
  }
});
