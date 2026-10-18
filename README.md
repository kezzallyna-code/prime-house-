# PRIME HOUSE — CONSOLE D'ADMINISTRATION & PORTAIL IMMOBILIER DE LUXE (ALGÉRIE)

Bienvenue sur la documentation technique de la console d'administration de **Prime House**, le portail de référence pour l'immobilier de prestige et les actifs d'exception en Algérie (Alger, Oran, Constantine, Annaba, Tipaza, etc.).

---

## 1. Sommaire des Livrables

- **Code source complet de la console d'administration** (`/admin/` et `/js/admin.js`, `/js/supabase-client.js`)
- **Serveur backend Node.js avec API REST et protection serveur** (`server.js`)
- **Migrations SQL versionnées pour PostgreSQL & Supabase** (`/supabase/migrations/`)
- **Modèle de configuration d'environnement** (`.env.example`)
- **Base de données persistante de secours & démo** (`/data/database.json`)
- **Instructions détaillées pour le déploiement et la création du premier administrateur**

---

## 2. Architecture & Choix Technologiques

- **Frontend** : HTML5 sémantique, Tailwind CSS (Design System Prime House : Bleu nuit `#071426`, Or `#C49A3A`, Blanc `#FFFFFF`), Google Fonts (*Playfair Display*, *Plus Jakarta Sans*, *Outfit*), Google Material Symbols.
- **Backend & Serveur** : Node.js (moteur HTTP natif, gestionnaire de sessions chiffrées, API REST, middleware de protection de routes).
- **Base de données principale** : Supabase PostgreSQL (avec Row Level Security RLS et triggers `updated_at`).
- **Stockage d'images** : Supabase Storage (bucket public `properties` pour les visuels WebP/JPG/PNG haute définition, et bucket privé `documents` pour les actes notariés et livrets fonciers).
- **Mode Résilience & Local** : En l'absence temporaire de clés Supabase dans `.env`, le serveur bascule automatiquement et de façon transparente sur le moteur persistant local (`/data/database.json`), assurant 100% de disponibilité opérationnelle pour les tests locaux.

---

## 3. Structure des Migrations de Base de Données

Les migrations se trouvent dans le dossier `supabase/migrations/` :

1. `20261018000001_prime_house_schema.sql` :
   - Schéma relationnel complet :
     - `profiles` : Administrateurs, modérateurs et directeurs (reliés à `auth.users`).
     - `categories` : Typologies (Villa contemporaine, Penthouse, Duplex, etc.).
     - `wilayas` : Découpage administratif algérien avec communes de prestige.
     - `properties` : Biens fonciers (prix numérique `NUMERIC(15,2)`, surfaces, coordonnées cadastrales, statuts).
     - `property_images` : Galerie photos avec indicateur d'image principale et ordre.
     - `inquiries` : Demandes d'acquéreurs et requêtes de conciergerie privée.
     - `visits` : Visites privées planifiées avec agent d'escorte assigné.
     - `site_settings` : Paramètres de l'agence, adresses chancelleries, numéros VIP WhatsApp.
     - `moderation_history` : Journal d'audit des approbations et rejets de mandats.
   - Sécurité **Row Level Security (RLS)** activée sur l'ensemble des tables avec politiques strictes.

