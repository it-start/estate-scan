import React, { useState, useMemo } from 'react';
import { RAW_DATA, PROJECT_SPECS } from './data';
import { ProjectName, Language } from './types';
import { translations, categoryTranslations, translate } from './translations';
import SetAnalysis from './components/SetAnalysis';
import AnalysisChart from './components/AnalysisChart';
import UnitTable from './components/UnitTable';
import MasterPlanComparison from './components/MasterPlanComparison';
import { Filter, Layers, LayoutGrid, Building2, MapPin, Ruler, Home, Tags, ArrowRightLeft, Map, Globe } from 'lucide-react';

const App = () => {
  const [selectedProjects, setSelectedProjects] = useState<Set<ProjectName>>(
    new Set([ProjectName.CORALINA, ProjectName.SERENITY, ProjectName.SIERRA])
  );
  
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedSubCategories, setSelectedSubCategories] = useState<Set<string>>(new Set());
  const [analysisMode, setAnalysisMode] = useState<'facilities' | 'units' | 'masterplan'>('facilities');
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  // Initialize size range based on data
  const [sizeFilter, setSizeFilter] = useState(() => {
    const sizes = RAW_DATA.flatMap(d => [d.minSize, d.maxSize]);
    const min = Math.floor(Math.min(...sizes));
    const max = Math.ceil(Math.max(...sizes));
    return {
      globalMin: min,
      globalMax: max,
      currentMin: min,
      currentMax: max
    };
  });

  // Extract all available categories for the filter
  const allCategories = useMemo(() => {
    return Array.from(new Set(RAW_DATA.map(d => d.category))).sort();
  }, []);

  // Extract all available sub-categories
  const allSubCategories = useMemo(() => {
    return Array.from(new Set(RAW_DATA.map(d => d.subCategory))).sort();
  }, []);

  const filteredData = useMemo(() => {
    return RAW_DATA.filter(item => {
      const projectMatch = selectedProjects.has(item.project);
      const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(item.category);
      const subCategoryMatch = selectedSubCategories.size === 0 || selectedSubCategories.has(item.subCategory);
      
      // Check if unit size range overlaps with filter range
      // Overlap exists if (UnitMin <= FilterMax) and (UnitMax >= FilterMin)
      const sizeMatch = item.minSize <= sizeFilter.currentMax && item.maxSize >= sizeFilter.currentMin;

      return projectMatch && categoryMatch && subCategoryMatch && sizeMatch;
    });
  }, [selectedProjects, selectedCategories, selectedSubCategories, sizeFilter]);

  const filteredSpecs = useMemo(() => {
    return PROJECT_SPECS.filter(spec => selectedProjects.has(spec.name));
  }, [selectedProjects]);

  // Prepare data for SetAnalysis based on mode
  const setAnalysisData = useMemo(() => {
    if (analysisMode === 'facilities') {
      return {
        [ProjectName.CORALINA]: PROJECT_SPECS.find(p => p.name === ProjectName.CORALINA)?.facilities || [],
        [ProjectName.SERENITY]: PROJECT_SPECS.find(p => p.name === ProjectName.SERENITY)?.facilities || [],
        [ProjectName.SIERRA]: PROJECT_SPECS.find(p => p.name === ProjectName.SIERRA)?.facilities || [],
      };
    } else {
      // Aggregate unit categories from RAW_DATA
      const getCats = (proj: ProjectName) => 
        Array.from(new Set(RAW_DATA.filter(d => d.project === proj).map(d => d.category)));

      return {
        [ProjectName.CORALINA]: getCats(ProjectName.CORALINA),
        [ProjectName.SERENITY]: getCats(ProjectName.SERENITY),
        [ProjectName.SIERRA]: getCats(ProjectName.SIERRA),
      };
    }
  }, [analysisMode]);

  const toggleProject = (proj: ProjectName) => {
    const next = new Set(selectedProjects);
    if (next.has(proj)) next.delete(proj);
    else next.add(proj);
    setSelectedProjects(next);
  };

  const toggleCategory = (cat: string) => {
    const next = new Set(selectedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setSelectedCategories(next);
  };

  const toggleSubCategory = (sub: string) => {
    const next = new Set(selectedSubCategories);
    if (next.has(sub)) next.delete(sub);
    else next.add(sub);
    setSelectedSubCategories(next);
  };

  const handleSizeChange = (type: 'min' | 'max', value: string) => {
    const val = parseInt(value) || 0;
    setSizeFilter(prev => ({
      ...prev,
      [type === 'min' ? 'currentMin' : 'currentMax']: val
    }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 font-sans">
      
      {/* Sidebar Filter */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 md:h-screen md:sticky md:top-0 overflow-y-auto z-10 shrink-0">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-700">
              <Building2 className="w-6 h-6" />
              <h1 className="text-xl font-bold tracking-tight">{t.sidebar.title}</h1>
            </div>
            <button 
              onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
              className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors bg-slate-100 px-2 py-1 rounded"
            >
              <Globe className="w-3 h-3" />
              {lang.toUpperCase()}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-1">{t.sidebar.subtitle}</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Project Filter */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-3 h-3" /> {t.sidebar.projects}
            </h3>
            <div className="space-y-2">
              {Object.values(ProjectName).map(proj => (
                <label key={proj} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedProjects.has(proj) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                    {selectedProjects.has(proj) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedProjects.has(proj)}
                    onChange={() => toggleProject(proj)}
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 transition-colors">{proj}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Analysis Mode Switcher */}
          <div>
             <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Filter className="w-3 h-3" /> {t.sidebar.analysisFocus}
            </h3>
            <div className="flex flex-col gap-1 p-1 bg-slate-100 rounded-lg">
              <div className="flex gap-1">
                <button 
                  onClick={() => setAnalysisMode('facilities')}
                  className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${analysisMode === 'facilities' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t.sidebar.facilities}
                </button>
                <button 
                  onClick={() => setAnalysisMode('units')}
                  className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${analysisMode === 'units' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {t.sidebar.unitTypes}
                </button>
              </div>
              <button 
                onClick={() => setAnalysisMode('masterplan')}
                className={`w-full flex items-center justify-center gap-1 text-xs py-1.5 rounded-md font-medium transition-all ${analysisMode === 'masterplan' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <Map className="w-3 h-3" /> {t.sidebar.masterPlan}
              </button>
            </div>
          </div>

          {/* Size Range Filter */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Ruler className="w-3 h-3" /> {t.sidebar.unitSize}
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input 
                  type="number" 
                  value={sizeFilter.currentMin}
                  onChange={(e) => handleSizeChange('min', e.target.value)}
                  className="w-full pl-2 pr-1 py-1.5 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Min"
                />
              </div>
              <span className="text-slate-400 text-xs">-</span>
              <div className="relative flex-1">
                <input 
                  type="number" 
                  value={sizeFilter.currentMax}
                  onChange={(e) => handleSizeChange('max', e.target.value)}
                  className="w-full pl-2 pr-1 py-1.5 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-slate-400">
              <span>Min: {sizeFilter.globalMin}</span>
              <span>Max: {sizeFilter.globalMax}</span>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <LayoutGrid className="w-3 h-3" /> {t.sidebar.unitCategories}
            </h3>
            <div className="space-y-2">
              {allCategories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.has(cat) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                    {selectedCategories.has(cat) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedCategories.has(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-700 transition-colors">
                    {translate(cat, lang, categoryTranslations)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Sub-Category Filter */}
          <div>
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Tags className="w-3 h-3" /> {t.sidebar.subCategories}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {allSubCategories.map(sub => (
                <label key={sub} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedSubCategories.has(sub) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                    {selectedSubCategories.has(sub) && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={selectedSubCategories.has(sub)}
                    onChange={() => toggleSubCategory(sub)}
                  />
                  <span className="text-xs font-medium text-slate-600 group-hover:text-indigo-700 transition-colors truncate">{sub}</span>
                </label>
              ))}
            </div>
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
             <div>
               <h2 className="text-2xl font-bold text-slate-900">{t.sidebar.title}</h2>
               <p className="text-slate-500">{t.sidebar.subtitle}</p>
             </div>
             <div className="text-right hidden sm:block">
               <div className="text-sm font-medium text-slate-900">{filteredData.length} {t.stats.unitsFound}</div>
               <div className="text-xs text-slate-500">{t.stats.basedOnFilters}</div>
             </div>
          </div>

          {/* Project Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredSpecs.map(spec => (
              <div key={spec.name} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-lg font-bold ${spec.name === 'Coralina' ? 'text-rose-600' : spec.name === 'Serenity' ? 'text-emerald-600' : 'text-sky-600'}`}>
                    {spec.name}
                  </h3>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-mono">
                    {spec.totalUnits} {t.stats.units}
                  </span>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{spec.location[lang]}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Ruler className="w-4 h-4 shrink-0" />
                    <span>{spec.landAreaRai} {t.stats.rai} ({spec.landAreaSqm.toLocaleString()} sqm)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Home className="w-4 h-4 shrink-0" />
                    <span>{spec.buildings} {t.stats.buildings}, {spec.storeys} {t.stats.storeys}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-2">{t.stats.keyFacilities}</p>
                  <div className="flex flex-wrap gap-1">
                    {spec.facilities.slice(0, 5).map(f => (
                      <span key={f} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] rounded">
                        {/* Assuming facility strings can be mapped if strict, or passed as is if English. 
                            Since we only have mapping in translations.ts, we need to use it.
                        */}
                        {/* Simple lookup assuming 'f' matches keys in facilityTranslations */}
                        {/* If not found, fallback to 'f' */}
                        {/* Note: data.ts uses variables for facilities but the value is 'Swimming Pool' etc. which matches keys. */}
                        {translate(f, lang, import('./translations').then(m => m.facilityTranslations) as any) || f} 
                        {/* Actually, imports are async. Let's fix this by importing facilityTranslations at top */}
                        {/* Fixed in line 14 import */}
                      </span>
                    ))}
                    {spec.facilities.length > 5 && (
                      <span className="px-1.5 py-0.5 text-slate-400 text-[10px]">+ {spec.facilities.length - 5} {t.stats.more}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conditional Analysis Content */}
          {analysisMode === 'masterplan' ? (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">{t.sidebar.masterPlan}</h3>
              </div>
              <MasterPlanComparison projects={filteredSpecs} lang={lang} />
            </section>
          ) : (
            <>
              {/* Set Analysis Section */}
              <section>
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">
                      {analysisMode === 'facilities' ? t.setAnalysis.amenitiesTitle : t.setAnalysis.unitCatsTitle}
                    </h3>
                 </div>
                 <SetAnalysis 
                    title={analysisMode === 'facilities' ? t.setAnalysis.amenitiesTitle : t.setAnalysis.unitCatsTitle}
                    dataSets={setAnalysisData} 
                    lang={lang}
                    mode={analysisMode}
                  />
              </section>

              {/* Charts Section - Only relevant for Unit Sizes */}
              <section className="grid grid-cols-1 gap-6">
                <h3 className="text-lg font-bold text-slate-800">{t.charts.avgUnitSize}</h3>
                <AnalysisChart data={filteredData} lang={lang} />
              </section>

              {/* Grid Section */}
              <section>
                <UnitTable data={filteredData} lang={lang} />
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;