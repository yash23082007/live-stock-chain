"use client";

import { Plus, Calendar } from "lucide-react";
import Link from "next/link";

export default function HealthPage() {
  // TODO: Fetch upcoming vaccinations and recent health events

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Health Records</h2>
        <Link
          href="/dashboard/health/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Plus size={20} />
          Log Event
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Vaccinations */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Upcoming Vaccinations
          </h3>
          <p className="text-gray-600 text-center py-8">No upcoming vaccinations</p>
        </div>

        {/* Withdrawal Period Animals */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-4">
            Under Withdrawal Period
          </h3>
          <p className="text-yellow-700 text-center py-8">No animals currently under withdrawal</p>
        </div>
      </div>

      {/* Recent Events */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Health Events</h3>
        <p className="text-gray-600 text-center py-12">No health events recorded yet</p>
      </div>
    </div>
  );
}
