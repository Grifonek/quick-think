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
      </div>
    </div>
  );
}

export default AccountSettings;
