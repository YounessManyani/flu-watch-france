import { Card } from "@/components/ui/card";
import { getDataByDepartmentAndYear, getCodeFromName } from "@/utils/dataParser";
import { Hospital, Shield } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface DepartmentInfoProps {
  department: string | null;
  year: number;
}

export const DepartmentInfo = ({ department, year }: DepartmentInfoProps) => {
  if (!department) {
    return (
      <Card className="p-8 h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Hospital className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Sélectionnez un département sur la carte pour voir les informations détaillées</p>
        </div>
      </Card>
    );
  }

  const data = getDataByDepartmentAndYear(department, year);
  const code = getCodeFromName(department);

  if (!data) {
    return (
      <Card className="p-8 h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p>Aucune donnée disponible pour ce département en {year}</p>
        </div>
      </Card>
    );
  }

  const vaccinationData = [
    {
      group: "< 65 ans à risque",
      taux: data.grippe_moins_de_65_ans_à_risque,
    },
    {
      group: "≥ 65 ans",
      taux: data.grippe_65_ans_et_plus,
    },
  ];

  const pieData = [
    { name: "< 65 ans", value: data.grippe_moins_de_65_ans_à_risque },
    { name: "≥ 65 ans", value: data.grippe_65_ans_et_plus },
  ];

  const COLORS = ["hsl(var(--chart-2))", "hsl(var(--chart-1))"];

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{department}</h2>
            <p className="text-sm text-muted-foreground">
              Département {code} • Année {year}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary rounded-lg">
            <Hospital className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Taux d'hospitalisation</p>
            <p className="text-3xl font-bold text-primary">{data["taux hospitalisation"]}</p>
            <p className="text-xs text-muted-foreground">pour 10 000 habitants</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-secondary" />
          <h3 className="font-semibold">Taux de Vaccination</h3>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={vaccinationData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="group" type="category" width={120} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Bar dataKey="taux" fill="hsl(var(--chart-2))" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Répartition Vaccination par Groupe d'Âge</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.value}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip formatter={(value) => `${value}%`} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};
