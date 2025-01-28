import { useState } from "react";

function QuestionChat({ fetcher, messages, currentUser }) {
  const [message, setMessage] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!message) return;

    fetcher.submit({ message }, { method: "post", action: "/api/chat" });

    setMessage("");
  }

  return (
    <div className="mt-16 w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white text-center">
          Community Chat
        </h3>
      </div>

      <div className="h-64 overflow-y-auto bg-gray-900 rounded-lg p-4 space-y-4 shadow-inner">
        <div className="flex items-start space-x-4">
          <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center">
            👑
          </div>
          <div className="bg-indigo-600 p-3 rounded-lg shadow-md">
            <p className="text-white">
              Cg, now discuss today&apos;s question with other users!
            </p>
          </div>
        </div>
        {messages &&
          messages.map((message) => {
            if (message.userId === currentUser) {
              return (
                <div
                  className="flex items-start space-x-4 flex-row-reverse"
                  key={message.message}
                >
                  <div className="h-10 w-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {message.username.at(0)}
                  </div>
                  <div className="bg-indigo-600 p-3 rounded-lg shadow-md">
                    <p className="text-white">{message.message}</p>
                  </div>
                </div>
              );
            }

            return (
              <div className="flex items-start space-x-4" key={message.message}>
                <div className="h-10 w-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  {message.username.at(0)}
                  {message.unlockedRewards >= 7 && "👑"}
                </div>
                <div
                  className={`${
                    message.unlockedRewards >= 8
                      ? "bg-pink-500 animate-pulse"
                      : "bg-gray-800"
                  } p-3 rounded-lg shadow-md`}
                >
                  <p className="text-white">{message.message}</p>
                </div>
              </div>
            );
          })}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center space-x-4"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        />
        <button
          type="submit"
          disabled={!message}
          className={`bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ${
            !message && "cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default QuestionChat;
