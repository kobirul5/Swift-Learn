

export default function DashboardPage() {
   
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-dark-900">Dashboard Overview</h2>
      
      {/* Stats Cards */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Progress */}
        <div className="lg:col-span-2">
          {/* <CourseProgress /> */}
        </div>
        
        {/* Recent Activity */}
        <div className="lg:col-span-1">
        </div>
      </div>
    </div>
  );
}