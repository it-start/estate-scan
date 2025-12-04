

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { ProjectName, Language, ProjectInfo, UnitPlan, AnalysisMode } from '../types';
import { RAW_DATA, PROJECT_SPECS } from '../data';

export interface SizeFilter {
  globalMin: number;
  globalMax: number;
  currentMin: number;
  currentMax: number;
}

interface FilterContextType {
  // State
  lang: Language;
  setLang: (lang: Language) => void;
  analysisMode: AnalysisMode;
  setAnalysisMode: (mode: AnalysisMode) => void;
  
  selectedProjects: Set<ProjectName>;
  toggleProject: (proj: ProjectName) => void;
  
  selectedCategories: Set<string>;
  toggleCategory: (cat: string) => void;
  
  selectedSubCategories: Set<string>;
  toggleSubCategory: (sub: string) => void;
  
  selectedFacilities: Set<string>;
  toggleFacility: (fac: string) => void;
  
  sizeFilter: SizeFilter;
  handleSizeChange: (type: 'min' | 'max', value: string) => void;

  // New State for Interactivity
  highlightedCategory: string | null;
  setHighlightedCategory: (cat: string | null) => void;
  
  // Derived Data
  allCategories: string[];
  allSubCategories: string[];
  allFacilities: string[];
  
  filteredSpecs: ProjectInfo[];
  filteredData: UnitPlan[];
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- State Initialization ---
  const [lang, setLang] = useState<Language>('en');
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('facilities');
  
  const [selectedProjects, setSelectedProjects] = useState<Set<ProjectName>>(
    new Set([ProjectName.CORALINA, ProjectName.SERENITY, ProjectName.SIERRA])
  );
  
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedSubCategories, setSelectedSubCategories] = useState<Set<string>>(new Set());
  const [selectedFacilities, setSelectedFacilities] = useState<Set<string>>(new Set());
  const [highlightedCategory, setHighlightedCategory] = useState<string | null>(null);

  const [sizeFilter, setSizeFilter] = useState<SizeFilter>(() => {
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

  // --- Actions ---
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

  // --- Derived Data Logic ---
  
  const allCategories = useMemo(() => {
    return Array.from(new Set(RAW_DATA.map(d => d.category))).sort();
  }, []);

  const allSubCategories = useMemo(() => {
    return Array.from(new Set(RAW_DATA.map(d => d.subCategory))).sort();
  }, []);

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
      
      // If we are not in 'units' or 'audience' mode, we generally just want the project data
      // unless we want to strictly filter units in other modes too.
      // NOTE: 'audience' mode uses Unit data for scoring, so we respect filters if applicable,
      // but usually audience analysis looks at the WHOLE project unless filtered specifically.
      if (analysisMode !== 'units' && analysisMode !== 'audience') {
        return projectMatch;
      }

      if (!projectMatch) return false;

      // In audience mode, if user selects no specific categories, we assume ALL are relevant for scoring.
      // But if they explicitly pick "1 Bedroom", we should calculate scores based on that.
      const categoryMatch = selectedCategories.size === 0 || selectedCategories.has(item.category);
      const subCategoryMatch = selectedSubCategories.size === 0 || selectedSubCategories.has(item.subCategory);
      
      // Check if unit size range overlaps with filter range
      const sizeMatch = item.minSize <= sizeFilter.currentMax && item.maxSize >= sizeFilter.currentMin;

      return categoryMatch && subCategoryMatch && sizeMatch;
    });
  }, [filteredSpecs, selectedCategories, selectedSubCategories, sizeFilter, analysisMode]);

  const value = {
    lang, setLang,
    analysisMode, setAnalysisMode,
    selectedProjects, toggleProject,
    selectedCategories, toggleCategory,
    selectedSubCategories, toggleSubCategory,
    selectedFacilities, toggleFacility,
    sizeFilter, handleSizeChange,
    highlightedCategory, setHighlightedCategory,
    allCategories, allSubCategories, allFacilities,
    filteredSpecs, filteredData
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};