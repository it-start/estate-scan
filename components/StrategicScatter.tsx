import React from 'react';
import { ProjectInfo, ProjectName, Language } from '../types';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label, ZAxis, Legend } from 'recharts';
import { translations } from '../translations';

interface StrategicScatterProps {
  projects: ProjectInfo[];
  lang: Language;
}

const StrategicScatter: React.FC<StrategicScatterProps> = ({ projects, lang }) => {
  const t = translations[lang];

  const data = projects.map(p => ({
    name: p.name,
    density: p.masterPlan.unitsPerRai,
    luxury: p.masterPlan.commonAreaPerUnit,
    green: p.masterPlan.greenSpaceRatio,
    fill: p.name === ProjectName.CORALINA ? '#F43F5E' : p.name === ProjectName.SERENITY ? '#10B981' : '#0EA5E9'
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">{t.masterPlan.scatterTitle}</h3>
        <p className="text-xs text-slate-500">{t.masterPlan.scatterSubtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" dataKey="density" name={t.masterPlan.axis.density} unit="">
             <Label value={t.masterPlan.axis.density} offset={-10} position="insideBottom" style={{fontSize: 10, fill: '#64748b'}} />
          </XAxis>
          <YAxis type="number" dataKey="luxury" name={t.masterPlan.axis.luxury} unit=" sqm">
             <Label value={t.masterPlan.axis.luxury} angle={-90} position="insideLeft" style={{fontSize: 10, fill: '#64748b'}} />
          </YAxis>
          <ZAxis type="number" dataKey="green" range={[200, 1000]} name={t.masterPlan.greenRatio} unit="%" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          {projects.map((p, idx) => (
             <Scatter key={p.name} name={p.name} data={[data[idx]]} fill={data[idx].fill} shape="circle" />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StrategicScatter;