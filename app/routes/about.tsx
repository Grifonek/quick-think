import GoBack from "~/components/GoBack";
import { Layout } from "~/components/Layout";

function About() {
  return (
    <Layout>
      <GoBack purpose="normal" />

      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg mx-auto mt-20">
        <h1 className="text-4xl font-extrabold text-center text-indigo-500 mb-6">
          About Quick Think
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          <span className="text-indigo-400 font-bold">Quick Think</span> is a
          fun and engaging platform designed to boost your thinking skills and
          reward your creativity. Whether you’re solving challenges, answering
          questions, or sharing your thoughts, every action helps you improve
          and earn points!
        </p>

        <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
          How to Earn Points
        </h2>
        <ul className="text-gray-300 space-y-3 list-disc list-inside">
          <li>
            <span className="text-indigo-500 font-bold">
              Answer Today’s Question:
            </span>{" "}
            Log in daily to answer a thought-provoking question and earn points.
          </li>
          <li>
            <span className="text-indigo-500 font-bold">
              Participate in Challenges:
            </span>{" "}
            Join unique challenges to boost your points and unlock rewards.
          </li>
          <li>
            <span className="text-indigo-500 font-bold">Complete Streaks:</span>{" "}
            Answer questions consistently over days to earn streak bonuses.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-indigo-400 mt-6 mb-4">
          What Are Thinkies?
        </h2>
        <p className="text-gray-300 leading-relaxed">
          <span className="text-indigo-500 font-bold">Thinkies</span> are the
          official currency of Quick Think! You earn Thinkies by being the first
          one solver of daily question. Thinkies can be redeemed for exciting
          rewards such as avatars, badges, premium memberships, and more!
        </p>

        <div className="mt-10 p-6 bg-gray-700 rounded-lg text-center">
          <p className="text-indigo-400 font-semibold text-lg">
            Start your journey today and see how far your thoughts can take you!
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default About;
