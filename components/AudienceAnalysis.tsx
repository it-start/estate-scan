import React, { useMemo } from 'react';
import { ProjectInfo, ProjectName, Language, UnitPlan } from '../types';
import { translations } from '../translations';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts';
import { TrendingUp, Heart, Briefcase, Palmtree, Info } from 'lucide-react';

interface AudienceAnalysisProps {
  projects: ProjectInfo[];
  allUnits: UnitPlan[];
  lang: Language;
}

const AudienceAnalysis: React.FC<AudienceAnalysisProps> = ({ projects, allUnits, lang }) => {
  const t = translations[lang].audience;

  // --- 1. Scoring & Reasoning Engine ---
  const analysisData = useMemo(() => {
    return projects.map(p => {
      const pUnits = allUnits.filter(u => u.project === p.name);
      const totalUnits = pUnits.length || 1;
      
      // -- Metric Helpers --
      const hasFacility = (terms: string[]) => terms.some(term => p.facilities.some(f => f.toLowerCase().includes(term.toLowerCase())));
      
      const smallUnits = pUnits.filter(u => u.maxSize < 35).length; // Stricter definition of "Compact"
      const largeUnits = pUnits.filter(u => u.maxSize > 55).length; // Stricter definition of "Family Sized"
      const smallRatio = smallUnits / totalUnits;
      const largeRatio = largeUnits / totalUnits;

      const reasons: Record<string, string[]> = {
        investor: [],
        family: [],
        nomad: [],
        retiree: []
      };

      // Helper to push localized reasons
      const addReason = (key: string, en: string, ru: string) => {
        reasons[key].push(lang === 'en' ? en : ru);
      };

      // -- Persona: INVESTOR --
      // Focus: Yield, Occupancy, Low Maintenance, Tourist Appeal
      let investorScore = 0;
      
      // Density: Investors like efficient land use, but extreme density might lower premium.
      if (p.masterPlan.unitsPerRai > 80) {
        investorScore += 30;
        addReason('investor', 'High unit density maximizes yield potential', 'Высокая плотность максимизирует доходность');
      } else if (p.masterPlan.unitsPerRai > 50) {
        investorScore += 20;
      }

      // Unit Mix: High volume of studios/1-beds is ideal for churn.
      if (smallRatio > 0.6) {
        investorScore += 30;
        addReason('investor', 'Inventory optimized for short-term rental', 'Инвентарь оптимизирован под краткосрочную аренду');
      } else {
        investorScore += (smallRatio * 40);
      }

      // Tourist/Service Amenities
      if (hasFacility(['shuttle'])) {
        investorScore += 15;
        addReason('investor', 'Shuttle Service (Vital for beach tourists)', 'Трансфер (важно для туристов)');
      }
      if (hasFacility(['laundry'])) {
        investorScore += 10;
        addReason('investor', 'On-site Laundry Service', 'Прачечная на территории');
      }
      if (p.masterPlan.commonAreaPerUnit < 5) {
        investorScore += 15;
        addReason('investor', 'Low common area maintenance cost', 'Низкие расходы на содержание общих зон');
      }
      
      investorScore = Math.min(100, Math.round(investorScore)); 

      // -- Persona: FAMILY --
      // Focus: Space, Safety, Activities, 2Bed+ Availability
      let familyScore = 0;
      
      // Facilities
      if (hasFacility(['kid', 'game', 'playground'])) {
        familyScore += 25;
        addReason('family', 'Dedicated Kids Zone / Playground', 'Детская зона / Игровая площадка');
      }
      if (hasFacility(['theater', 'cinema'])) {
        familyScore += 10;
        addReason('family', 'Family Theater / Entertainment', 'Семейный кинотеатр / Развлечения');
      }
      if (hasFacility(['lagoon', 'pool'])) {
        // Distinguish massive lagoons from standard pools
        if (p.layoutFeatures.some(f => f.description.en.includes('lagoon') || f.description.en.includes('Lagoon'))) {
            familyScore += 15;
            addReason('family', 'Resort-style Lagoon (Safe for kids)', 'Бассейн-лагуна (безопасно для детей)');
        } else {
            familyScore += 5;
        }
      }

      // Unit Mix
      if (largeRatio > 0.2) {
        familyScore += 30; 
        addReason('family', 'Strong inventory of 2-Bedroom+ units', 'Большой выбор 2-спальных+ юнитов');
      } else if (largeRatio > 0.1) {
        familyScore += 15;
      }

      // Green Space
      if (p.masterPlan.greenSpaceRatio > 20) {
        familyScore += 20;
        addReason('family', 'Expansive green space (>20%)', 'Обширное озеленение (>20%)');
      }

      familyScore = Math.min(100, Math.round(familyScore));

      // -- Persona: NOMAD --
      // Focus: Work infrastructure, Socializing, Location, Convenience
      let nomadScore = 0;
      
      // Work
      if (hasFacility(['coworking', 'co-working', 'meeting'])) {
        nomadScore += 35;
        addReason('nomad', 'Dedicated Co-working / Meeting Rooms', 'Коворкинг и переговорные');
      }
      
      // Social / Chill
      if (hasFacility(['sky', 'lounge', 'bar'])) {
        nomadScore += 15;
        addReason('nomad', 'Sky Lounge / Social Areas', 'Скай-лаунж / Зоны для общения');
      }
      if (hasFacility(['game', 'arcade'])) {
        nomadScore += 10;
        addReason('nomad', 'Game Room for downtime', 'Игровая комната для отдыха');
      }
      
      // Wellness (Post-work)
      if (hasFacility(['gym', 'fitness'])) nomadScore += 15;
      
      // Location / "Vibe"
      if (p.name === ProjectName.SIERRA) {
        nomadScore += 25; 
        addReason('nomad', 'Boat Avenue Location (Lifestyle Hub)', 'Локация Boat Avenue (Центр жизни)');
      } else if (p.name === ProjectName.CORALINA) {
         nomadScore += 10; // Kamala is decent for nomads
         addReason('nomad', 'Kamala: Balance of beach & town', 'Камала: Баланс пляжа и города');
      }

      nomadScore = Math.min(100, Math.round(nomadScore));

      // -- Persona: RETIREE / WELLNESS --
      // Focus: Peace, Accessibility, Health, Low Density
      let retireeScore = 0;
      
      // Wellness Facilities
      if (hasFacility(['onsen', 'spa', 'steam', 'sauna'])) {
        retireeScore += 30;
        addReason('retiree', 'Advanced Wellness (Onsen/Sauna)', 'Продвинутый велнес (Онсэн/Сауна)');
      }
      
      // Quiet & Intellectual
      if (hasFacility(['library', 'reading'])) {
        retireeScore += 15;
        addReason('retiree', 'Library / Reading Zones', 'Библиотека / Зоны для чтения');
      }
      if (p.masterPlan.distinctZones.some(z => z.en.toLowerCase().includes('quiet'))) {
        retireeScore += 15;
        addReason('retiree', 'Designated Quiet Zones', 'Выделенные тихие зоны');
      }

      // Density (Crucial for retirees)
      if (p.masterPlan.unitsPerRai < 55) {
        retireeScore += 25;
        addReason('retiree', 'Low density (<55 units/rai)', 'Низкая плотность (<55 юнитов/рай)');
      } else if (p.masterPlan.unitsPerRai > 90) {
         retireeScore -= 10; // Penalize high density
      }

      // Nature
      retireeScore += Math.min(25, p.masterPlan.greenSpaceRatio * 1.5);

      retireeScore = Math.max(0, Math.min(100, Math.round(retireeScore)));

      return {
        name: p.name,
        investor: investorScore,
        family: familyScore,
        nomad: nomadScore,
        retiree: retireeScore,
        reasons,
        // For Scatter
        invPotential: investorScore,
        livability: Math.round((familyScore + retireeScore) / 2), 
        color: p.name === ProjectName.CORALINA ? '#F43F5E' : p.name === ProjectName.SERENITY ? '#10B981' : '#0EA5E9'
      };
    });
  }, [projects, allUnits, lang]);

  // --- 2. Custom Tooltip for Scatter Chart ---
  const CustomScatterTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-slate-200 text-xs max-w-[250px] z-50">
          <p className="font-bold text-sm mb-2" style={{ color: data.color }}>{data.name}</p>
          
          <div className="mb-3">
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>{t.quadrant.xAxis}:</span>
              <span>{data.invPotential}%</span>
            </div>
            <ul className="list-disc list-inside text-slate-500 space-y-0.5">
              {data.reasons.investor.slice(0, 2).map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1">
              <span>{t.quadrant.yAxis}:</span>
              <span>{data.livability}%</span>
            </div>
            <ul className="list-disc list-inside text-slate-500 space-y-0.5">
              {/* Combine Family/Retiree reasons for livability context */}
              {[...data.reasons.family, ...data.reasons.retiree].slice(0, 2).map((r: string, i: number) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">{t.title}</h2>
        <p className="text-slate-500">{t.subtitle}</p>
      </div>

      {/* 1. Persona Heatmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { key: 'investor', label: t.personas.investor, icon: TrendingUp, bg: 'bg-blue-50', text: 'text-blue-700' },
          { key: 'nomad', label: t.personas.nomad, icon: Briefcase, bg: 'bg-purple-50', text: 'text-purple-700' },
          { key: 'family', label: t.personas.family, icon: Heart, bg: 'bg-rose-50', text: 'text-rose-700' },
          { key: 'retiree', label: t.personas.retiree, icon: Palmtree, bg: 'bg-teal-50', text: 'text-teal-700' },
        ].map((persona) => (
          <div key={persona.key} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm relative overflow-visible">
            <div className={`flex items-center gap-2 mb-3 ${persona.text}`}>
              <persona.icon className="w-5 h-5" />
              <span className="font-bold">{persona.label}</span>
            </div>
            <div className="space-y-4">
              {analysisData.map(s => (
                <div key={s.name} className="space-y-1 group relative">
                  <div className="flex justify-between text-xs font-medium cursor-help">
                    <span className="text-slate-600 border-b border-dotted border-slate-300 group-hover:border-slate-500">{s.name}</span>
                    <span className="text-slate-900">{(s as any)[persona.key]}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${s.color === '#F43F5E' ? 'bg-rose-500' : s.color === '#10B981' ? 'bg-emerald-500' : 'bg-sky-500'}`}
                      style={{ width: `${(s as any)[persona.key]}%` }}
                    />
                  </div>

                  {/* HTML/CSS Tooltip (Hover Card) */}
                  <div className="absolute left-0 bottom-full mb-2 w-48 p-3 bg-slate-800 text-white text-[10px] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                    <div className="font-bold mb-1 border-b border-slate-600 pb-1">{s.name} - {persona.label}</div>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {(s.reasons as any)[persona.key].length > 0 ? (
                        (s.reasons as any)[persona.key].map((r: string, i: number) => (
                          <li key={i}>{r}</li>
                        ))
                      ) : (
                         <li>{lang === 'en' ? 'Base layout score' : 'Базовая оценка планировки'}</li>
                      )}
                    </ul>
                    {/* Arrow */}
                    <div className="absolute top-full left-4 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Yield vs Livability Matrix (Quadrant) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-[500px]">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800">{t.quadrant.title}</h3>
          <p className="text-xs text-slate-500">{t.quadrant.subtitle}</p>
        </div>
        <ResponsiveContainer width="100%" height="85%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis type="number" dataKey="invPotential" name="Investment" domain={[0, 100]} label={{ value: t.quadrant.xAxis, position: 'bottom', offset: 0, fontSize: 12 }} />
            <YAxis type="number" dataKey="livability" name="Livability" domain={[0, 100]} label={{ value: t.quadrant.yAxis, angle: -90, position: 'insideLeft', fontSize: 12 }} />
            
            {/* Quadrant Lines */}
            <ReferenceLine x={50} stroke="#cbd5e1" strokeDasharray="3 3" />
            <ReferenceLine y={50} stroke="#cbd5e1" strokeDasharray="3 3" />

            {/* Quadrant Labels */}
            <Label value={t.quadrant.quadrants.q3} position="insideTopLeft" offset={20} style={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
            <Label value={t.quadrant.quadrants.q2} position="insideTopRight" offset={20} style={{fill: '#10b981', fontSize: 12, fontWeight: 'bold'}} />
            <Label value={t.quadrant.quadrants.q4} position="insideBottomLeft" offset={20} style={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} />
            <Label value={t.quadrant.quadrants.q1} position="insideBottomRight" offset={20} style={{fill: '#3b82f6', fontSize: 10, fontWeight: 'bold'}} />

            <Tooltip content={<CustomScatterTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            
            <Scatter name="Projects" data={analysisData} fill="#8884d8">
              {analysisData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AudienceAnalysis;