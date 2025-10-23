import { getDataByDepartmentAndYear, departmentCodes, getRiskLevel } from "@/utils/dataParser";

interface FranceMapProps {
  selectedDepartment: string | null;
  onDepartmentClick: (dept: string) => void;
  year: number;
}

export const FranceMap = ({ selectedDepartment, onDepartmentClick, year }: FranceMapProps) => {
  const getDepartmentColor = (deptCode: string) => {
    const deptName = departmentCodes[deptCode];
    if (!deptName) return "hsl(var(--muted))";

    const data = getDataByDepartmentAndYear(deptName, year);
    if (!data) return "hsl(var(--muted))";

    const risk = getRiskLevel(data["taux hospitalisation"]);
    if (risk === "low") return "hsl(var(--success))";
    if (risk === "medium") return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  // Simplified visualization - grid of department cards
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center">Carte de France Interactive</h2>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        Cliquez sur un département pour voir les détails
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-[600px] overflow-y-auto">
        {Object.entries(departmentCodes).map(([code, name]) => {
          const isSelected = selectedDepartment === name;
          const color = getDepartmentColor(code);

          return (
            <button
              key={code}
              onClick={() => onDepartmentClick(name)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200
                ${isSelected ? "border-primary scale-105 shadow-lg" : "border-border hover:border-primary/50"}
                ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}
              `}
              style={{ backgroundColor: color, opacity: isSelected ? 1 : 0.7 }}
            >
              <div className="text-xs font-bold text-white drop-shadow-md">{code}</div>
              <div className="text-[10px] text-white/90 drop-shadow-md leading-tight mt-1 line-clamp-2">
                {name}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
