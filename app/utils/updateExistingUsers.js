import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function updateExistingUsers() {
  // Update all users with default values for streak and lastAnsweredDate
  await prisma.user.updateMany({
    data: {
      unlockedRewards: 0,
    },
  });

  console.log("Updated existing users with default unlockedRewards");

  // Disconnect Prisma client after the operation
  await prisma.$disconnect();
}

// Execute the function
updateExistingUsers().catch((error) => {
  console.error("Error updating users:", error);
  prisma.$disconnect();
});
