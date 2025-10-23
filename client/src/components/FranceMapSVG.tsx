import { useState } from "react";
import { getDataByDepartmentAndYear, departmentCodes, getRiskLevel } from "@/utils/dataParser";
import franceDepartments from "@svg-maps/france.departments";

interface FranceMapSVGProps {
  selectedDepartment: string | null;
  onDepartmentClick: (dept: string) => void;
  year: number;
}

export const FranceMapSVG = ({ selectedDepartment, onDepartmentClick, year }: FranceMapSVGProps) => {
  const [hoveredDept, setHoveredDept] = useState<string | null>(null);

  const getDepartmentColor = (deptId: string) => {
    const deptName = departmentCodes[deptId];
    if (!deptName) return "#E5E7EB";

    const data = getDataByDepartmentAndYear(deptName, year);
    if (!data) return "#E5E7EB";

    const risk = getRiskLevel(data["taux hospitalisation"]);
    if (risk === "low") return "#10B981";
    if (risk === "medium") return "#F59E0B";
    return "#EF4444";
  };

  const handleLocationClick = (event: React.MouseEvent<SVGPathElement>) => {
    const deptId = event.currentTarget.getAttribute("id");
    if (deptId && departmentCodes[deptId]) {
      const deptName = departmentCodes[deptId];
      onDepartmentClick(deptName);
    }
  };

  const handleLocationMouseEnter = (event: React.MouseEvent<SVGPathElement>) => {
    const deptId = event.currentTarget.getAttribute("id");
    if (deptId && departmentCodes[deptId]) {
      setHoveredDept(departmentCodes[deptId]);
    }
  };

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
        viewBox={franceDepartments.viewBox}
        className="w-full h-auto drop-shadow-lg"
        style={{ maxHeight: "700px" }}
      >
        {franceDepartments.locations.map((location) => {
          const deptId = location.id;
          const deptName = departmentCodes[deptId];
          const isSelected = selectedDepartment === deptName;
          const isHovered = hoveredDept === deptName;
          const color = getDepartmentColor(deptId);

          return (
            <path
              key={deptId}
              id={deptId}
              d={location.path}
              fill={color}
              stroke={isSelected ? "#0066CC" : isHovered ? "#0066CC" : "white"}
              strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
              className="cursor-pointer transition-all duration-200"
              style={{
                filter: isSelected ? "drop-shadow(0 4px 8px rgba(0, 102, 204, 0.4))" : "none",
                opacity: isSelected ? 1 : isHovered ? 0.95 : 0.85,
              }}
              onClick={handleLocationClick}
              onMouseEnter={handleLocationMouseEnter}
              onMouseLeave={() => setHoveredDept(null)}
            />
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
