```markdown
# 📱 ECO-fit — Application Mobile

**ECO-fit** est une application mobile de fitness écoresponsable.  
Elle récompense les utilisateurs en éco-points pour chaque activité physique réalisée (course, marche, recyclage, etc.).  
Ces points peuvent être échangés contre des **badges**, **récompenses** ou **réductions locales**.

---

## 🔧 Technologies utilisées

- **React Native (Expo)**
- **React Navigation**
- **Axios** (Appels API vers le backend)
- **AsyncStorage** (Stockage token & préférences)
- **Context API** (authentification & gestion des points)
- **react-native-maps** (suivi de course GPS)
- **react-native-chart-kit** (statistiques visuelles)
- **expo-notifications** (notifications locales)

---

## 🗂️ Structure du projet

`

src/
├── api/                 # Configuration de l’URL de l’API
├── assets/              # Images et illustrations
├── components/          # Composants réutilisables (carte activité, animation, etc.)
├── context/             # Contexte Auth & Points
├── hooks/               # Hooks personnalisés (run tracker, récompenses, etc.)
├── navigation/          # Stack & Tab navigation
├── screens/             # Ecrans principaux (Home, Stats, Défis, Profil, etc.)
├── styles/              # Fichiers de style séparés
└── utils/               # Fonctions utilitaires (notifications, calculs)



---

## ▶️ Lancer l’application

### 1. Installer les dépendances

```bash
npm install
````

### 2. Lancer l’application

```bash
npx expo start
```

Scanne le QR code avec ton téléphone ou utilise un simulateur.

> ⚠️ Assure-toi d’avoir Expo Go sur ton téléphone ou un émulateur Android/iOS actif.

---

## 📌 Fonctionnalités principales

### 🔓 Authentification

* Création de compte, connexion sécurisée via JWT
* Stockage token dans AsyncStorage

### 🏃 Suivi de course (RunTracker)

* Affichage carte (via `react-native-maps`)
* Suivi distance, durée, calories
* Ajout automatique d’activité + gain d’éco-points
* Notification à la fin de la course

### ➕ Activité manuelle

* Saisie d’une activité + capture photo obligatoire
* Ajout limité (1 fois tous les 2 jours)

### 🎯 Défis & Récompenses

* Liste de défis à valider (avec points associés)
* Récompenses à débloquer avec les points
* Animation de validation + mise à jour des points en live

### 🧮 Statistiques

* Graphique ligne : progression distance
* Camembert : répartition des activités

### 👤 Profil utilisateur

* Données personnelles (nom, âge, poids, taille)
* IMC calculé automatiquement
* Historique des badges
* Valeurs de l’application

---

## 💡 Gamification & UX

* ✅ Animation de validation
* 🎖 Système de badges (ex : Feuille Verte)
* 🔔 Notifications locales
* 🌿 Design vert et motivant
* 🧠 Gestion des éco-points dynamique via `PointsContext`

---

## 🔒 Sécurité

* Authentification JWT
* Vérification des tokens sur chaque requête
* Déconnexion sécurisée
* Aucune donnée sensible stockée en clair

---

## 📈 Améliorations futures

* Classement global / leaderboard
* Suivi calories & rythme cardiaque (via HealthKit/Google Fit)
* Mode multijoueur / défis entre amis
* Partenariats avec commerces bio

---



© 2025 ECO-fit — Tous droits réservés.

