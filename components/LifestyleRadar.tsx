import React, { useMemo } from 'react';
import { ProjectInfo, ProjectName, Language } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { translations } from '../translations';

interface LifestyleRadarProps {
  projects: ProjectInfo[];
  lang: Language;
}

const LifestyleRadar: React.FC<LifestyleRadarProps> = ({ projects, lang }) => {
  const t = translations[lang];

  const data = useMemo(() => {
    // Scoring Logic Helpers
    const hasFacility = (p: ProjectInfo, terms: string[]) => 
      terms.some(term => p.facilities.some(f => f.toLowerCase().includes(term.toLowerCase())));
    
    const getScore = (p: ProjectInfo, type: 'wellness' | 'family' | 'work' | 'exclusive' | 'nature') => {
      let score = 0;
      switch (type) {
        case 'wellness':
          if (hasFacility(p, ['onsen', 'spa'])) score += 30;
          if (hasFacility(p, ['sauna', 'steam'])) score += 20;
          if (hasFacility(p, ['gym', 'fitness'])) score += 20;
          if (hasFacility(p, ['pool'])) score += 10;
          if (p.masterPlan.greenSpaceRatio > 15) score += 20;
          break;
        case 'family':
          if (hasFacility(p, ['kid', 'game'])) score += 40;
          if (hasFacility(p, ['pool', 'lagoon'])) score += 20;
          // Bonus for having 3 bedrooms
          if (p.unitTypes.some(u => u.includes('3 Bedroom'))) score += 30;
          else if (p.unitTypes.some(u => u.includes('2 Bedroom'))) score += 10;
          break;
        case 'work':
          if (hasFacility(p, ['coworking', 'co-working'])) score += 40;
          if (hasFacility(p, ['meeting', 'library'])) score += 30;
          if (hasFacility(p, ['lounge'])) score += 20;
          if (p.name === ProjectName.SIERRA) score += 10; // Location bonus (Boat Ave)
          break;
        case 'exclusive':
          // Lower density = higher score. Max density ~105.
          const densityScore = Math.max(0, (110 - p.masterPlan.unitsPerRai) / 1.1);
          score += densityScore * 0.6; // 60% weight on density
          // Common area per unit bonus
          score += Math.min(40, p.masterPlan.commonAreaPerUnit * 4);
          break;
        case 'nature':
          score += Math.min(100, p.masterPlan.greenSpaceRatio * 3.5); // 25% green -> ~87 score
          if (hasFacility(p, ['garden', 'yard', 'lagoon'])) score += 15;
          break;
      }
      return Math.min(100, Math.round(score));
    };

    return [
      { subject: lang === 'en' ? 'Wellness' : 'Велнес', fullMark: 100 },
      { subject: lang === 'en' ? 'Family' : 'Семья', fullMark: 100 },
      { subject: lang === 'en' ? 'Work/Tech' : 'Работа', fullMark: 100 },
      { subject: lang === 'en' ? 'Exclusivity' : 'Приватность', fullMark: 100 },
      { subject: lang === 'en' ? 'Nature' : 'Природа', fullMark: 100 },
    ].map(axis => {
      const obj: any = { subject: axis.subject, fullMark: 100 };
      projects.forEach(p => {
        let key = '';
        if (axis.subject.includes('Wellness') || axis.subject.includes('Велнес')) key = 'wellness';
        else if (axis.subject.includes('Family') || axis.subject.includes('Семья')) key = 'family';
        else if (axis.subject.includes('Work') || axis.subject.includes('Работа')) key = 'work';
        else if (axis.subject.includes('Exclusivity') || axis.subject.includes('Приватность')) key = 'exclusive';
        else key = 'nature';
        
        obj[p.name] = getScore(p, key as any);
      });
      return obj;
    });
  }, [projects, lang]);

  const colors = {
    [ProjectName.CORALINA]: '#F43F5E',
    [ProjectName.SERENITY]: '#10B981',
    [ProjectName.SIERRA]: '#0EA5E9',
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[400px]">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">{t.masterPlan.radarTitle}</h3>
        <p className="text-xs text-slate-500">{t.masterPlan.radarSubtitle}</p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          {projects.map(p => (
            <Radar
              key={p.name}
              name={p.name}
              dataKey={p.name}
              stroke={colors[p.name]}
              fill={colors[p.name]}
              fillOpacity={0.2}
            />
          ))}
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LifestyleRadar;