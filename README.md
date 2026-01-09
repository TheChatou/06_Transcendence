# 🕹️ Transcendence  
*Plateforme Web multijoueur en temps réel — jeux, tournois, profils, onboarding guidé.*

---

## 🧠 Mon rôle & implications techniques

Je me suis occupé de **l’intégralité du frontend** du projet, ainsi que de la **direction artistique globale** et de la cohérence UX de l’application.

Cela m’a permis de monter en compétence sur **Tailwind CSS**, **Vite** et **TypeScript**, tout en construisant une interface riche, lisible et réactive.  
J’ai également développé **le jeu Pong**, l’ensemble du **système de tournois et de matchmaking**, ainsi qu’une **démo jouable d’un second jeu original : CrossWord-Snake** — un concept que j’aimerais approfondir plus tard pour en faire un jeu standalone téléchargeable.

Nous avons fait le choix assumé de ne pas déployer le projet en ligne et de **ne pas utiliser de modules distants** pour les jeux.  
À la place, nous avons adopté un concept volontairement **“arcade”**, fidèle à l’époque de création de Pong :  
des parties **1vs1 sur une seule machine**, et un format de tournoi inspiré du **King of the Hill**, où les joueurs s’enchaînent physiquement.

Dans cette logique, les jeux sont **entièrement codés côté frontend en TypeScript**, sans routes dédiées ni WebSockets pour le gameplay.  
Ce choix met l’accent sur la **lisibilité du code**, la gestion des états de jeu et l’expérience utilisateur locale, plutôt que sur une architecture réseau imposée.


---

## 🎯 À quoi sert Transcendence ?

Transcendence est le projet final du **Common Core** de l’École 42.  
L’objectif est de concevoir une **application web complète**, structurée comme une véritable plateforme arcade moderne, intégrant :

- Un système d’authentification sécurisé (OAuth 42)
- Des profils utilisateurs persistants avec statistiques
- Une navigation fluide en **Single Page Application**
- Des jeux compétitifs pensés pour le **jeu local**, inspirés de l’arcade classique
- Des formats de tournois adaptés à cette philosophie (ex : *King of the Hill*)

Le projet met volontairement l’accent sur **l’expérience utilisateur, la lisibilité du code frontend et la cohérence produit**, plutôt que sur une sur-ingénierie réseau imposée.  
Transcendence est pensé comme une **borne d’arcade logicielle**, fidèle à l’héritage de Pong.


---

### 🏠 Home — Direction artistique & structure

<p align="center">
  <img src="docs/transcendence/home.png" width="900">
  <br>
  <em>Home page — Hub principal, pensée comme une une de journal arcade des années 70</em>
</p>

Dès la page d’accueil, j’ai voulu poser une **identité visuelle forte**, directement liée au cœur du projet : **Pong**, le tout premier jeu vidéo.  
L’idée était de transporter l’utilisateur à l’époque de sa création, en adoptant une **esthétique de journal papier des années 70**, mêlant typographie expressive, mise en page en colonnes et hiérarchie éditoriale très marquée.

La home est structurée comme une véritable page de presse :

- **L’article principal** présente le projet *Transcendence*, notre équipe de quatre, et le travail global fourni.
- **La troisième colonne** agit comme un encadré technique, listant les modules supplémentaires que nous avons choisis et implémentés.
- **La dernière colonne** sert de navigation éditoriale, avec des liens vers les différentes sections clés de la plateforme.

Cette approche permet de poser immédiatement le ton :  
on n’est pas sur une simple application scolaire, mais sur une **plateforme arcade cohérente**, pensée comme un produit à part entière.


### 🧭 Onboarding & Authentification


![Accueil — Hub principal](docs/transcendence/login.png)


- **Auth 42 OAuth** — login sécurisé avec la plateforme 42.
- **Création de compte & prénom, avatar** — UX claire dès le premier écran.
- **Validation d’erreurs / retours utilisateurs** pour guider sans frustration.

---

### 🏠 Dashboard & Navigation

<p align="center">
  <img src="docs/transcendence/hubGames.png" width="900">
  <br>
  <em>Dashboard — Hub central regroupant jeux, tournois et navigation principale</em>
</p>

- **Hub de jeux** servant de point d’entrée principal.
- **Navigation SPA** fluide, sans rechargement de page.
- Centralisation des accès aux profils, jeux et tournois dans une interface lisible et hiérarchisée.

---

### 👤 Profils Utilisateurs

<p align="center">
  <img src="docs/transcendence/profile.png" width="900">
  <br>
  <em>Profil utilisateur — statistiques, identité et historique de jeu</em>
</p>

- **Statistiques persistantes** : victoires, défaites, historique.
- Gestion de l’identité utilisateur (avatar, infos publiques).
- UI pensée pour rester claire même avec beaucoup d’informations.

---

### 🎮 Jeux — Pong & modules expérimentaux

<p align="center">
  <a href="docs/transcendence/tGame.mp4">
    <img src="docs/transcendence/PlayPong.png" width="900">
  </a>
  <br>
  <em>Pong — gameplay 1vs1 local, inspiré des bornes d’arcade originales</em>
</p>

<p align="center">
  <a href="docs/transcendence/snake.mp4">
    <img src="docs/transcendence/Capture_snake.png" width="900">
  </a>
  <br>
  <em>CrossWord-Snake — prototype de second jeu mêlant logique arcade et réflexion</em>
</p>

Les jeux de Transcendence sont volontairement pensés pour le **jeu local**, en cohérence avec l’héritage de Pong et l’esthétique arcade du projet.

- **Pong** est entièrement codé en **TypeScript côté frontend**, avec une gestion fine des états de jeu, du score et du rythme des parties.
- **CrossWord-Snake** est un second module expérimental, conçu comme une démo jouable, explorant une autre approche du jeu arcade.

Aucune logique réseau n’est utilisée pour le gameplay :  
les jeux sont exécutés **localement sur une seule machine**, mettant l’accent sur la clarté du code, la stabilité des états et l’expérience utilisateur immédiate.

---

## 🧠 Complexité technique (Pourquoi ça pèse)

- **Architecture SPA** complète avec gestion fine des états UI.
- **Jeux codés intégralement en frontend**, sans moteur externe.
- Gestion rigoureuse des transitions, scores et états de parties.
- **UX sans friction** : feedbacks visuels, erreurs guidées, navigation claire.
- Direction artistique cohérente appliquée à l’ensemble de l’interface.

---

## 🛠️ Tech Stack

- **Frontend** : TypeScript, Vite
- **UI / Styles** : Tailwind CSS
- **Architecture** : Single Page Application
- **DevOps** : Docker (environnement de développement)

*(Les choix backend suivent les contraintes du sujet Transcendence de l’école 42.)*

---

## 🧪 Comment lancer en local

1. **Cloner**
    ```bash
    git clone https://github.com/TheChatou/06_Transcendence.git
    ```

2. **Docker**
    ```bash
    docker compose up --build
    ```

3. **Ouvrir**
    > https://localhost:8080

*(ajuster selon ton env)*

---

## 📚 Liens utiles

- Sujet officiel 42 – Transcendence (architecture / obligations)
- Figma / UX flows (si disponibles)
- Post-mortem ou notes de dev (`docs/notes/`)

---

## 💡 À améliorer / Roadmap

- 🇬🇧 Version anglaise complète
- Système de **matchmaking ELO**
- Tournois publics & spectateurs
- UI dark mode / thèmes custom

---

> 💭 Ce README est là pour **montrer la portée du projet**, ce que tu as fait, et **comment chaque écran / section reflète une vraie complexité technique + design** — pas juste “ça marche”.

---

