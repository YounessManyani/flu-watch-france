import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDepartments, getRiskLevel, calculateAverageHospitalizationRate } from "@/utils/dataParser";
import { Target, TrendingUp, AlertCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Prediction = () => {
  const departments = getDepartments();
  const [formData, setFormData] = useState({
    department: "",
    year: "",
    month: "",
  });
  const [prediction, setPrediction] = useState<{
    value: number;
    confidence: [number, number];
    risk: "low" | "medium" | "high";
  } | null>(null);

  const handlePredict = () => {
    // Simple prediction logic (in real app, this would call an ML API)
    const baseRate = calculateAverageHospitalizationRate();
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    const predicted = baseRate * randomFactor;
    const margin = predicted * 0.15;

    setPrediction({
      value: predicted,
      confidence: [predicted - margin, predicted + margin],
      risk: getRiskLevel(predicted),
    });
  };

  const isFormValid = formData.department && formData.year && formData.month;

  const comparisonData = [
    { year: 2020, value: 320 },
    { year: 2021, value: 280 },
    { year: 2022, value: 350 },
    { year: 2023, value: 310 },
    { year: 2024, value: 340 },
    { year: parseInt(formData.year) || 2025, value: prediction?.value || 0, predicted: true },
  ];

  const getRiskColor = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "low":
        return "text-success";
      case "medium":
        return "text-warning";
      case "high":
        return "text-destructive";
    }
  };

  const getRiskBg = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "low":
        return "bg-success/10";
      case "medium":
        return "bg-warning/10";
      case "high":
        return "bg-destructive/10";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Prédiction des Passages aux Urgences</h1>
          <p className="text-muted-foreground">Estimez le taux futur pour planifier les ressources</p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Paramètres de Prédiction</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="department">Département</Label>
              <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {departments.slice(0, 20).map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Année</Label>
              <Input
                id="year"
                type="number"
                min="2025"
                max="2030"
                placeholder="2025"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Mois</Label>
              <Select value={formData.month} onValueChange={(v) => setFormData({ ...formData, month: v })}>
                <SelectTrigger id="month">
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem key={month} value={month.toString()}>
                      {new Date(2000, month - 1).toLocaleString("fr-FR", { month: "long" })}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handlePredict} disabled={!isFormValid} className="w-full mt-6" size="lg">
            <Target className="mr-2 h-5 w-5" />
            Prédire le Taux
          </Button>
        </Card>

        {prediction && (
          <>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Résultat de la Prédiction</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-primary/5 rounded-lg">
                  <Target className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Taux prédit</p>
                  <p className="text-3xl font-bold text-primary">{prediction.value.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground mt-1">pour 10 000 habitants</p>
                </div>

                <div className="text-center p-6 bg-accent rounded-lg">
                  <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Intervalle de confiance</p>
                  <p className="text-lg font-semibold">
                    {prediction.confidence[0].toFixed(1)} - {prediction.confidence[1].toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Marge d'erreur ±15%</p>
                </div>

                <div className={`text-center p-6 ${getRiskBg(prediction.risk)} rounded-lg`}>
                  <AlertCircle className={`h-8 w-8 ${getRiskColor(prediction.risk)} mx-auto mb-2`} />
                  <p className="text-sm text-muted-foreground mb-1">Niveau de risque</p>
                  <p className={`text-2xl font-bold capitalize ${getRiskColor(prediction.risk)}`}>
                    {prediction.risk === "low" ? "Faible" : prediction.risk === "medium" ? "Moyen" : "Élevé"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {prediction.risk === "low" && "< 200 pour 10K"}
                    {prediction.risk === "medium" && "200-500 pour 10K"}
                    {prediction.risk === "high" && "> 500 pour 10K"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Comparaison avec les Années Précédentes</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Taux d'hospitalisation"
                    dot={{ fill: "hsl(var(--chart-1))", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default Prediction;
