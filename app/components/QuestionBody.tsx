import { useState } from "react";
import Question from "./Question";
import QuestionAllAnswers from "./QuestionAllAnswers";
import QuestionAnswerModalWindow from "./QuestionAnswerModalWindow";
import QuestionTimeRemaining from "./QuestionTimeRemaining";

function QuestionBody({ data, fetcher }) {
  const [answer, setAnswer] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  function handleAnswerChange(value: string) {
    setAnswer(value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetcher.submit({ answer }, { method: "post", action: "/api/answers" });

    if (!answer) return;

    setIsSubmitting(true);
    handleModalOpen();
  }

  return (
    <div className="text-center mt-10">
      <h1 className="font-bold text-4xl mb-10 text-white">
        Today&apos;s question
      </h1>

      {data.noQuestion ? (
        <p className="text-gray-400 text-lg">
          No question for today... Come back tomorrow!
        </p>
      ) : data.hasAlreadyAnswered ? (
        <QuestionTimeRemaining />
      ) : (
        <div className="mt-6">
          <Question
            question={data.question}
            answer={answer}
            handleAnswerChange={handleAnswerChange}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      )}

      {data.question?.answers?.length > 0 && data.hasAlreadyAnswered && (
        <QuestionAllAnswers data={data} />
      )}

      {fetcher.data?.success && isModalOpen && (
        <QuestionAnswerModalWindow handleModalClose={handleModalClose} />
      )}

      {fetcher.data?.error && (
        <p className="text-red-500 text-lg mt-4">{fetcher.data.error}</p>
      )}
    </div>
  );
}

export default QuestionBody;
