

import { Language } from './types';

export const translations = {
  en: {
    sidebar: {
      title: "EstateScan",
      subtitle: "Deep Research Unit Analyzer",
      projects: "Projects",
      analysisFocus: "Analysis Focus",
      facilities: "Facilities",
      unitTypes: "Unit Types",
      masterPlan: "Master Plan",
      audience: "Audience Fit",
      floorPlans: "Floor Plans", // New
      unitSize: "Unit Size (SQ.M)",
      unitCategories: "Unit Categories",
      subCategories: "Sub-Categories",
    },
    export: {
      csvTooltip: "Export Units Inventory (CSV)",
      projectsTooltip: "Export Project Metrics (CSV)",
      facilitiesTooltip: "Export Facilities Matrix (CSV)",
      jsonTooltip: "Export Full Data JSON"
    },
    stats: {
      unitsFound: "Units Found",
      basedOnFilters: "Based on current filters",
      units: "Units",
      buildings: "Buildings",
      storeys: "Storeys",
      rai: "Rai",
      keyFacilities: "Key Facilities",
      more: "more",
      showLess: "Show less",
      viewMap: "View Map",
      facilityDensity: "Facilities / Bldg",
    },
    map: {
        title: "Project Locations",
        subtitle: "Geographic distribution across Phuket (Kamala, Naiyang, Bang-Tao)."
    },
    floorPlan: {
      title: "Floor Plan Navigator",
      subtitle: "Architectural layout analysis and unit distribution.",
      selectBuilding: "Select Building",
      selectFloor: "Select Floor",
      floorComposition: "Floor Composition",
      totalUnitsOnFloor: "Units on this floor",
      architecturalNotes: "Architectural Analysis",
      unitRange: "Unit Range",
      noData: "No floor plan data available for this selection.",
      zoomTip: "Scroll to zoom • Drag to pan"
    },
    masterPlan: {
      densityTradeOff: "Density Trade-off",
      spaceLuxury: "Space Luxury",
      greenRatio: "Green Ratio",
      keyZones: "KEY ZONES",
      unitsPerRai: "units/rai",
      sqmPerUnit: "sqm/unit",
      densityInsight: (projName: string, ratio: string, refName: string) => 
        `${projName} is ~${ratio}x denser than ${refName}, reflecting its Urban Lifestyle positioning.`,
      spaceInsight: (projName: string, sqm: string) => 
        `${projName} offers the most "Resort" feel with ~${sqm} sqm of common facility space per unit.`,
      greenInsight: (projName: string, pct: string) => 
        `Surprisingly, ${projName} dedicates the highest percentage of its land (${pct}%) to green space.`,
      features: "Master Plan Features & Layout Strategy",
      metricsTitle: "Key Metrics Comparison",
      metrics: {
        landArea: "Land Area (sqm)",
        commonArea: "Total Common Area (sqm)",
        totalUnits: "Total Units",
        buildings: "Buildings",
        facilityDensity: "Facility Density (Amenities/Bldg)",
      },
      radarTitle: "Lifestyle DNA",
      radarSubtitle: "Qualitative analysis based on facility mix and zoning.",
      scatterTitle: "Strategic Positioning Matrix",
      scatterSubtitle: "Density vs. Amenity Luxury. Larger bubbles = More Green Space.",
      axis: {
        density: "Density (Units/Rai)",
        luxury: "Amenity Space (SQM/Unit)"
      }
    },
    audience: {
      title: "Audience Segmentation & Persona Fit",
      subtitle: "Algorithmic scoring based on unit mix, amenities, and layout.",
      personas: {
        investor: "Investor",
        nomad: "Digital Nomad",
        family: "Family",
        retiree: "Retiree / Wellness",
      },
      quadrant: {
        title: "Yield vs. Livability Matrix",
        subtitle: "Mapping projects by Investment Potential vs. Long-term Living Comfort.",
        xAxis: "Investment Potential (Compactness & Efficiency)",
        yAxis: "Livability Score (Wellness & Space)",
        quadrants: {
          q1: "Cash Cow", // High Inv, Low Live
          q2: "The Unicorn", // High Inv, High Live
          q3: "Luxury Residence", // Low Inv, High Live
          q4: "Niche / Speculative" // Low Inv, Low Live
        }
      },
      mix: {
        title: "Inventory Segmentation",
        subtitle: "Compact vs. Spacious Unit Ratio"
      }
    },
    setAnalysis: {
      amenitiesTitle: "Amenities & Features",
      unitCatsTitle: "Unit Categories",
      distribution: "Distribution",
      setOperations: "Set Operations",
      intersection: "Intersection (All 3 Projects)",
      uniqueOfferings: "Unique Offerings",
      noMatch: "No exact match across all three.",
      commonAll3: "Common (All 3)",
      coralinaSerenity: "Coralina & Serenity Only",
      serenitySierra: "Serenity & Sierra Only",
      coralinaSierra: "Coralina & Sierra Only",
      coralinaOnly: "Coralina Only",
      serenityOnly: "Serenity Only",
      sierraOnly: "Sierra Only"
    },
    charts: {
      avgUnitSize: "Average Unit Size by Category (SQ.M)",
      sizeDist: "Unit Size Distribution",
      sizeDistSubtitle: "Inventory breakdown by size range."
    },
    table: {
      title: "Unit Inventory",
      project: "Project",
      unitName: "Unit Name",
      code: "Code",
      category: "Category",
      size: "Size (SQ.M)"
    }
  },
  ru: {
    sidebar: {
      title: "EstateScan",
      subtitle: "Анализатор объектов недвижимости",
      projects: "Проекты",
      analysisFocus: "Фокус анализа",
      facilities: "Удобства",
      unitTypes: "Типы юнитов",
      masterPlan: "Генплан",
      audience: "Целевая аудитория",
      floorPlans: "Планировки этажей", // New
      unitSize: "Площадь (кв.м)",
      unitCategories: "Категории юнитов",
      subCategories: "Подкатегории",
    },
    export: {
      csvTooltip: "Экспорт реестра юнитов (CSV)",
      projectsTooltip: "Экспорт метрик проектов (CSV)",
      facilitiesTooltip: "Экспорт матрицы удобств (CSV)",
      jsonTooltip: "Экспорт всех данных (JSON)"
    },
    stats: {
      unitsFound: "Найдено юнитов",
      basedOnFilters: "С учетом фильтров",
      units: "Юнитов",
      buildings: "Корпусов",
      storeys: "Этажей",
      rai: "Рай",
      keyFacilities: "Ключевые удобства",
      more: "еще",
      showLess: "Свернуть",
      viewMap: "Карта",
      facilityDensity: "Удобств / Корпус",
    },
    map: {
        title: "Локации проектов",
        subtitle: "Географическое распределение по Пхукету (Камала, Найянг, Банг-Тао)."
    },
    floorPlan: {
      title: "Навигатор планировок",
      subtitle: "Анализ архитектурной планировки и распределения юнитов.",
      selectBuilding: "Выберите корпус",
      selectFloor: "Выберите этаж",
      floorComposition: "Состав этажа",
      totalUnitsOnFloor: "Юнитов на этаже",
      architecturalNotes: "Архитектурный анализ",
      unitRange: "Диапазон номеров",
      noData: "Нет данных планировки для выбранных параметров.",
      zoomTip: "Скролл для зума • Тяните для перемещения"
    },
    masterPlan: {
      densityTradeOff: "Плотность застройки",
      spaceLuxury: "Простор и комфорт",
      greenRatio: "Озеленение",
      keyZones: "КЛЮЧЕВЫЕ ЗОНЫ",
      unitsPerRai: "юнитов/рай",
      sqmPerUnit: "кв.м/юнит",
      densityInsight: (projName: string, ratio: string, refName: string) => 
        `${projName} примерно в ${ratio} раза плотнее, чем ${refName}, что отражает городской стиль жизни.`,
      spaceInsight: (projName: string, sqm: string) => 
        `${projName} предлагает наиболее "курортную" атмосферу с ~${sqm} кв.м общественных пространств на юнит.`,
      greenInsight: (projName: string, pct: string) => 
        `Удивительно, но ${projName} отводит наибольший процент территории (${pct}%) под зеленые насаждения.`,
      features: "Особенности генплана и планировки",
      metricsTitle: "Сравнение ключевых показателей",
      metrics: {
        landArea: "Площадь участка (кв.м)",
        commonArea: "Общая площадь удобств (кв.м)",
        totalUnits: "Всего юнитов",
        buildings: "Количество зданий",
        facilityDensity: "Плотность удобств (Шт/Корпус)",
      },
      radarTitle: "ДНК Лайфстайла",
      radarSubtitle: "Качественный анализ на основе инфраструктуры и зонирования.",
      scatterTitle: "Матрица позиционирования",
      scatterSubtitle: "Плотность vs. Роскошь удобств. Размер круга = % озеленения.",
      axis: {
        density: "Плотность (Юнитов/Рай)",
        luxury: "Площадь удобств (кв.м/юнит)"
      }
    },
    audience: {
      title: "Сегментация аудитории",
      subtitle: "Алгоритмическая оценка на основе микса юнитов и инфраструктуры.",
      personas: {
        investor: "Инвестор",
        nomad: "Цифровой кочевник",
        family: "Семья",
        retiree: "Пенсионер / Велнес",
      },
      quadrant: {
        title: "Матрица: Доходность vs. Комфорт",
        subtitle: "Карта проектов: Инвестиционный потенциал vs. Долгосрочное проживание.",
        xAxis: "Инвест-потенциал (Компактность)",
        yAxis: "Индекс комфорта (Велнес и Простор)",
        quadrants: {
          q1: "Cash Cow", 
          q2: "Единорог",
          q3: "Резиденция Люкс",
          q4: "Спекулятивный"
        }
      },
      mix: {
        title: "Сегментация инвентаря",
        subtitle: "Соотношение компактных и просторных юнитов"
      }
    },
    setAnalysis: {
      amenitiesTitle: "Удобства и функции",
      unitCatsTitle: "Категории юнитов",
      distribution: "Распределение",
      setOperations: "Операции с множествами",
      intersection: "Пересечение (Все 3 проекта)",
      uniqueOfferings: "Уникальные предложения",
      noMatch: "Нет полного совпадения во всех трех.",
      commonAll3: "Общее (Все 3)",
      coralinaSerenity: "Только Coralina и Serenity",
      serenitySierra: "Только Serenity и Sierra",
      coralinaSierra: "Только Coralina и Sierra",
      coralinaOnly: "Только Coralina",
      serenityOnly: "Только Serenity",
      sierraOnly: "Только Sierra"
    },
    charts: {
      avgUnitSize: "Средняя площадь по категории (кв.м)",
      sizeDist: "Распределение по площади",
      sizeDistSubtitle: "Структура инвентаря по диапазонам размеров."
    },
    table: {
      title: "Реестр юнитов",
      project: "Проект",
      unitName: "Название",
      code: "Код",
      category: "Категория",
      size: "Площадь (кв.м)"
    }
  }
};

