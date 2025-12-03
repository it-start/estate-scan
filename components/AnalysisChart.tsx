import React from 'react';
import { UnitPlan, ProjectName, Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { translations, categoryTranslations, translate } from '../translations';

interface AnalysisChartProps {
  data: UnitPlan[];
  lang: Language;
}

const AnalysisChart: React.FC<AnalysisChartProps> = ({ data, lang }) => {
  const t = translations[lang];

  // Aggregate data for visualization: Average max size per category per project
  const processedData = React.useMemo(() => {
    const categories = Array.from(new Set(data.map(d => d.category)));
    
    return categories.map((cat: string) => {
      const getAvgSize = (proj: ProjectName) => {
        const units = data.filter(d => d.project === proj && d.category === cat);
        if (units.length === 0) return 0;
        const sum = units.reduce((acc, curr) => acc + curr.maxSize, 0);
        return parseFloat((sum / units.length).toFixed(1));
      };

      return {
        category: cat,
        displayCategory: translate(cat, lang, categoryTranslations),
        [ProjectName.CORALINA]: getAvgSize(ProjectName.CORALINA),
        [ProjectName.SERENITY]: getAvgSize(ProjectName.SERENITY),
        [ProjectName.SIERRA]: getAvgSize(ProjectName.SIERRA),
      };
    }).sort((a, b) => (a[ProjectName.SERENITY] || 0) - (b[ProjectName.SERENITY] || 0)); // Sort loosely by size
  }, [data, lang]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
      <h3 className="text-lg font-semibold text-slate-800 mb-6">{t.charts.avgUnitSize}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={processedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="displayCategory" />
          <YAxis />
          <Tooltip cursor={{fill: '#f1f5f9'}} />
          <Legend />
          <Bar dataKey={ProjectName.CORALINA} fill="#F43F5E" name="Coralina" radius={[4, 4, 0, 0]} />
          <Bar dataKey={ProjectName.SERENITY} fill="#10B981" name="Serenity" radius={[4, 4, 0, 0]} />
          <Bar dataKey={ProjectName.SIERRA} fill="#0EA5E9" name="Sierra" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalysisChart;