# 🏥 Prédiction des Passages aux Urgences pour Grippe

Application web de visualisation et prédiction des taux de passages aux urgences pour grippe en France, utilisant le Machine Learning pour anticiper les pics épidémiques.

## 📋 Contexte

Cette application permet aux autorités sanitaires et hôpitaux de :

- 🗺️ **Visualiser** les données par département et année
- 📈 **Analyser** les tendances temporelles et géographiques
- 🔮 **Prédire** les taux futurs pour optimiser les ressources

### Objectif

Anticiper la pression sur le système de santé pour mieux préparer les hôpitaux et prendre des décisions préventives.

---

## 🚀 Fonctionnalités

### 1️⃣ Carte Interactive

- Sélection d'une année (2020-2024)
- Clic sur un département pour afficher :
  - Taux d'hospitalisation
  - Taux de vaccination par âge
  - Comparaison < 65 ans vs ≥ 65 ans

### 2️⃣ Dashboard Analytique

- **4 KPIs clés** :
  - Taux moyen national
  - Département avec le taux max
  - Taux de vaccination moyen
  - Nombre de départements en alerte
- **Graphiques** :
  - Évolution temporelle (ligne)
  - Top 10 départements (barres)
  - Distribution par âge (barres empilées)

### 3️⃣ Prédiction ML

- Formulaire avec paramètres :
  - Département, Région, Classe d'âge
  - Année, Mois, Semaine
- Résultats :
  - Taux prédit
  - Intervalle de confiance
  - Niveau de risque (Faible/Moyen/Élevé)

---

## 🛠️ Technologies

### Frontend

- **React** + TypeScript
- **Tailwind CSS** pour le design
- **Recharts** pour les graphiques
- **React Router** pour la navigation
- **Lucide React** pour les icônes

### Machine Learning

- **Modèles testés** :
  - Random Forest (R² = 0.80)
  - XGBoost (R² = 0.82)
  - Gradient Boosting (R² = 0.75)
  - MLP Neural Network (R² = 0.78)
- **Feature Engineering** :
  - Cyclicité temporelle (sin/cos)
  - Période épidémique
  - Agrégations par région/âge

---

## 📊 Structure des Données

### Colonnes principales

```json
{
  "1er jour de la semaine": "2020-12-21",
  "Département": "Paris",
  "Région": "Île-de-France",
  "Classe d'âge": "65 ans ou plus",
  "Taux de passages aux urgences pour grippe": 456.78,
  "Taux d'hospitalisations après passages": 89.12,
  "year": 2020,
  "mois": 12,
  "Semaine_num": 52
}
```

### Features engineered

- `mois_sin`, `mois_cos` : Cyclicité des mois
- `semaine_sin`, `semaine_cos` : Cyclicité des semaines
- `saison` : Hiver, Printemps, Été, Automne
- `periode_grippe` : Octobre à Mars (1/0)
- `region_hosp_mean` : Moyenne régionale
- `age_risque` : 65+ et 0-4 ans (1/0)

---

## 🎯 Utilisation

### Utilisation de l'application

#### 1. Visualisation (Carte)

1. Sélectionner une année (2020-2024)
2. Cliquer sur un département
3. Observer les statistiques à droite

#### 2. Dashboard

1. Appliquer des filtres (année, région, âge)
2. Consulter les KPIs
3. Analyser les graphiques

#### 3. Prédiction

1. Remplir le formulaire :
   - Département : Paris
   - Région : Île-de-France
   - Classe d'âge : 65 ans ou plus
   - Année : 2025
   - Mois : 1 (Janvier)
   - Semaine : 3
2. Cliquer sur "Prédire"
3. Voir le résultat et le niveau de risque

## 📊 KPIs Expliqués

### 1. Taux Moyen

Moyenne nationale du taux de passages aux urgences pour 10 000 habitants sur la période sélectionnée.

### 2. Hospitalisation Max

Département avec le plus haut taux d'hospitalisation après passage aux urgences.

### 3. Taux Vaccination

Pourcentage moyen de personnes vaccinées contre la grippe (toutes tranches d'âge).

### 4. Départements en Alerte

Nombre de départements dépassant le seuil critique de 500 passages pour 10 000 habitants.

## 👥 Contributeurs

- **Youness Manyani** - Data Science & Développement

**⚕️ Fait avec ❤️ pour améliorer la santé publique**
