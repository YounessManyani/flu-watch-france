import { useState } from "react";
import { getDataByDepartmentAndYear, departmentCodes, getRiskLevel } from "@/utils/dataParser";

interface FranceMapSVGProps {
  selectedDepartment: string | null;
  onDepartmentClick: (dept: string) => void;
  year: number;
}

export const FranceMapSVG = ({ selectedDepartment, onDepartmentClick, year }: FranceMapSVGProps) => {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  const getDepartmentColor = (deptCode: string) => {
    const deptName = departmentCodes[deptCode];
    if (!deptName) return "#E5E7EB";

    const data = getDataByDepartmentAndYear(deptName, year);
    if (!data) return "#E5E7EB";

    const risk = getRiskLevel(data["taux hospitalisation"]);
    if (risk === "low") return "#10B981";
    if (risk === "medium") return "#F59E0B";
    return "#EF4444";
  };

  // Simplified department positions (approximate centroids for metropolitan France)
  const departments = [
    { code: "01", name: "Ain", x: 460, y: 380 },
    { code: "02", name: "Aisne", x: 310, y: 180 },
    { code: "03", name: "Allier", x: 340, y: 380 },
    { code: "04", name: "Alpes-de-Haute-Provence", x: 540, y: 520 },
    { code: "05", name: "Hautes-Alpes", x: 560, y: 500 },
    { code: "06", name: "Alpes-Maritimes", x: 600, y: 540 },
    { code: "07", name: "Ardèche", x: 450, y: 470 },
    { code: "08", name: "Ardennes", x: 360, y: 140 },
    { code: "09", name: "Ariège", x: 220, y: 580 },
    { code: "10", name: "Aube", x: 360, y: 250 },
    { code: "11", name: "Aude", x: 280, y: 580 },
    { code: "12", name: "Aveyron", x: 300, y: 510 },
    { code: "13", name: "Bouches-du-Rhône", x: 480, y: 580 },
    { code: "14", name: "Calvados", x: 170, y: 160 },
    { code: "15", name: "Cantal", x: 310, y: 450 },
    { code: "16", name: "Charente", x: 130, y: 410 },
    { code: "17", name: "Charente-Maritime", x: 90, y: 410 },
    { code: "18", name: "Cher", x: 270, y: 330 },
    { code: "19", name: "Corrèze", x: 230, y: 440 },
    { code: "21", name: "Côte-d'Or", x: 420, y: 310 },
    { code: "22", name: "Côtes-d'Armor", x: 80, y: 240 },
    { code: "23", name: "Creuse", x: 250, y: 400 },
    { code: "24", name: "Dordogne", x: 160, y: 460 },
    { code: "25", name: "Doubs", x: 520, y: 320 },
    { code: "26", name: "Drôme", x: 480, y: 490 },
    { code: "27", name: "Eure", x: 210, y: 180 },
    { code: "28", name: "Eure-et-Loir", x: 230, y: 240 },
    { code: "29", name: "Finistère", x: 20, y: 250 },
    { code: "30", name: "Gard", x: 410, y: 540 },
    { code: "31", name: "Haute-Garonne", x: 220, y: 560 },
    { code: "32", name: "Gers", x: 180, y: 560 },
    { code: "33", name: "Gironde", x: 90, y: 490 },
    { code: "34", name: "Hérault", x: 350, y: 570 },
    { code: "35", name: "Ille-et-Vilaine", x: 110, y: 240 },
    { code: "36", name: "Indre", x: 230, y: 340 },
    { code: "37", name: "Indre-et-Loire", x: 180, y: 320 },
    { code: "38", name: "Isère", x: 500, y: 440 },
    { code: "39", name: "Jura", x: 490, y: 350 },
    { code: "40", name: "Landes", x: 80, y: 530 },
    { code: "41", name: "Loir-et-Cher", x: 210, y: 300 },
    { code: "42", name: "Loire", x: 410, y: 430 },
    { code: "43", name: "Haute-Loire", x: 370, y: 450 },
    { code: "44", name: "Loire-Atlantique", x: 90, y: 320 },
    { code: "45", name: "Loiret", x: 270, y: 280 },
    { code: "46", name: "Lot", x: 230, y: 500 },
    { code: "47", name: "Lot-et-Garonne", x: 160, y: 510 },
    { code: "48", name: "Lozère", x: 350, y: 510 },
    { code: "49", name: "Maine-et-Loire", x: 140, y: 310 },
    { code: "50", name: "Manche", x: 120, y: 160 },
    { code: "51", name: "Marne", x: 350, y: 200 },
    { code: "52", name: "Haute-Marne", x: 420, y: 250 },
    { code: "53", name: "Mayenne", x: 140, y: 260 },
    { code: "54", name: "Meurthe-et-Moselle", x: 520, y: 200 },
    { code: "55", name: "Meuse", x: 460, y: 200 },
    { code: "56", name: "Morbihan", x: 70, y: 300 },
    { code: "57", name: "Moselle", x: 560, y: 170 },
    { code: "58", name: "Nièvre", x: 340, y: 330 },
    { code: "59", name: "Nord", x: 310, y: 100 },
    { code: "60", name: "Oise", x: 280, y: 180 },
    { code: "61", name: "Orne", x: 170, y: 230 },
    { code: "62", name: "Pas-de-Calais", x: 260, y: 100 },
    { code: "63", name: "Puy-de-Dôme", x: 330, y: 430 },
    { code: "64", name: "Pyrénées-Atlantiques", x: 80, y: 580 },
    { code: "65", name: "Hautes-Pyrénées", x: 150, y: 580 },
    { code: "66", name: "Pyrénées-Orientales", x: 280, y: 610 },
    { code: "67", name: "Bas-Rhin", x: 600, y: 210 },
    { code: "68", name: "Haut-Rhin", x: 580, y: 280 },
    { code: "69", name: "Rhône", x: 440, y: 420 },
    { code: "70", name: "Haute-Saône", x: 500, y: 290 },
    { code: "71", name: "Saône-et-Loire", x: 420, y: 370 },
    { code: "72", name: "Sarthe", x: 180, y: 260 },
    { code: "73", name: "Savoie", x: 530, y: 440 },
    { code: "74", name: "Haute-Savoie", x: 540, y: 400 },
    { code: "75", name: "Paris", x: 260, y: 220 },
    { code: "76", name: "Seine-Maritime", x: 210, y: 150 },
    { code: "77", name: "Seine-et-Marne", x: 300, y: 230 },
    { code: "78", name: "Yvelines", x: 240, y: 220 },
    { code: "79", name: "Deux-Sèvres", x: 130, y: 370 },
    { code: "80", name: "Somme", x: 260, y: 130 },
    { code: "81", name: "Tarn", x: 260, y: 540 },
    { code: "82", name: "Tarn-et-Garonne", x: 220, y: 520 },
    { code: "83", name: "Var", x: 540, y: 570 },
    { code: "84", name: "Vaucluse", x: 470, y: 530 },
    { code: "85", name: "Vendée", x: 100, y: 360 },
    { code: "86", name: "Vienne", x: 170, y: 380 },
    { code: "87", name: "Haute-Vienne", x: 210, y: 420 },
    { code: "88", name: "Vosges", x: 540, y: 240 },
    { code: "89", name: "Yonne", x: 340, y: 290 },
    { code: "90", name: "Territoire de Belfort", x: 560, y: 310 },
    { code: "91", name: "Essonne", x: 260, y: 240 },
    { code: "92", name: "Hauts-de-Seine", x: 245, y: 220 },
    { code: "93", name: "Seine-Saint-Denis", x: 270, y: 210 },
    { code: "94", name: "Val-de-Marne", x: 275, y: 230 },
    { code: "95", name: "Val-d'Oise", x: 255, y: 200 },
  ];

  return (
    <div className="relative w-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-border">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2 text-center">Carte Interactive de France</h2>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#10B981" }}></div>
            <span className="text-muted-foreground">Faible (&lt; 200)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#F59E0B" }}></div>
            <span className="text-muted-foreground">Moyen (200-500)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#EF4444" }}></div>
            <span className="text-muted-foreground">Élevé (&gt; 500)</span>
          </div>
        </div>
      </div>

      <svg
        viewBox="0 0 650 650"
        className="w-full h-auto drop-shadow-lg"
        style={{ maxHeight: "600px" }}
      >
        {/* Background - France outline approximation */}
        <path
          d="M 580 200 Q 600 250, 590 300 Q 580 350, 550 400 Q 530 450, 520 500 Q 500 550, 450 580 Q 350 610, 280 615 Q 200 610, 150 590 Q 100 570, 80 540 Q 60 510, 50 480 Q 30 430, 40 380 Q 50 330, 70 300 Q 80 270, 90 250 Q 100 220, 110 200 Q 120 170, 140 150 Q 170 130, 200 120 Q 240 110, 270 105 Q 300 100, 320 95 L 340 90 L 360 95 L 380 105 L 400 115 L 430 130 L 460 145 L 490 160 L 520 175 L 550 185 L 580 200 Z"
          fill="#d1d5db"
          stroke="#9ca3af"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Departments as circles */}
        {departments.map(({ code, name, x, y }) => {
          const isSelected = selectedDepartment === name;
          const isHovered = hoveredDept === name;
          const color = getDepartmentColor(code);

          return (
            <g key={code}>
              <circle
                cx={x}
                cy={y}
                r={isSelected ? 22 : isHovered ? 20 : 18}
                fill={color}
                stroke={isSelected ? "#0066CC" : isHovered ? "#0066CC" : "white"}
                strokeWidth={isSelected ? 4 : isHovered ? 3 : 2}
                className="cursor-pointer transition-all duration-200 hover:drop-shadow-lg"
                style={{
                  filter: isSelected ? "drop-shadow(0 4px 8px rgba(0, 102, 204, 0.4))" : "none",
                  opacity: isSelected ? 1 : isHovered ? 0.95 : 0.85,
                }}
                onClick={() => onDepartmentClick(name)}
                onMouseEnter={() => setHoveredDept(name)}
                onMouseLeave={() => setHoveredDept(null)}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                className="pointer-events-none select-none"
                style={{
                  fontSize: isSelected ? "13px" : isHovered ? "12px" : "11px",
                  fontWeight: isSelected ? "bold" : "600",
                  fill: "white",
                  textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                }}
              >
                {code}
              </text>
            </g>
          );
        })}
      </svg>

      {hoveredDept && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-2 shadow-lg animate-fade-in">
          <p className="text-sm font-medium">{hoveredDept}</p>
        </div>
      )}
    </div>
  );
};
