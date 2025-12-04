
import React from 'react';
import { AnalysisMode, Language } from '../types';
import { translations } from '../translations';
import { Users, Sparkles, LayoutGrid, Map, FileText } from 'lucide-react';

interface NavigationTabsProps {
  currentMode: AnalysisMode;
  onModeChange: (mode: AnalysisMode) => void;
  lang: Language;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ currentMode, onModeChange, lang }) => {
  const t = translations[lang].sidebar;

  const tabs: { id: AnalysisMode; label: string; icon: React.ElementType }[] = [
    { id: 'audience', label: t.audience, icon: Users },
    { id: 'masterplan', label: t.masterPlan, icon: Map },
    { id: 'units', label: t.unitTypes, icon: LayoutGrid },
    { id: 'facilities', label: t.facilities, icon: Sparkles },
    { id: 'floorplans', label: t.floorPlans, icon: FileText },
  ];

  return (
    <div className="border-b border-slate-200 bg-white px-6 md:px-8 sticky top-0 z-20">
      <nav className="-mb-px flex space-x-6 overflow-x-auto custom-scrollbar" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = currentMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onModeChange(tab.id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-all duration-200
                ${isActive 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }
              `}
            >
              <tab.icon 
                className={`
                  -ml-0.5 mr-2 h-4 w-4
                  ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-500'}
                `} 
              />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationTabs;
