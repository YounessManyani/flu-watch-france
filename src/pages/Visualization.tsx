import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FranceMap } from "@/components/FranceMap";
import { DepartmentInfo } from "@/components/DepartmentInfo";
import { getAvailableYears } from "@/utils/dataParser";
import { Calendar } from "lucide-react";

const Visualization = () => {
  const years = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState<number>(years[years.length - 1]);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Visualisation des Passages aux Urgences pour Grippe
          </h1>
          <p className="text-muted-foreground">
            Cliquez sur un département pour voir les détails
          </p>
        </div>

        <Card className="p-4">
          <div className="flex items-center gap-3 max-w-xs">
            <Calendar className="h-5 w-5 text-primary" />
            <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez l'année" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <FranceMap
              selectedDepartment={selectedDepartment}
              onDepartmentClick={setSelectedDepartment}
              year={selectedYear}
            />
          </Card>

          <div className="lg:col-span-1">
            <DepartmentInfo department={selectedDepartment} year={selectedYear} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
