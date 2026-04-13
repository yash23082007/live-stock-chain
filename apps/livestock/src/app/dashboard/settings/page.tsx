"use client";

import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { data: session } = useSession();

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Settings</h2>

      <div className="max-w-2xl bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={session?.user?.name || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={session?.user?.email || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              value={session?.user?.role || ""}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>

        <button className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          Update Profile
        </button>
      </div>

      {/* Blockchain Connection */}
      <div className="max-w-2xl bg-white rounded-xl border border-gray-200 p-6 mt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Blockchain</h3>
        <p className="text-gray-600 mb-4">
          Connect your wallet to enable NFT minting and on-chain record anchoring.
        </p>
        <button className="px-6 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50">
          Connect Wallet
        </button>
      </div>
    </div>
  );
}