2. `20261018000002_seed_data.sql` :
   - Données initiales réalistes du marché immobilier de prestige algérien (Hydra, Club des Pins, Val d'Hydra, El Biar, Canastel Oran, etc.).
   - Catégories, 8 wilayas initiales (sur les 58) et paramètres de conciergerie.

3. `20261018000003_storage_policies.sql` :
   - Configuration des buckets `properties` (public en lecture, écriture réservée aux administrateurs) et `documents` (privé).

---

## 4. Configuration & Installation Locale

### Étape 1 : Cloner le dépôt et naviguer dans le dossier
```bash
cd "c:\Users\Power-info\Desktop\prime house"
```

### Étape 2 : Configurer le fichier d'environnement
Copiez `.env.example` en `.env` :
```bash
cp .env.example .env
```
Éditez le fichier `.env` avec vos informations :
```ini
PORT=3000
SUPABASE_URL=https://votre-projet.supabase.co
SUPABASE_ANON_KEY=votre-cle-publique-anon
SUPABASE_SERVICE_ROLE_KEY=votre-cle-secrete-service-role
ADMIN_SESSION_SECRET=cle_secrete_aleatoire_de_signature
```

### Étape 3 : Lancer l'application
```bash
npm run dev
# ou
node server.js
```
Ouvrez votre navigateur :
- **Portail Public** : `http://localhost:3000/index.html`
- **Console d'Administration** : `http://localhost:3000/admin/index.html`
- **Connexion Privée Administrateur** : `http://localhost:3000/admin/login.html`

---

## 5. Procédure Sécurisée : Créer le Premier Administrateur

### Option A : Dans Supabase Cloud (Recommandé en Production)

1. Rendez-vous dans votre console **Supabase** -> **Authentication** -> **Users**.
2. Cliquez sur **Add user** -> **Create user** :
   - Email : `direction@primehouse-dz.com`
   - Password : *Définissez un mot de passe robuste*
   - Auto Confirm User? : **Oui**
3. Ouvrez le **SQL Editor** dans Supabase et exécutez la requête suivante pour accréditer ce compte en tant que Super-Admin :
```sql
INSERT INTO public.profiles (id, email, full_name, role, matricule, title)
SELECT 
    id, 
    email, 
    'Karim Benali', 
    'super_admin', 
    'ADM-DZ-01', 
    'Directeur Exécutif'
FROM auth.users 
WHERE email = 'direction@primehouse-dz.com'
ON CONFLICT (id) DO UPDATE SET 
    role = 'super_admin',
    is_active = true;
```

### Option B : Mode Local / Démo Immédiat
Le serveur intègre deux profils administratifs pré-configurés pour tester directement sans configuration préalable :
- **Super-Admin** :
  - Identifiant : `direction@primehouse-dz.com` (ou matricule `ADM-DZ-01`)
  - Clé Maîtresse : `admin123`
  - Rôle : Accès total à la supervision, au parc, aux paramètres et aux exports.
- **Directeur Modération** :
  - Identifiant : `moderation@primehouse-dz.com` (ou matricule `ADM-DZ-02`)
  - Clé Maîtresse : `admin123`
  - Rôle : Audit foncier, validation notariale et arbitrages des annonces.

---

## 6. Guide des Fonctionnalités de la Console

| Page Admin | Route | Fonctionnalités Clés |
|---|---|---|
| **Connexion Privée** | `/admin/login.html` | Authentification cryptographique, protection CSRF, tokens de session, redirection automatique. |
| **Tableau de bord** | `/admin/index.html` | KPIs réels : Volume géré en Milliards DA, total des biens, répartition ventes/locations, modération urgente, leads récents, export du registre. |
| **Tous les Biens** | `/admin/biens.html` | Grille et tableau complet, filtres dynamiques (wilaya, catégorie, transaction, statut), recherche temps réel, pagination, modal d'aperçu, suppression sécurisée, publication en 1 clic. |
| **Ajouter un bien** | `/admin/ajouter-bien.html` | Formulaire multi-étapes (8 sections), téléversement multiple de photos, glisser-déposer, réordonnancement, choix de l'image principale, enregistrement en brouillon ou publication directe. Supporte le mode création et le mode édition (`?id=...`). |
| **Biens en modération** | `/admin/moderation.html` | File d'attente d'arbitrage foncier, consultation intégrale des dossiers particuliers/agences, approbation en direct, rejet avec motif légal notifié. |
| **Biens à la Une** | `/admin/vitrine.html` | **Page Vitrine obligatoire**, ordonnancement des 6 emplacements vedettes de la page d'accueil, boutons monter/descendre, ajout de biens publiés via modal avec détection des doublons, retrait sans suppression du bien. Synchronisation directe avec l'accueil. |
| **Demandes & Visites** | `/admin/demandes.html` | Suivi des leads et contacts, mise à jour des statuts (Nouveau, Contacté, etc.), planification de visites privées avec date et agent d'escorte, ajout de notes confidentielles, export CSV. |
| **Catégories & Wilayas** | `/admin/categories-wilayas.html` | Gestion des 58 Wilayas algériennes et communes d'élite, gestion des typologies d'architecture, protection anti-suppression si des biens y sont rattachés. |
| **Paramètres du site** | `/admin/parametres.html` | Identité officielle Prime House, coordonnées des sièges d'Alger et d'Oran, passerelle WhatsApp VIP, réseaux sociaux, paramètres de cache et devise DZD. |

---

## 7. Sécurité & Protection des Données

1. **Protection des routes côté serveur** : Tout accès direct aux fichiers `/admin/*.html` sans cookie de session actif redirige immédiatement en HTTP 302 vers `/admin/login.html`.
2. **Row Level Security (RLS)** : Les requêtes publiques sont limitées aux biens dont `publication_status = 'publie'`. Les tables sensibles (`inquiries`, `visits`, `moderation_history`) ne sont jamais lisibles par des utilisateurs non authentifiés.
3. **Protection des prix** : Tous les montants financiers utilisent le type SQL `NUMERIC(15,2)` pour éliminer tout risque d'arrondi sur les devises de forte valeur (Milliards DA).
4. **Intégrité référentielle** : Suppression protégée des catégories et wilayas utilisées par des mandats actifs.

---

## 8. Déploiement en Production

1. **Base de données & Stockage** :
   - Exécutez les fichiers SQL de `supabase/migrations/` dans le **SQL Editor** de votre instance Supabase.
2. **Hébergement Node.js (Vercel, Render, Railway, DigitalOcean, VPS DZ)** :
   - Définissez les variables d'environnement dans votre tableau de bord d'hébergement (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_SESSION_SECRET`, `PORT`).
   - Commande de démarrage : `node server.js` ou `npm start`.
