// seed file
// the purpose of this seed file is just to create some testing data
// when i want to seed data, im just gonna run `node seed.js`

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const seed = async () => {
  try {
    await prisma.users.create({
      data: {
        firstName: "alex",
        lastName: "demichieli",
        favoriteSpirit: {
          create: {
            name: "rum",
          },
        },
      },
    });

    await prisma.users.create({
      data: {
        firstName: "courtney",
        lastName: "cho",
        favoriteSpirit: {
          create: {
            name: "tequila",
          },
        },
      },
    });

    await prisma.users.create({
      data: {
        firstName: "shakelvia",
        lastName: "braden",
        favoriteSpirit: {
          create: {
            name: "cognac",
          },
        },
      },
    });

    await prisma.spirit.create({
      data: {
        name: "gin",
      },
    });

    await prisma.spirit.create({
      data: {
        name: "whiskey",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

seed();
