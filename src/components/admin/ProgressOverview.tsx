'use client';

import { BarChart3 } from 'lucide-react';
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

export default function ProgressOverview({ stats }: { stats?: any }) {
  const categoryData = stats?.categoryStats?.map((s: any) => s.count) || [320, 245, 180, 210, 135];
  const categoryLabels = stats?.categoryStats?.map((s: any) => s._id) || ['Web Dev', 'React/Next', 'UI/UX', 'Python', 'Mobile'];

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-primary-700">
        <BarChart3 className="h-6 w-6" />
        Student Progress Overview
      </h2>

      <div className="h-72 rounded-xl mb-6 overflow-hidden">
        <ReactApexChart
          type="bar"
          height="100%"
          options={{
            chart: { type: 'bar', toolbar: { show: false }, fontFamily: 'Inter, sans-serif' },
            plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
            dataLabels: { enabled: false },
            xaxis: {
              categories: categoryLabels,
              labels: { style: { colors: '#6b7280', fontSize: '12px' } },
            },
            yaxis: { title: { text: 'Students' }, labels: { style: { colors: '#6b7280' } } },
            fill: { colors: ['#7f22fe'] },
            tooltip: { y: { formatter: (val: number) => `${val} students` } },
            grid: { borderColor: '#e5e7eb' },
          }}
          series={[{ name: 'Number of Courses', data: categoryData }]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-primary-50 rounded-xl">
          <div className="h-32">
            <ReactApexChart
              type="donut"
              height="100%"
              options={{
                chart: { type: 'donut' },
                labels: ['Completed', 'In Progress', 'Not Started'],
                colors: ['#7f22fe', '#c4b4ff', '#ede9fe'],
                legend: { show: false },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        total: { show: true, label: '71%', formatter: () => '71%' },
                      },
                    },
                  },
                },
                dataLabels: { enabled: false },
              }}
              series={[71, 18, 11]}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Avg. Completion Rate</p>
        </div>

        <div className="p-4 bg-primary-50 rounded-xl flex flex-col justify-center">
          <p className="text-3xl font-bold text-primary-600">4.9/5</p>
          <p className="text-sm text-gray-600 mt-1">Avg. Rating</p>
        </div>

        <div className="p-4 bg-primary-50 rounded-xl flex flex-col justify-center">
          <p className="text-3xl font-bold text-primary-600">92%</p>
          <p className="text-sm text-gray-600 mt-1">Satisfaction</p>
        </div>
      </div>
    </div>
  );
}