

import React from 'react';
import { UnitPlan, ProjectName, Language } from '../types';
import { translations, categoryTranslations, translate } from '../translations';
import { useFilters } from '../contexts/FilterContext';

interface UnitTableProps {
  data: UnitPlan[];
  lang: Language;
}

const UnitTable: React.FC<UnitTableProps> = ({ data, lang }) => {
  const t = translations[lang].table;
  const { highlightedCategory, setHighlightedCategory } = useFilters();

  const getBadgeColor = (project: ProjectName) => {
    switch (project) {
      case ProjectName.CORALINA: return 'bg-rose-100 text-rose-800 border-rose-200';
      case ProjectName.SERENITY: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case ProjectName.SIERRA: return 'bg-sky-100 text-sky-800 border-sky-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">{t.title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.project}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.unitName}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.code}</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">{t.category}</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">{t.size}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((unit) => {
              const isHighlighted = highlightedCategory === unit.name;
              return (
                <tr 
                  key={unit.id} 
                  className={`transition-colors cursor-pointer ${isHighlighted ? 'bg-indigo-50 border-l-4 border-l-indigo-500' : 'hover:bg-slate-50'}`}
                  onMouseEnter={() => setHighlightedCategory(unit.name)}
                  onMouseLeave={() => setHighlightedCategory(null)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getBadgeColor(unit.project)}`}>
                      {unit.project}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isHighlighted ? 'text-indigo-700' : 'text-slate-900'}`}>{unit.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">{unit.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {translate(unit.category, lang, categoryTranslations)} - {unit.subCategory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 text-right font-mono">
                    {unit.minSize === unit.maxSize 
                      ? unit.minSize.toFixed(2)
                      : `${unit.minSize} - ${unit.maxSize}`
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitTable;