import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, TrendingUp, Shield, AlertTriangle } from "lucide-react";
import { getAvailableYears, calculateAverageHospitalizationRate, getTopDepartments, data } from "@/utils/dataParser";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const Dashboard = () => {
  const years = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState<number>(years[years.length - 1]);

  const avgRate = calculateAverageHospitalizationRate(selectedYear);
  const topDepts = getTopDepartments(selectedYear, 10);
  const maxDept = topDepts[0];
  const alertDepts = data.filter((d) => d.année === selectedYear && d["taux hospitalisation"] > 500).length;

  const yearData = data.filter((d) => d.année === selectedYear);
  const avgVacc65Plus = yearData.reduce((sum, d) => sum + d.grippe_65_ans_et_plus, 0) / yearData.length;

  const ageGroupData = [
    { name: "< 65 ans", value: yearData.reduce((sum, d) => sum + d.grippe_moins_de_65_ans_à_risque, 0) / yearData.length },
    { name: "≥ 65 ans", value: avgVacc65Plus },
  ];

  const COLORS = ["hsl(var(--chart-2))", "hsl(var(--chart-1))"];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Statistiques</h1>
          <p className="text-muted-foreground">Vue d'ensemble des indicateurs clés</p>
        </div>

        <Card className="p-4">
          <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Année" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taux moyen</p>
                <p className="text-2xl font-bold">{avgRate.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">pour 10K hab.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hosp. max</p>
                <p className="text-2xl font-bold">{maxDept?.["taux hospitalisation"] || 0}</p>
                <p className="text-xs text-muted-foreground">{maxDept?.département}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-success/10 rounded-lg">
                <Shield className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Vaccination ≥65</p>
                <p className="text-2xl font-bold">{avgVacc65Plus.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Moyenne nationale</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dépts en alerte</p>
                <p className="text-2xl font-bold">{alertDepts}</p>
                <p className="text-xs text-muted-foreground">Taux &gt; 500</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Top 10 Départements</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topDepts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="département" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="taux hospitalisation" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Vaccination par Groupe d'Âge</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={ageGroupData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value.toFixed(1)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ageGroupData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
