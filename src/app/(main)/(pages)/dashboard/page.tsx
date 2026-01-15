'use client'

export default function DashboardPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-white mb-6">Dashboard</h1>
      <p className="text-gray-300 mb-4">Welcome to your dashboard!</p>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 p-4 rounded">
          <p className="text-gray-400 text-sm">Total Workflows</p>
          <p className="text-white text-2xl font-bold">0</p>
        </div>
        <div className="bg-slate-800 p-4 rounded">
          <p className="text-gray-400 text-sm">Active</p>
          <p className="text-white text-2xl font-bold">0</p>
        </div>
        <div className="bg-slate-800 p-4 rounded">
          <p className="text-gray-400 text-sm">Completed</p>
          <p className="text-white text-2xl font-bold">0</p>
        </div>
        <div className="bg-slate-800 p-4 rounded">
          <p className="text-gray-400 text-sm">Failed</p>
          <p className="text-white text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  )
}