// Facility name mapping
export const facilityTranslations: Record<string, { en: string; ru: string }> = {
  'Swimming Pool': { en: 'Swimming Pool', ru: 'Бассейн' },
  'Fitness/Gym': { en: 'Fitness/Gym', ru: 'Фитнес/Зал' },
  'Co-Working Space': { en: 'Co-Working Space', ru: 'Коворкинг' },
  'Pet Friendly': { en: 'Pet Friendly', ru: 'Можно с питомцами' },
  'Onsen': { en: 'Onsen', ru: 'Онсэн' },
  'Steam Room': { en: 'Steam Room', ru: 'Паровая комната' },
  'Sauna': { en: 'Sauna', ru: 'Сауна' },
  'Theater/Karaoke': { en: 'Theater/Karaoke', ru: 'Кинотеатр/Караоке' },
  'Game Room/Arcade': { en: 'Game Room/Arcade', ru: 'Игровая комната' },
  'Kids Zone': { en: 'Kids Zone', ru: 'Детская зона' },
  'Laundry Service': { en: 'Laundry Service', ru: 'Прачечная' },
  'Co-Kitchen': { en: 'Co-Kitchen', ru: 'Общая кухня' },
  'Sky Lounge/Deck': { en: 'Sky Lounge/Deck', ru: 'Скай Лаунж' },
  'Library': { en: 'Library', ru: 'Библиотека' },
  'Shuttle Service': { en: 'Shuttle Service', ru: 'Трансфер' },
  'Meeting Room': { en: 'Meeting Room', ru: 'Переговорная' }
};

