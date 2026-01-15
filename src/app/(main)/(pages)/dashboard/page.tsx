'use client'

import React from 'react'

const DashboardPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 p-8">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-lg text-gray-300">Welcome back! Here's what's happening with your workflows.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Workflows */}
          <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-400">Total Workflows</p>
              <p className="text-4xl font-bold text-white">0</p>
              <p className="text-xs text-gray-400">+0 this month</p>
            </div>
          </div>

          {/* Active Workflows */}
          <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-400">Active Workflows</p>
              <p className="text-4xl font-bold text-white">0</p>
              <p className="text-xs text-gray-400">Running now</p>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-400">Completed Tasks</p>
              <p className="text-4xl font-bold text-white">0</p>
              <p className="text-xs text-gray-400">This week</p>
            </div>
          </div>

          {/* Failed Tasks */}
          <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-400">Failed Tasks</p>
              <p className="text-4xl font-bold text-white">0</p>
              <p className="text-xs text-gray-400">Requires attention</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Recent Workflows</h2>
            <div className="space-y-3">
              <div className="p-4 bg-slate-700 rounded-lg border border-slate-600 text-center text-gray-300">
                <p>No workflows created yet. Get started by creating your first workflow!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-slate-800 border border-slate-700 rounded-lg">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
            <div className="flex gap-4 flex-wrap">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-600/50">
                Create Workflow
              </button>
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
