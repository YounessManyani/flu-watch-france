import fluData from "@/data/flu-data.json";

export interface FluDataPoint {
  année: number;
  département: string;
  grippe_65_ans_et_plus: number;
  grippe_moins_de_65_ans_à_risque: number;
  "taux hospitalisation": number;
}

export const data: FluDataPoint[] = fluData as FluDataPoint[];

// Department code mapping (simplified - key departments)
export const departmentCodes: Record<string, string> = {
  "01": "Ain",
  "02": "Aisne",
  "03": "Allier",
  "04": "Alpes-de-Haute-Provence",
  "05": "Hautes-Alpes",
  "06": "Alpes-Maritimes",
  "07": "Ardèche",
  "08": "Ardennes",
  "09": "Ariège",
  "10": "Aube",
  "11": "Aude",
  "12": "Aveyron",
  "13": "Bouches-du-Rhône",
  "14": "Calvados",
  "15": "Cantal",
  "16": "Charente",
  "17": "Charente-Maritime",
  "18": "Cher",
  "19": "Corrèze",
  "21": "Côte-d'Or",
  "22": "Côtes-d'Armor",
  "23": "Creuse",
  "24": "Dordogne",
  "25": "Doubs",
  "26": "Drôme",
  "27": "Eure",
  "28": "Eure-et-Loir",
  "29": "Finistère",
  "30": "Gard",
  "31": "Haute-Garonne",
  "32": "Gers",
  "33": "Gironde",
  "34": "Hérault",
  "35": "Ille-et-Vilaine",
  "36": "Indre",
  "37": "Indre-et-Loire",
  "38": "Isère",
  "39": "Jura",
  "40": "Landes",
  "41": "Loir-et-Cher",
  "42": "Loire",
  "43": "Haute-Loire",
  "44": "Loire-Atlantique",
  "45": "Loiret",
  "46": "Lot",
  "47": "Lot-et-Garonne",
  "48": "Lozère",
  "49": "Maine-et-Loire",
  "50": "Manche",
  "51": "Marne",
  "52": "Haute-Marne",
  "53": "Mayenne",
  "54": "Meurthe-et-Moselle",
  "55": "Meuse",
  "56": "Morbihan",
  "57": "Moselle",
  "58": "Nièvre",
  "59": "Nord",
  "60": "Oise",
  "61": "Orne",
  "62": "Pas-de-Calais",
  "63": "Puy-de-Dôme",
  "64": "Pyrénées-Atlantiques",
  "65": "Hautes-Pyrénées",
  "66": "Pyrénées-Orientales",
  "67": "Bas-Rhin",
  "68": "Haut-Rhin",
  "69": "Rhône",
  "70": "Haute-Saône",
  "71": "Saône-et-Loire",
  "72": "Sarthe",
  "73": "Savoie",
  "74": "Haute-Savoie",
  "75": "Paris",
  "76": "Seine-Maritime",
  "77": "Seine-et-Marne",
  "78": "Yvelines",
  "79": "Deux-Sèvres",
  "80": "Somme",
  "81": "Tarn",
  "82": "Tarn-et-Garonne",
  "83": "Var",
  "84": "Vaucluse",
  "85": "Vendée",
  "86": "Vienne",
  "87": "Haute-Vienne",
  "88": "Vosges",
  "89": "Yonne",
  "90": "Territoire de Belfort",
  "91": "Essonne",
  "92": "Hauts-de-Seine",
  "93": "Seine-Saint-Denis",
  "94": "Val-de-Marne",
  "95": "Val-d'Oise",
};

export const getCodeFromName = (name: string): string | undefined => {
  return Object.entries(departmentCodes).find(([_, deptName]) => deptName === name)?.[0];
};

export const getDataByDepartmentAndYear = (department: string, year: number): FluDataPoint | undefined => {
  return data.find((d) => d.département === department && d.année === year);
};

export const getAvailableYears = (): number[] => {
  return [...new Set(data.map((d) => d.année))].sort();
};

export const getDepartments = (): string[] => {
  return [...new Set(data.map((d) => d.département))].sort();
};

export const calculateAverageHospitalizationRate = (year?: number): number => {
  const filtered = year ? data.filter((d) => d.année === year) : data;
  const sum = filtered.reduce((acc, d) => acc + d["taux hospitalisation"], 0);
  return filtered.length > 0 ? sum / filtered.length : 0;
};

export const getTopDepartments = (year: number, limit: number = 10): FluDataPoint[] => {
  return data
    .filter((d) => d.année === year)
    .sort((a, b) => b["taux hospitalisation"] - a["taux hospitalisation"])
    .slice(0, limit);
};

export const getRiskLevel = (rate: number): "low" | "medium" | "high" => {
  if (rate < 200) return "low";
  if (rate < 500) return "medium";
  return "high";
};