// Unit Category mapping
export const categoryTranslations: Record<string, { en: string; ru: string }> = {
  '1 Bedroom': { en: '1 Bedroom', ru: '1 Спальня' },
  '1 Bedroom Plus': { en: '1 Bedroom Plus', ru: '1 Спальня Плюс' },
  '2 Bedroom': { en: '2 Bedroom', ru: '2 Спальни' },
  '2 Bedroom Plus': { en: '2 Bedroom Plus', ru: '2 Спальни Плюс' },
  '3 Bedroom': { en: '3 Bedroom', ru: '3 Спальни' },
  '2 Bedroom Penthouse': { en: '2 Bedroom Penthouse', ru: 'Пентхаус (2 сп.)' },
  '3 Bedroom Penthouse': { en: '3 Bedroom Penthouse', ru: 'Пентхаус (3 сп.)' },
  'Penthouse': { en: 'Penthouse', ru: 'Пентхаус' }
};

// Layout Feature Categories
export const featureCategoryTranslations: Record<string, { en: string; ru: string }> = {
  'Orientation': { en: 'Orientation', ru: 'Ориентация' },
  'Facilities': { en: 'Facilities', ru: 'Инфраструктура' },
  'Parking': { en: 'Parking', ru: 'Парковка' },
  'Zoning': { en: 'Zoning', ru: 'Зонирование' }
};

export const translate = (text: string, lang: Language, mapping?: Record<string, { en: string; ru: string }>) => {
  if (mapping && mapping[text]) {
    return mapping[text][lang];
  }
  return text;
};