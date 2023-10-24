const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = router;

// all routes in here are prefixed by /users
router.get("/", async (req, res, next) => {
  try {
    res.send(await prisma.users.findMany());
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await prisma.users.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        favoriteSpiritId: req.body.favoriteSpiritId,
      },
    });

    res.status(201).send(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.users.delete({
      where: {
        id: Number(id),
      },
    });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
