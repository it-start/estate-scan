
import { useState, useMemo } from 'react';
import { RAW_DATA, PROJECT_SPECS } from './data';
import { ProjectName, Language, ProjectInfo } from './types';
import { translations, categoryTranslations, translate, facilityTranslations } from './translations';
import SetAnalysis from './components/SetAnalysis';
import AnalysisChart from './components/AnalysisChart';
import UnitTable from './components/UnitTable';
import MasterPlanComparison from './components/MasterPlanComparison';
import SizeDistributionChart from './components/SizeDistributionChart';
import AudienceAnalysis from './components/AudienceAnalysis';
import ProjectMap from './components/ProjectMap';
import FloorPlanViewer from './components/FloorPlanViewer';
import NavigationTabs from './components/NavigationTabs';
import FacilitiesMatrix from './components/FacilitiesMatrix'; // Imported
import { Layers, LayoutGrid, Building2, MapPin, Ruler, Home, Tags, Sparkles, Globe } from 'lucide-react';
import { useFilters } from './contexts/FilterContext';

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
  const visible = facilities.slice(visibleCount);
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
  const {
    lang, setLang,
    analysisMode, setAnalysisMode,
    selectedProjects, toggleProject,
    selectedCategories, toggleCategory,
    selectedSubCategories, toggleSubCategory,
    selectedFacilities, toggleFacility,
    sizeFilter, handleSizeChange,
    allCategories, allSubCategories, allFacilities,
    filteredSpecs, filteredData
  } = useFilters();

  const t = translations[lang];

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
      // Aggregate unit categories from RAW_DATA for visible projects
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

  return (
    <div className="min-h-screen h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {/* Sidebar Filter */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 z-10 shrink-0 h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-200 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-indigo-700">
              <Building2 className="w-6 h-6" />
              <h1 className="text-xl font-bold tracking-tight">{t.sidebar.title}</h1>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-4">{t.sidebar.subtitle}</p>
          
          <button 
            onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
            className="w-full flex items-center justify-center gap-2 text-xs font-medium text-slate-600 hover:text-indigo-600 transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg border border-slate-200"
          >
            <Globe className="w-3 h-3" />
            {lang === 'en' ? 'Switch to Russian' : 'Switch to English'}
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          
          {/* Project Filter (Always Visible) */}
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

          {/* DYNAMIC FILTERS: Render based on active tab */}

          {/* Facilities Filter */}
          {analysisMode === 'facilities' && (
            <div className="animate-fadeIn">
              <div className="h-px bg-slate-200 mb-6" /> 
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> {t.sidebar.facilities}
              </h3>
              <div className="space-y-2">
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
          )}

          {/* Unit Specific Filters */}
          {(analysisMode === 'units' || analysisMode === 'audience') && (
            <div className="animate-fadeIn space-y-8">
              <div className="h-px bg-slate-200" /> 
              
              {/* Size Range */}
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

              {/* Categories */}
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

              {/* Sub Categories */}
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
        
        {/* Sidebar Footer Stats */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
           <div className="flex justify-between items-center text-xs text-slate-500">
              <span>{filteredData.length} {t.stats.unitsFound}</span>
              <span className="bg-slate-200 px-2 py-0.5 rounded-full">{filteredSpecs.length} {t.stats.buildings}</span>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50">
        
        {/* Top Navigation Tabs */}
        <NavigationTabs currentMode={analysisMode} onModeChange={setAnalysisMode} lang={lang} />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Project Summary Cards - Show only on specific tabs to reduce noise */}
            {(analysisMode === 'masterplan' || analysisMode === 'audience') && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
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
                        <span>{spec.landAreaRai} {t.stats.rai}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Home className="w-4 h-4 shrink-0" />
                        <span>{spec.buildings} {t.stats.buildings}, {spec.storeys} {t.stats.storeys}</span>
                      </div>
                    </div>
                    
                    {/* Collapsible Facilities Mini-List */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <FacilityGroup facilities={spec.facilities} lang={lang} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Analysis Content Modules */}

            {analysisMode === 'audience' && (
              <AudienceAnalysis projects={filteredSpecs} allUnits={filteredData} lang={lang} />
            )}

            {analysisMode === 'masterplan' && (
              <div className="space-y-8 animate-fadeIn">
                <section>
                   <ProjectMap projects={filteredSpecs} lang={lang} />
                </section>
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-800">{t.sidebar.masterPlan}</h3>
                  </div>
                  <MasterPlanComparison projects={filteredSpecs} lang={lang} />
                </section>
              </div>
            )}

            {analysisMode === 'floorplans' && (
              <section className="animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-800">{t.floorPlan.title}</h3>
                  <p className="text-sm text-slate-500">{t.floorPlan.subtitle}</p>
                </div>
                {/* Only pass the first selected project if multiple selected, or specific one */}
                <FloorPlanViewer 
                  activeProject={filteredSpecs.length > 0 ? filteredSpecs[0].name : ProjectName.SIERRA} 
                  lang={lang} 
                />
                {filteredSpecs.length > 1 && (
                  <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200 flex items-center gap-2">
                     <AlertCircle className="w-4 h-4" />
                     Since multiple projects are selected, showing data for <strong>{filteredSpecs[0].name}</strong>. Deselect others in sidebar to switch.
                  </div>
                )}
              </section>
            )}

            {analysisMode === 'facilities' && (
              <section className="animate-fadeIn space-y-8">
                 {/* Set Analysis */}
                 <div>
                    <div className="flex items-center justify-between mb-4">
                       <h3 className="text-lg font-bold text-slate-800">{t.setAnalysis.amenitiesTitle}</h3>
                    </div>
                    <SetAnalysis 
                        title={t.setAnalysis.amenitiesTitle}
                        dataSets={setAnalysisData} 
                        lang={lang}
                        mode="facilities"
                      />
                 </div>
                 
                 {/* New Matrix */}
                 <FacilitiesMatrix projects={filteredSpecs} lang={lang} />
              </section>
            )}

            {analysisMode === 'units' && (
              <div className="animate-fadeIn space-y-8">
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
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div>
                      <SizeDistributionChart data={filteredData} lang={lang} />
                   </div>
                   <div>
                      <AnalysisChart data={filteredData} lang={lang} />
                   </div>
                </section>

                {/* Grid Section */}
                <section>
                  <UnitTable data={filteredData} lang={lang} />
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Simple Alert Icon for inline usage
const AlertCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
);

export default App;
