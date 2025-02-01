import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import BackHome from "~/components/BackHome";
import { Layout } from "~/components/Layout";
import ShowRewardInfo from "~/components/ShowRewardInfo";
import { requireUserId } from "~/utils/auth.server";
import rewards, { maxPoints } from "~/utils/rewards";
import { queryForUsernameWithUserId } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  const userId = await requireUserId(request);

  const user = await queryForUsernameWithUserId(userId);

  return Response.json({ user });
};

function ThinkPass() {
  const data = useLoaderData<typeof loader>();

  const [userPoints] = useState(data.user.points);
  const [selectedReward, setSelectedReward] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const progressPercentage = (userPoints / maxPoints) * 100;

  // getting the next reward
  const nextReward = rewards.find((reward) => reward.points > userPoints);

  return (
    <Layout>
      <BackHome />

      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg mx-auto mt-20">
        <h1 className="text-4xl font-extrabold text-center text-indigo-500 mb-6">
          Your ThinkPass
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Track your progress and unlock exciting rewards by earning more
          points!
        </p>

        <div className="relative mb-8">
          <div className="w-full bg-gray-700 h-4 rounded-full">
            <div
              className="bg-indigo-500 h-4 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-center text-gray-300 mt-2">
            {userPoints} / {maxPoints} points
          </p>
          <p className="text-center text-gray-300 mt-2 text-xl">
            Next Reward:{" "}
            <span className="font-bold">
              {nextReward?.points === 250 || nextReward?.points === 750
                ? "???"
                : nextReward?.reward}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map((reward, index) => {
            const isNextReward = nextReward?.points === reward.points;
            const isSecretReward =
              reward.points === 250 || reward.points === 750;
            const isUnlocked = userPoints >= reward.points;

            return (
              <button
                key={index}
                className={`p-4 rounded-lg shadow-lg relative ${
                  isUnlocked
                    ? "bg-indigo-500 text-white"
                    : isNextReward
                    ? "bg-indigo-700 text-white animate-pulse border-2 border-yellow-300 shadow-xl"
                    : isSecretReward
                    ? "bg-gradient-to-br from-purple-700 to-pink-600 text-white opacity-80 cursor-not-allowed"
                    : "bg-gray-700 text-gray-300 opacity-50"
                }`}
                onClick={() => {
                  if (isSecretReward && !isUnlocked) return;

                  setIsModalOpen(true);
                  setSelectedReward(reward);
                }}
              >
                {isSecretReward && !isUnlocked && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-pink-400 animate-pulse flex items-center justify-center">
                    ❓
                  </div>
                )}
                {isNextReward && !isSecretReward && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-400 animate-bounce flex items-center justify-center">
                    ✨
                  </div>
                )}
                <h2 className="font-bold text-lg">
                  {reward.points} Points Reward{" "}
                  {isUnlocked && !isSecretReward && "👑"}
                </h2>
                <p>
                  {isUnlocked
                    ? reward.reward
                    : isSecretReward
                    ? "???"
                    : reward.reward}
                </p>
              </button>
            );
          })}
        </div>

        <p className="text-gray-300 text-center text-sm mt-5">
          How to get{" "}
          <Link to="/about" className="hover:underline font-bold">
            points
          </Link>
          ?
        </p>
      </div>

      {isModalOpen && (
        <ShowRewardInfo
          reward={selectedReward}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Layout>
  );
}

export default ThinkPass;
