interface Question {
  id: string;
  createdAt: string;
  title: string;
  text: string;
  startDate: string;
  correctAnswer: string;
  firstAnswerId: string;
}

interface QuestionProps {
  question: Question;
  answer: string;
  handleAnswerChange: (value: string) => void;
  handleSubmit: () => void;
}

function Question({
  question,
  answer,
  handleAnswerChange,
  handleSubmit,
}: QuestionProps) {
  return (
    <div>
      <h1>{question.title ? question.title : "No question for today"}</h1>
      <h2>{question.text}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => handleAnswerChange(e.target.value)}
          placeholder="Your answer"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Question;
