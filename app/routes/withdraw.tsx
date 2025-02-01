import { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/auth.server";
import BackHome from "~/components/BackHome";
import { Layout } from "~/components/Layout";

export const loader: LoaderFunction = async ({ request }) => {
  // ensuring that user is authenticated
  await requireUserId(request);

  return null;
};

function Withdraw() {
  return (
    <Layout>
      <BackHome />
      <div className="text-center mt-24">
        <h1 className="text-4xl font-extrabold text-white mb-6">
          💸 Withdraw Money 💸
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto space-y-8">
          <p className="text-lg text-gray-300 mb-4">
            🚧 This feature is not available at the moment. But don’t worry—when
            our app grows, we plan to let you exchange your hard-earned{" "}
            <span className="text-indigo-400 font-bold">Thinkies</span> into
            real money! 💰
          </p>
          <p className="text-lg text-gray-300 mb-6">
            🙏 Unfortunately, we don’t have the funds to make it happen just
            yet. For now, enjoy racking up those Thinkies 🧠 and keep an eye out
            for updates in the future! 🔮
          </p>
          <div className="flex justify-center">
            <h1 className="text-white text-4xl">✨ Feature Coming Soon! ✨</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Withdraw;
