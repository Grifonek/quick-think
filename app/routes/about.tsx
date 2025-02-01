import { Link } from "@remix-run/react";
import GoBack from "~/components/GoBack";
import { Layout } from "~/components/Layout";

function About() {
  return (
    <Layout>
      <GoBack purpose="normal" />

      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg mx-auto mt-5">
        {/* Header Section */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-500 mb-6">
          About Quick Think
        </h1>

        {/* Mission Statement */}
        <div className="text-center mb-10">
          <p className="text-gray-300 text-lg leading-relaxed">
            At <span className="text-indigo-400 font-bold">Quick Think</span>,
            we believe that every person has the potential to think creatively
            and solve problems in unique ways. Our mission is to create an
            engaging platform that rewards your curiosity, sharpens your mind,
            and makes learning a fun experience.
          </p>
        </div>

        {/* How It Works */}
        <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
          How to Earn Points
        </h2>
        <ul className="text-gray-300 space-y-3 list-disc list-inside mb-8">
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
          <li>
            <span className="text-indigo-500 font-bold">Share Knowledge:</span>{" "}
            Collaborate with the community by submitting your own questions or
            tips and earn recognition.
          </li>
        </ul>

        {/* Thinkies Section */}
        <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
          What Are Thinkies?
        </h2>
        <p className="text-gray-300 leading-relaxed mb-8">
          <span className="text-indigo-500 font-bold">Thinkies</span> are the
          official currency of Quick Think! You earn Thinkies by being the first
          to solve the daily question. Thinkies will be able to redeem for real
          money in the future, so stay tuned! Your efforts are always rewarded!
        </p>

        {/* Why Choose Quick Think */}
        <h2 className="text-2xl font-semibold text-indigo-400 mb-4">
          Why Choose Quick Think?
        </h2>
        <ul className="text-gray-300 space-y-3 list-disc list-inside mb-8">
          <li>
            <span className="text-indigo-500 font-bold">Boost Creativity:</span>{" "}
            Answer unique questions daily to stimulate your thinking and
            problem-solving skills.
          </li>
          <li>
            <span className="text-indigo-500 font-bold">
              Friendly Community:
            </span>{" "}
            Join a supportive and curious community where everyone loves to
            learn and grow.
          </li>
          <li>
            <span className="text-indigo-500 font-bold">Exciting Rewards:</span>{" "}
            Earn points and Thinkies to unlock exclusive perks and showcase your
            progress.
          </li>
          <li>
            <span className="text-indigo-500 font-bold">Track Progress:</span>{" "}
            Monitor your streaks, rankings, and achievements as you level up.
          </li>
        </ul>

        {/* Call to Action */}
        <div className="mt-10 p-6 bg-gray-700 rounded-lg text-center">
          <p className="text-indigo-400 font-semibold text-lg mb-4">
            Ready to think smarter and achieve more?
          </p>
          <Link
            to="/home"
            className="bg-indigo-500 text-white py-2 px-6 rounded-lg text-lg hover:bg-indigo-600 transition duration-200"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default About;
