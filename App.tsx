import React, { useState, useMemo } from 'react';
import { RAW_DATA, PROJECT_SPECS } from './data';
import { ProjectName, Language, ProjectInfo } from './types';
import { translations, categoryTranslations, translate, facilityTranslations } from './translations';
import SetAnalysis from './components/SetAnalysis';
import AnalysisChart from './components/AnalysisChart';
import UnitTable from './components/UnitTable';
import MasterPlanComparison from './components/MasterPlanComparison';
import { Filter, Layers, LayoutGrid, Building2, MapPin, Ruler, Home, Tags, Map, Globe, Sparkles } from 'lucide-react';

const FacilityGroup = ({ facilities, lang }: { facilities: string[], lang: Language }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (isExpanded) {
    return (
      <div className="flex flex-wrap gap-1">
        {facilities.map(f => (
          <span key={f} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] rounded">
            {translate(f, lang, facilityTranslations)}
          </span>
        ))}
        <button 
          onClick={() => setIsExpanded(false)}
          className="px-1.5 py-0.5 text-indigo-600 hover:text-indigo-800 text-[10px] font-medium bg-indigo-50 rounded hover:bg-indigo-100 transition-colors"
        >
          {translations[lang].stats.showLess}
        </button>
      </div>
    );
  }

  const visibleCount = 5;
  const visible = facilities.slice(0, visibleCount);
  const hidden = facilities.slice(visibleCount);

  if (hidden.length === 0) {
     return (
      <div className="flex flex-wrap gap-1">
        {visible.map(f => (
          <span key={f} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] rounded">
            {translate(f, lang, facilityTranslations)}
          </span>
        ))}
      </div>
     );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {visible.map(f => (
        <span key={f} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] rounded">
          {translate(f, lang, facilityTranslations)}
        </span>
      ))}
      
      <div className="relative group">
        <button
          onClick={() => setIsExpanded(true)}
          className="px-1.5 py-0.5 text-slate-500 bg-slate-100 border border-transparent hover:border-slate-200 hover:bg-slate-200 rounded text-[10px] transition-all cursor-pointer font-medium"
        >
          + {hidden.length} {translations[lang].stats.more}
        </button>
        
        {/* Tooltip on hover */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] p-2 bg-slate-800 text-white text-[10px] rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 pointer-events-none text-center">
            <div className="flex flex-col gap-1">
                {hidden.map(f => (
                    <span key={f} className="whitespace-nowrap">{translate(f, lang, facilityTranslations)}</span>
                ))}
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [selectedProjects, setSelectedProjects] = useState<Set<ProjectName>>(
    new Set([ProjectName.CORALINA, ProjectName.SERENITY, ProjectName.SIERRA])
  );
  
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedSubCategories, setSelectedSubCategories] = useState<Set<string>>(new Set());
  const [selectedFacilities, setSelectedFacilities] = useState<Set<string>>(new Set());
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

  // Extract all available facilities for the filter
  const allFacilities = useMemo(() => {
    return Array.from(new Set(PROJECT_SPECS.flatMap(p => p.facilities))).sort();
  }, []);

  const filteredSpecs = useMemo(() => {
    return PROJECT_SPECS.filter(spec => {
      // 1. Must be in selectedProjects
      if (!selectedProjects.has(spec.name)) return false;
      
      // 2. If in facilities mode, check facility filter
      if (analysisMode === 'facilities' && selectedFacilities.size > 0) {
         // AND logic: must have ALL selected facilities
         const hasAll = Array.from(selectedFacilities).every(f => spec.facilities.includes(f));
         if (!hasAll) return false;
      }
      return true;
    });
  }, [selectedProjects, selectedFacilities, analysisMode]);

  const filteredData = useMemo(() => {
    // Get names of valid projects based on all filters applied to specs
    const validProjectNames = new Set(filteredSpecs.map(p => p.name));

    return RAW_DATA.filter(item => {
      const projectMatch = validProjectNames.has(item.project);
      
      // If we are not in 'units' mode, we usually care about the project level data
      // or we want to see ALL units for the project without specific filtering.
      // However, if the user explicitly wants to filter units, they should be in 'units' mode.
      if (analysisMode !== 'units') {
        return projectMatch;
      }

      if (!projectMatch) return false;

      const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(item.category);
      const subCategoryMatch = selectedSubCategories.size === 0 || selectedSubCategories.has(item.subCategory);
      
      // Check if unit size range overlaps with filter range
      // Overlap exists if (UnitMin <= FilterMax) and (UnitMax >= FilterMin)
      const sizeMatch = item.minSize <= sizeFilter.currentMax && item.maxSize >= sizeFilter.currentMin;

      return categoryMatch && subCategoryMatch && sizeMatch;
    });
  }, [filteredSpecs, selectedCategories, selectedSubCategories, sizeFilter, analysisMode]);

  // Prepare data for SetAnalysis based on mode
  const setAnalysisData = useMemo(() => {
    // Helper to get data only if project is currently visible/valid
    const getProjectData = (name: ProjectName, extractor: (p: ProjectInfo | undefined) => string[]) => {
      if (!filteredSpecs.find(p => p.name === name)) return [];
      return extractor(PROJECT_SPECS.find(p => p.name === name));
    };

    if (analysisMode === 'facilities') {
      return {
        [ProjectName.CORALINA]: getProjectData(ProjectName.CORALINA, p => p?.facilities || []),
        [ProjectName.SERENITY]: getProjectData(ProjectName.SERENITY, p => p?.facilities || []),
        [ProjectName.SIERRA]: getProjectData(ProjectName.SIERRA, p => p?.facilities || []),
      };
    } else {
      // Aggregate unit categories from RAW_DATA
      const getCats = (proj: ProjectName) => {
        if (!filteredSpecs.find(p => p.name === proj)) return [];
        return Array.from(new Set(RAW_DATA.filter(d => d.project === proj).map(d => d.category)));
      };

      return {
        [ProjectName.CORALINA]: getCats(ProjectName.CORALINA),
        [ProjectName.SERENITY]: getCats(ProjectName.SERENITY),
        [ProjectName.SIERRA]: getCats(ProjectName.SIERRA),
      };
    }
  }, [analysisMode, filteredSpecs]);

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

  const toggleFacility = (fac: string) => {
    const next = new Set(selectedFacilities);
    if (next.has(fac)) next.delete(fac);
    else next.add(fac);
    setSelectedFacilities(next);
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

          {/* Facilities Filter - Only shown in 'facilities' mode */}
          {analysisMode === 'facilities' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="h-px bg-slate-200 my-4" /> 
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> {t.sidebar.facilities}
                </h3>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {allFacilities.map(fac => (
                    <label key={fac} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${selectedFacilities.has(fac) ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300 bg-white group-hover:border-indigo-400'}`}>
                        {selectedFacilities.has(fac) && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedFacilities.has(fac)}
                        onChange={() => toggleFacility(fac)}
                      />
                      <span className="text-xs font-medium text-slate-600 group-hover:text-indigo-700 transition-colors">
                        {translate(fac, lang, facilityTranslations)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Unit Specific Filters - Only shown in 'units' mode */}
          {analysisMode === 'units' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="h-px bg-slate-200 my-4" /> 
              
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
          )}

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
              <div key={spec.name} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-fadeIn">
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
                  <FacilityGroup facilities={spec.facilities} lang={lang} />
                </div>
              </div>
            ))}
          </div>

          {/* Conditional Analysis Content */}
          {analysisMode === 'masterplan' && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800">{t.sidebar.masterPlan}</h3>
              </div>
              <MasterPlanComparison projects={filteredSpecs} lang={lang} />
            </section>
          )}

          {analysisMode === 'facilities' && (
            <section>
               <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800">{t.setAnalysis.amenitiesTitle}</h3>
               </div>
               <SetAnalysis 
                  title={t.setAnalysis.amenitiesTitle}
                  dataSets={setAnalysisData} 
                  lang={lang}
                  mode="facilities"
                />
            </section>
          )}

          {analysisMode === 'units' && (
            <>
              {/* Set Analysis Section */}
              <section>
                 <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">{t.setAnalysis.unitCatsTitle}</h3>
                 </div>
                 <SetAnalysis 
                    title={t.setAnalysis.unitCatsTitle}
                    dataSets={setAnalysisData} 
                    lang={lang}
                    mode="units"
                  />
              </section>

              {/* Charts Section */}
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