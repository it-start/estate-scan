import React, { useMemo } from 'react';
import { ProjectName, Language } from '../types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { translations, facilityTranslations, categoryTranslations, translate } from '../translations';

interface SetAnalysisProps {
  title: string;
  dataSets: Record<ProjectName, string[]>;
  lang: Language;
  mode: 'facilities' | 'units' | 'masterplan';
}

const SetAnalysis: React.FC<SetAnalysisProps> = ({ dataSets, lang, mode }) => {
  const t = translations[lang].setAnalysis;
  
  const analysis = useMemo(() => {
    const coralinaSet = new Set(dataSets[ProjectName.CORALINA]);
    const serenitySet = new Set(dataSets[ProjectName.SERENITY]);
    const sierraSet = new Set(dataSets[ProjectName.SIERRA]);

    const allItems = new Set([...coralinaSet, ...serenitySet, ...sierraSet]);

    // Intersection of ALL three
    const intersection = [...allItems].filter(x => 
      coralinaSet.has(x) && serenitySet.has(x) && sierraSet.has(x)
    );

    // Pairwise Intersections
    const coralinaSerenity = [...allItems].filter(x => coralinaSet.has(x) && serenitySet.has(x) && !sierraSet.has(x));
    const serenitySierra = [...allItems].filter(x => serenitySet.has(x) && sierraSet.has(x) && !coralinaSet.has(x));
    const coralinaSierra = [...allItems].filter(x => coralinaSet.has(x) && sierraSet.has(x) && !serenitySet.has(x));
    
    // Unique sets
    const uniqueCoralina = [...coralinaSet].filter(x => !serenitySet.has(x) && !sierraSet.has(x));
    const uniqueSerenity = [...serenitySet].filter(x => !coralinaSet.has(x) && !sierraSet.has(x));
    const uniqueSierra = [...sierraSet].filter(x => !coralinaSet.has(x) && !serenitySet.has(x));

    return {
      unionSize: allItems.size,
      intersection,
      coralinaSerenity,
      serenitySierra,
      coralinaSierra,
      uniqueCoralina,
      uniqueSerenity,
      uniqueSierra,
      counts: [
        { name: t.commonAll3, value: intersection.length, color: '#4F46E5' }, // Indigo
        { name: t.coralinaSerenity, value: coralinaSerenity.length, color: '#FCD34D' }, // Amber
        { name: t.serenitySierra, value: serenitySierra.length, color: '#34D399' }, // Emerald
        { name: t.coralinaSierra, value: coralinaSierra.length, color: '#F472B6' }, // Pink
        { name: t.coralinaOnly, value: uniqueCoralina.length, color: '#F43F5E' }, // Rose
        { name: t.serenityOnly, value: uniqueSerenity.length, color: '#10B981' }, // Green
        { name: t.sierraOnly, value: uniqueSierra.length, color: '#0EA5E9' }, // Sky
      ]
    };
  }, [dataSets, t]);

  const renderItem = (item: string) => {
    const mapping = mode === 'facilities' ? facilityTranslations : categoryTranslations;
    return translate(item, lang, mapping);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Visual Representation */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{t.distribution}</h3>
        <div className="h-64 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analysis.counts.filter(c => c.value > 0)}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {analysis.counts.filter(c => c.value > 0).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Textual Set Operations */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-y-auto max-h-[350px] custom-scrollbar pr-2">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{t.setOperations}</h3>
        
        <div className="space-y-4">
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <h4 className="text-xs font-bold text-indigo-900 uppercase mb-1 flex justify-between">
              <span>{t.intersection}</span>
              <span className="bg-indigo-200 text-indigo-800 px-2 rounded-full text-[10px]">{analysis.intersection.length}</span>
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {analysis.intersection.length > 0 ? (
                analysis.intersection.map(t => (
                  <span key={t} className="px-2 py-1 bg-white text-indigo-600 text-xs rounded border border-indigo-200 shadow-sm">{renderItem(t)}</span>
                ))
              ) : (
                <span className="text-xs text-indigo-500 italic">{t.noMatch}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
             <div className="p-2 bg-amber-50 rounded border border-amber-100">
                <h4 className="text-[10px] font-bold text-amber-900 uppercase mb-1">Coralina & Serenity</h4>
                <div className="flex flex-wrap gap-1">
                   {analysis.coralinaSerenity.map(t => <span key={t} className="px-1.5 py-0.5 bg-white text-amber-700 text-[10px] rounded border border-amber-200">{renderItem(t)}</span>)}
                </div>
             </div>
             <div className="p-2 bg-pink-50 rounded border border-pink-100">
                <h4 className="text-[10px] font-bold text-pink-900 uppercase mb-1">Coralina & Sierra</h4>
                <div className="flex flex-wrap gap-1">
                   {analysis.coralinaSierra.map(t => <span key={t} className="px-1.5 py-0.5 bg-white text-pink-700 text-[10px] rounded border border-pink-200">{renderItem(t)}</span>)}
                </div>
             </div>
             <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
                <h4 className="text-[10px] font-bold text-emerald-900 uppercase mb-1">Serenity & Sierra</h4>
                <div className="flex flex-wrap gap-1">
                   {analysis.serenitySierra.map(t => <span key={t} className="px-1.5 py-0.5 bg-white text-emerald-700 text-[10px] rounded border border-emerald-200">{renderItem(t)}</span>)}
                </div>
             </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
             <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">{t.uniqueOfferings}</h4>
             <div className="grid grid-cols-3 gap-3">
               <div>
                  <div className="text-xs font-medium text-rose-600 mb-1">Coralina</div>
                  <div className="flex flex-col gap-1">
                     {analysis.uniqueCoralina.map(t => <span key={t} className="text-[10px] text-slate-600 truncate" title={t}>• {renderItem(t)}</span>)}
                  </div>
               </div>
               <div>
                  <div className="text-xs font-medium text-emerald-600 mb-1">Serenity</div>
                  <div className="flex flex-col gap-1">
                     {analysis.uniqueSerenity.map(t => <span key={t} className="text-[10px] text-slate-600 truncate" title={t}>• {renderItem(t)}</span>)}
                  </div>
               </div>
               <div>
                  <div className="text-xs font-medium text-sky-600 mb-1">Sierra</div>
                  <div className="flex flex-col gap-1">
                     {analysis.uniqueSierra.map(t => <span key={t} className="text-[10px] text-slate-600 truncate" title={t}>• {renderItem(t)}</span>)}
                  </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SetAnalysis;