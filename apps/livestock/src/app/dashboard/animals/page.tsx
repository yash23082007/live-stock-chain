"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export default function AnimalsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // TODO: Fetch animals from tRPC
  const animals: { id: string; tagNumber: string; name: string; species: string }[] = [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Animals</h2>
        <Link
          href="/dashboard/animals/new"
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Plus size={20} />
          Add Animal
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search animals by tag number or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Animals Table */}
      {animals.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No animals yet</h3>
          <p className="text-gray-600 mb-6">Add your first animal to get started tracking livestock</p>
          <Link
            href="/dashboard/animals/new"
            className="inline-flex px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
            Add Your First Animal
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tag</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Species
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Health Score
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {/* TODO: Render animals */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
