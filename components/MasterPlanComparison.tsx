import React from 'react';
import { ProjectInfo, ProjectName, Language } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Maximize2, Users, Trees, Home, PawPrint, Building, ArrowUpCircle } from 'lucide-react';
import { translations, featureCategoryTranslations, translate } from '../translations';

interface MasterPlanComparisonProps {
  projects: ProjectInfo[];
  lang: Language;
}

const MasterPlanComparison: React.FC<MasterPlanComparisonProps> = ({ projects, lang }) => {
  const t = translations[lang].masterPlan;
  
  // Data for Density Chart
  const densityData = projects.map(p => ({
    name: p.name,
    density: p.masterPlan.unitsPerRai,
    greenRatio: p.masterPlan.greenSpaceRatio,
    commonPerUnit: p.masterPlan.commonAreaPerUnit,
    color: p.name === ProjectName.CORALINA ? '#F43F5E' : p.name === ProjectName.SERENITY ? '#10B981' : '#0EA5E9'
  }));

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'paw': return <PawPrint className="w-4 h-4" />;
      case 'arrow-up': return <ArrowUpCircle className="w-4 h-4" />;
      case 'layers': return <Maximize2 className="w-4 h-4" />;
      case 'car': return <Building className="w-4 h-4" />; 
      case 'compass': return <Maximize2 className="w-4 h-4" />; 
      default: return <Home className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Hidden Insights / Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Density Insight */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-amber-600">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">{t.densityTradeOff}</h3>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-4">
              {t.densityInsight('Sierra', '2', 'Coralina')}
            </p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={densityData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={60} tick={{fontSize: 10}} />
                  <Tooltip formatter={(value) => [`${Number(value).toFixed(1)} ${t.unitsPerRai}`, t.densityTradeOff]} />
                  <Bar dataKey="density" name={t.unitsPerRai} radius={[0, 4, 4, 0]}>
                    {densityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Space Insight */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-emerald-600">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Maximize2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">{t.spaceLuxury}</h3>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-4">
              {t.spaceInsight('Coralina', '9.9')}
            </p>
            <div className="space-y-4 pt-2">
              {densityData.map(p => (
                <div key={p.name} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{p.name}</span>
                    <span>{p.commonPerUnit.toFixed(1)} {t.sqmPerUnit}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${(p.commonPerUnit / 10) * 100}%`, backgroundColor: p.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nature Insight */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-sky-600">
            <div className="p-2 bg-sky-50 rounded-lg">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800">{t.greenRatio}</h3>
          </div>
          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-4">
              {t.greenInsight('Sierra', '25.2')}
            </p>
            <div className="grid grid-cols-3 gap-2 mt-6">
              {densityData.map(p => (
                <div key={p.name} className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="w-16 h-16 transform -rotate-90">
                      <circle cx="32" cy="32" r="28" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                      <circle 
                        cx="32" 
                        cy="32" 
                        r="28" 
                        stroke={p.color} 
                        strokeWidth="4" 
                        fill="none" 
                        strokeDasharray={2 * Math.PI * 28} 
                        strokeDashoffset={2 * Math.PI * 28 * (1 - p.greenRatio / 100)} 
                      />
                    </svg>
                    <span className="absolute text-xs font-bold text-slate-700">{p.greenRatio}%</span>
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 mt-1">{p.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Comparison Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">{t.metricsTitle}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-1/4">
                  {lang === 'en' ? 'Metric' : 'Показатель'}
                </th>
                {projects.map(p => (
                  <th key={p.name} scope="col" className={`px-6 py-3 text-left text-xs font-bold uppercase tracking-wider ${p.name === ProjectName.CORALINA ? 'text-rose-600' : p.name === ProjectName.SERENITY ? 'text-emerald-600' : 'text-sky-600'}`}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{t.metrics.landArea}</td>
                {projects.map(p => (
                  <td key={p.name} className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono">
                    {p.landAreaSqm.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{t.metrics.commonArea}</td>
                {projects.map(p => (
                  <td key={p.name} className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono">
                    {p.masterPlan.totalCommonArea.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{t.metrics.totalUnits}</td>
                {projects.map(p => (
                  <td key={p.name} className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono">
                    {p.totalUnits}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{t.metrics.buildings}</td>
                {projects.map(p => (
                  <td key={p.name} className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono">
                    {p.buildings}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Feature Matrix */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">{t.features}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {projects.map(p => (
            <div key={p.name} className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className={`text-lg font-bold ${p.name === 'Coralina' ? 'text-rose-600' : p.name === 'Serenity' ? 'text-emerald-600' : 'text-sky-600'}`}>
                  {p.name}
                </h4>
                <span className="text-xs font-mono text-slate-400">
                  {p.masterPlan.unitsPerRai.toFixed(0)} {t.unitsPerRai}
                </span>
              </div>

              <div className="space-y-4">
                {p.layoutFeatures.map((feat, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="mt-0.5 text-slate-400">
                      {renderIcon(feat.icon)}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-0.5">
                        {translate(feat.category, lang, featureCategoryTranslations)}
                      </div>
                      <div className="text-sm text-slate-600 leading-snug">
                        {feat.description[lang]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h5 className="text-xs font-bold text-slate-500 mb-2">{t.keyZones}</h5>
                <div className="flex flex-wrap gap-2">
                  {p.masterPlan.distinctZones.map((zone, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">
                      {zone[lang]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterPlanComparison;