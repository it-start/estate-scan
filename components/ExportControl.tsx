

import React from 'react';
import { FileDown, FileJson, FileSpreadsheet, Building, Sparkles } from 'lucide-react';
import { UnitPlan, ProjectInfo, Language } from '../types';
import { translations } from '../translations';

interface ExportControlProps {
  units: UnitPlan[];
  projects: ProjectInfo[];
  lang: Language;
}

const ExportControl: React.FC<ExportControlProps> = ({ units, projects, lang }) => {
  const t = translations[lang].export;

  // Helper to escape fields for CSV
  const escape = (val: string | number) => `"${String(val).replace(/"/g, '""')}"`;

  // Trigger download helper
  const triggerDownload = (content: string, filename: string, type: 'csv' | 'json' = 'csv') => {
    const mimeType = type === 'json' ? 'application/json' : 'text/csv;charset=utf-8;';
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Export Unit Inventory (Existing)
  const downloadUnitsCSV = () => {
    const headers = ['Project', 'Unit Name', 'Code', 'Category', 'Sub-Category', 'Min Size (sqm)', 'Max Size (sqm)'];
    const rows = units.map(u => [
      u.project, u.name, u.code, u.category, u.subCategory, u.minSize, u.maxSize
    ]);
    const csvContent = [headers.join(','), ...rows.map(row => row.map(escape).join(','))].join('\n');
    triggerDownload(csvContent, `estate_units_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  // 2. Export Project Specs & Metrics (New)
  const downloadProjectsCSV = () => {
    const headers = [
      'Project', 'Location', 'Total Units', 'Buildings', 'Storeys', 'Land Area (Rai)', 
      'Land Area (Sqm)', 'Density (Units/Rai)', 'Green Space (%)', 'Common Area/Unit (sqm)', 
      'Facility Count', 'Facility Density'
    ];
    
    const rows = projects.map(p => [
      p.name,
      p.location[lang],
      p.totalUnits,
      p.buildings,
      p.storeys,
      p.landAreaRai,
      p.landAreaSqm,
      p.masterPlan.unitsPerRai,
      p.masterPlan.greenSpaceRatio,
      p.masterPlan.commonAreaPerUnit,
      p.facilities.length,
      p.masterPlan.facilityDensity
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.map(escape).join(','))].join('\n');
    triggerDownload(csvContent, `estate_projects_metrics_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  // 3. Export Facilities Matrix (New)
  const downloadFacilitiesCSV = () => {
    // Collect all unique facilities sorted
    const allFacilities = Array.from(new Set(projects.flatMap(p => p.facilities))).sort();
    
    const headers = ['Facility', ...projects.map(p => p.name)];
    
    const rows = allFacilities.map(fac => {
      const row = [fac];
      projects.forEach(p => {
        row.push(p.facilities.includes(fac) ? 'Yes' : 'No');
      });
      return row;
    });

    const csvContent = [headers.join(','), ...rows.map(row => row.map(escape).join(','))].join('\n');
    triggerDownload(csvContent, `estate_facilities_matrix_${new Date().toISOString().slice(0, 10)}.csv`);
  };

  // 4. Full JSON Export (Existing)
  const downloadJSON = () => {
    const data = {
      metadata: { exportedAt: new Date().toISOString(), projectCount: projects.length, unitCount: units.length },
      projects,
      units
    };
    triggerDownload(JSON.stringify(data, null, 2), `estate_full_data_${new Date().toISOString().slice(0, 10)}.json`, 'json');
  };

  return (
    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
      <button
        onClick={downloadUnitsCSV}
        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
        title={t.csvTooltip}
      >
        <FileSpreadsheet size={16} />
      </button>
      
      <div className="w-px h-4 bg-slate-200"></div>

      <button
        onClick={downloadProjectsCSV}
        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
        title={t.projectsTooltip}
      >
        <Building size={16} />
      </button>

      <button
        onClick={downloadFacilitiesCSV}
        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
        title={t.facilitiesTooltip}
      >
        <Sparkles size={16} />
      </button>

      <div className="w-px h-4 bg-slate-200"></div>

      <button
        onClick={downloadJSON}
        className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
        title={t.jsonTooltip}
      >
        <FileJson size={16} />
      </button>
    </div>
  );
};

export default ExportControl;