
import React from 'react';
import { ProjectInfo, ProjectName, Language } from '../types';
import { facilityTranslations, translate } from '../translations';
import { Check, Minus, Sparkles, Coffee, Dumbbell, Gamepad2, ShieldCheck } from 'lucide-react';

interface FacilitiesMatrixProps {
  projects: ProjectInfo[];
  lang: Language;
}


const CATEGORIES = {
  wellness: {
    icon: Dumbbell,
    items: ['Swimming Pool', 'Fitness/Gym', 'Onsen', 'Steam Room', 'Sauna']
  },
  social: {
    icon: Coffee,
    items: ['Co-Working Space', 'Co-Kitchen', 'Sky Lounge/Deck', 'Library', 'Meeting Room']
  },
  entertainment: {
    icon: Gamepad2,
    items: ['Theater/Karaoke', 'Game Room/Arcade', 'Kids Zone']
  },
  services: {
    icon: ShieldCheck,
    items: ['Pet Friendly', 'Laundry Service', 'Shuttle Service']
  }
};

const FacilitiesMatrix: React.FC<FacilitiesMatrixProps> = ({ projects, lang }) => {
  // Helper to check if project has facility
  const hasFacility = (project: ProjectInfo, facility: string) => 
    project.facilities.includes(facility);

  const getProjectColor = (name: ProjectName) => {
    switch (name) {
      case ProjectName.CORALINA: return 'text-rose-500 bg-rose-50 border-rose-100';
      case ProjectName.SERENITY: return 'text-emerald-500 bg-emerald-50 border-emerald-100';
      case ProjectName.SIERRA: return 'text-sky-500 bg-sky-50 border-sky-100';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-bold text-slate-800">
           {lang === 'en' ? 'Comparison Matrix' : 'Матрица сравнения'}
        </h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-white">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">
                {lang === 'en' ? 'Feature' : 'Функция'}
              </th>
              {projects.map(p => (
                <th key={p.name} scope="col" className={`px-6 py-4 text-center text-xs font-bold uppercase tracking-wider ${
                    p.name === ProjectName.CORALINA ? 'text-rose-600' : p.name === ProjectName.SERENITY ? 'text-emerald-600' : 'text-sky-600'
                }`}>
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {(Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>).map(catKey => {
              const category = CATEGORIES[catKey];
              const CategoryIcon = category.icon;
              
              return (
                <React.Fragment key={catKey}>
                  {/* Category Header */}
                  <tr className="bg-slate-50/80 border-t border-slate-200">
                    <td colSpan={projects.length + 1} className="px-6 py-3 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-white rounded border border-slate-200">
                          <CategoryIcon className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        {translate(catKey, lang, {
                          wellness: { en: 'Wellness & Active', ru: 'Велнес и Спорт' },
                          social: { en: 'Social & Work', ru: 'Социум и Работа' },
                          entertainment: { en: 'Entertainment', ru: 'Развлечения' },
                          services: { en: 'Services & Living', ru: 'Сервисы' }
                        })}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Rows */}
                  {category.items.map(facility => (
                    <tr key={facility} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-600 font-medium group-hover:text-slate-900 pl-10 border-l-2 border-transparent group-hover:border-indigo-500">
                        {translate(facility, lang, facilityTranslations)}
                      </td>
                      {projects.map(p => {
                        const active = hasFacility(p, facility);
                        return (
                          <td key={p.name} className="px-6 py-3 whitespace-nowrap text-center">
                            <div className="flex justify-center">
                              {active ? (
                                <div className={`p-1 rounded-full ${getProjectColor(p.name)}`}>
                                  <Check className="w-4 h-4" strokeWidth={3} />
                                </div>
                              ) : (
                                <Minus className="w-4 h-4 text-slate-200" />
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilitiesMatrix;
