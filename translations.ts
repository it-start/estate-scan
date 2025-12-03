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
      unitSize: "Unit Size (SQ.M)",
      unitCategories: "Unit Categories",
      subCategories: "Sub-Categories",
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
      viewMap: "View Map"
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
        buildings: "Buildings"
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
      unitSize: "Площадь (кв.м)",
      unitCategories: "Категории юнитов",
      subCategories: "Подкатегории",
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
      viewMap: "Карта"
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
        buildings: "Количество зданий"
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