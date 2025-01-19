import { Link } from "@remix-run/react";

interface BoardProps {
  boardName: string;
  users: any;
  me: any;
}

function Board({ boardName, users, me }: BoardProps) {
  return (
    <>
      <div className="text-center text-2xl font-bold text-white mb-10">
        {boardName} Leaderboards
      </div>
      <div className="space-y-4">
        {users &&
          users.map((user, i) => (
            <div
              key={user.id}
              className={`${
                user.username === me.username
                  ? "bg-gray-600 animate-pulse hover:animate-none"
                  : "bg-gray-800 hover:bg-gray-600"
              }  p-4 rounded-lg shadow-md flex items-center justify-between text-white`}
            >
              <div
                className={`w-12 text-center font-bold text-indigo-400 ${
                  user.username === me.username && "font-bold text-2xl"
                }`}
              >
                #{i + 1}
              </div>

              <div className="flex-1 text-lg font-medium text-indigo-200 text-center">
                <Link
                  to={`/user/${user.username.toLowerCase()}`}
                  className="hover:underline"
                >
                  {user.username}
                </Link>
              </div>

              <div className="w-32 text-left text-sm text-gray-300">
                Coins:{" "}
                <span className="font-semibold text-indigo-400">
                  {user.coins}
                </span>
              </div>

              <div className="w-32 text-left text-sm text-gray-300">
                Points:{" "}
                <span className="font-semibold text-indigo-400">
                  {user.points}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Board;
