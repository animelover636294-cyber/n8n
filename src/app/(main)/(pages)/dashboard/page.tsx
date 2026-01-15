'use client'

import React from 'react'
import { Card } from '@/components/ui/card'

const DashboardPage = () => {
  return (
    <div className="w-full h-full bg-gradient-to-br from-background to-muted p-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <p className="text-lg text-muted-foreground">Welcome back! Here's what's happening with your workflows.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Workflows */}
          <Card className="p-6 bg-slate-900 border-slate-700 hover:border-slate-600 transition">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Total Workflows</p>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-xs text-muted-foreground">+0 this month</p>
            </div>
          </Card>

          {/* Active Workflows */}
          <Card className="p-6 bg-slate-900 border-slate-700 hover:border-slate-600 transition">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Active Workflows</p>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-xs text-muted-foreground">Running now</p>
            </div>
          </Card>

          {/* Completed Tasks */}
          <Card className="p-6 bg-slate-900 border-slate-700 hover:border-slate-600 transition">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Completed Tasks</p>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
          </Card>

          {/* Failed Tasks */}
          <Card className="p-6 bg-slate-900 border-slate-700 hover:border-slate-600 transition">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Failed Tasks</p>
              <p className="text-3xl font-bold text-white">0</p>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 bg-slate-900 border-slate-700">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Recent Workflows</h2>
            <div className="space-y-3">
              <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 text-center text-muted-foreground">
                <p>No workflows created yet. Get started by creating your first workflow!</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-slate-900 border-slate-700">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition">
                Create Workflow
              </button>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition">
                View Documentation
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
