import { Cog6ToothIcon } from "@heroicons/react/24/outline";

function AccountSettings({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-16 text-center">
      <div className="flex justify-center text-white mb-10 space-x-5">
        <h1 className="font-extrabold text-4xl">Account Settings</h1>
        <Cog6ToothIcon className="size-12 hover:animate-spin" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {children}

        {/* <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-medium text-gray-300 mb-4">
              Delete Account
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Warning: Deleting your account is irreversible.
            </p>
            <button className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400">
              Delete Account
            </button>
          </div> */}
      </div>
    </div>
  );
}

export default AccountSettings;
