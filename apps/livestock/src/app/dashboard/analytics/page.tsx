"use client";

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Herd Composition */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Herd Composition</h3>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>Add animals to see herd composition</p>
          </div>
        </div>

        {/* Health Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Trends (30 days)</h3>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>No health data available</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-8">
        {/* Weight Trends */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Trends</h3>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>No weight data available</p>
          </div>
        </div>

        {/* Mortality Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mortality Rate</h3>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <p>No mortality data</p>
          </div>
        </div>
      </div>
    </div>
  );
}
