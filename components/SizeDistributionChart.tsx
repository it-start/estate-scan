import React, { useMemo } from 'react';
import { UnitPlan, ProjectName, Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translations } from '../translations';

interface SizeDistributionChartProps {
  data: UnitPlan[];
  lang: Language;
}

const SizeDistributionChart: React.FC<SizeDistributionChartProps> = ({ data, lang }) => {
  const t = translations[lang];

  const processedData = useMemo(() => {
    const bins = [
      { label: '< 30', min: 0, max: 29.99 },
      { label: '30 - 45', min: 30, max: 45 },
      { label: '45 - 60', min: 45.01, max: 60 },
      { label: '60 - 90', min: 60.01, max: 90 },
      { label: '> 90', min: 90.01, max: 9999 },
    ];

    return bins.map(bin => {
      const getCount = (proj: ProjectName) => {
        return data.filter(d => 
          d.project === proj && 
          d.maxSize >= bin.min && 
          d.maxSize <= bin.max
        ).length;
      };

      return {
        range: bin.label + (lang === 'en' ? ' sqm' : ' м²'),
        [ProjectName.CORALINA]: getCount(ProjectName.CORALINA),
        [ProjectName.SERENITY]: getCount(ProjectName.SERENITY),
        [ProjectName.SIERRA]: getCount(ProjectName.SIERRA),
      };
    });
  }, [data, lang]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">{t.charts.sizeDist}</h3>
        <p className="text-xs text-slate-500">{t.charts.sizeDistSubtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <BarChart
          data={processedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="range" tick={{fontSize: 12}} />
          <YAxis />
          <Tooltip cursor={{fill: '#f1f5f9'}} />
          <Legend />
          {/* Using Stacked bars to show total volume per bucket */}
          <Bar dataKey={ProjectName.CORALINA} stackId="a" fill="#F43F5E" name="Coralina" />
          <Bar dataKey={ProjectName.SERENITY} stackId="a" fill="#10B981" name="Serenity" />
          <Bar dataKey={ProjectName.SIERRA} stackId="a" fill="#0EA5E9" name="Sierra" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SizeDistributionChart;