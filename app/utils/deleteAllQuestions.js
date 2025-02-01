import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function deleteAllQuestions() {
  try {
    // Deleting all questions in the database
    const deletedQuestions = await prisma.question.deleteMany({});
    console.log(`Successfully deleted ${deletedQuestions.count} questions.`);
  } catch (error) {
    console.error("Error deleting questions:", error);
  } finally {
    // Always disconnect Prisma client after the operation
    await prisma.$disconnect();
  }
}

// Run the function
deleteAllQuestions();
