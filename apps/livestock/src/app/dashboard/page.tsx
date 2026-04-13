"use client";

import { trpc } from "@/components/providers/TRPCProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const dashboardQuery = trpc.farms.getDashboard.useQuery();

  if (dashboardQuery.isLoading) {
    return (
      <div className="max-w-6xl mx-auto w-full p-8 lg:p-10 space-y-10 animate-pulse">
        <div className="h-8 w-48 bg-gray-200/80 rounded-md mb-2"></div>
        <div className="h-10 w-64 bg-gray-200/80 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white border border-gray-100 rounded-2xl shadow-sm"></div>)}
        </div>
      </div>
    );
  }

  const farm = dashboardQuery.data;

  if (!farm) {
    return (
      <div className="max-w-5xl mx-auto w-full p-8 space-y-12">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">Welcome to LivestockChain</h1>
            <p className="text-lg text-gray-500">Your farm's digital command center.</p>
          </div>
          <Card className="border border-gray-200/60 shadow-sm bg-white/50 backdrop-blur">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                Setup Your Farm
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-6 text-gray-600 text-sm leading-relaxed">Before tracking livestock, you need to register your farm&apos;s details to anchor it on-chain.</p>
              <Button className="bg-gray-900 text-white hover:bg-gray-800 shadow-sm transition-all rounded-lg px-6">
                Register Your Farm →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto w-full p-8 lg:p-10 space-y-10 overflow-y-auto">
      <div className="flex justify-between items-end border-b border-gray-200/60 pb-6">
        <div>
          <p className="text-sm font-medium text-emerald-600 mb-1 uppercase tracking-wider">Dashboard</p>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">{farm.name}</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="shadow-sm rounded-lg hover:border-gray-300">Download Report</Button>
          <Button className="bg-emerald-600 text-white shadow-sm shadow-emerald-500/20 hover:bg-emerald-700 rounded-lg">
            <span className="mr-2">+</span> Add Animal
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow bg-white pb-2 relative overflow-hidden rounded-2xl group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <svg className="w-12 h-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
          </div>
          <CardHeader className="pb-1 pt-5 px-6">
            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Animals</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="text-4xl font-bold text-gray-900 tracking-tight">{farm.animals?.length || 0}</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Active on Farm</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow bg-white pb-2 relative overflow-hidden rounded-2xl group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <CardHeader className="pb-1 pt-5 px-6">
            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Health Score</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-gray-900 tracking-tight">92</div>
              <span className="text-sm font-medium text-gray-500">/ 100</span>
            </div>
            <p className="text-xs text-blue-600 font-medium mt-1">Herd is healthy</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow bg-white pb-2 relative overflow-hidden rounded-2xl group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
             <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <CardHeader className="pb-1 pt-5 px-6">
            <CardTitle className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Under Withdrawal</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="text-4xl font-bold text-gray-900 tracking-tight">0</div>
            <p className="text-xs text-amber-600 font-medium mt-1">Animals restricted from sale</p>
          </CardContent>
        </Card>

        <Card className="border border-emerald-200/80 shadow-sm bg-gradient-to-b from-emerald-50/50 to-white pb-2 relative overflow-hidden rounded-2xl">
          <CardHeader className="pb-1 pt-5 px-6">
            <CardTitle className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">NFT Passports</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-4">
            <div className="text-4xl font-bold text-emerald-700 tracking-tight">0</div>
            <p className="text-xs text-emerald-600 font-medium mt-1">Anchored on Polygon</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              Recent Health Events
            </h3>
            <Button variant="outline" size="sm" className="text-xs h-8">View All</Button>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm divide-y divide-gray-100 overflow-hidden">
            <div className="p-12 text-center text-sm text-gray-500 flex flex-col items-center justify-center">
              <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
              No health events recorded yet.
              <Button variant="outline" className="mt-4 text-xs font-medium bg-gray-50 text-gray-700">Add First Event</Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center p-4">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm uppercase tracking-wide">
              Action Items
            </h3>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6 space-y-4 relative overflow-hidden">
            <div className="flex gap-4 items-start pb-4 border-b border-gray-100">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Add your first animal</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">Begin tracking by registering cattle, sheep, or goats.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start pb-4 border-b border-gray-100">
              <div className="w-2 h-2 mt-2 rounded-full bg-gray-300 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Configure Farm Settings</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-gray-300 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-500">Connect Web3 Wallet</p>
                <p className="text-xs text-gray-400 mt-1 leading-snug">Required for minting NFT Passports.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
