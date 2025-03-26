# Mod_Scope

**Mod_Scope** est un outil de veille automatisée pour la modération sur la plateforme **Bluesky**, développé avec [Bun](https://bun.sh/). Il utilise un **compte lurk** (lecture seule) pour surveiller plusieurs comptes ciblés, détecter les messages suspects en fonction de mots-clés sensibles, et archiver les publications problématiques dans des fichiers JSON.

## Fonctionnalités

- Surveillance de plusieurs comptes Bluesky.
- Détection automatique de messages contenant des infractions (violence, harcèlement, etc.).
- Sauvegarde des messages suspects dans `suspects/suspects.json`.
- Évite les doublons grâce à l’historique des URIs scannées (`scanned/uris.json`).
- Création automatique des dossiers nécessaires.

## Structure du projet

```
Mod_Scope/
├── index.ts
├── accounts.json
├── analyzer/
│   └── infractions.ts
├── suspects/
│   └── suspects.json
├── scanned/
│   └── uris.json
├── .env
├── utils/
│   └── blueskyClient.ts
```

##  Installation

1. Installe [Bun](https://bun.sh/)
2. Clone le projet :
```bash
git clone https://github.com/PotiteBulle/Mod_Scope.git
cd Mod_Scope
```
3. Installe les dépendances :
```bash
bun install
```

4. Crée un fichier `.env` :
```env
BLUESKY_IDENTIFIER=ton_mail@exemple.com
BLUESKY_PASSWORD=ton_mot_de_passe
```

5. Crée un fichier `accounts.json` avec les comptes à surveiller :
```json
[
  "compte1.bsky.social",
  "compte2.bsky.social"
]
```

## Personnalisation

Ajoutez ou modifiez les mots-clés dans `analyzer/infractions.ts` :

```ts Exemple d'infraction via des keywords
export const infractionKeywords = [
  "pédophile", "viol", "suicide", "harcèlement"
];
```

## Usage

Lancer une analyse manuelle :
```bash
bun run index.ts
```

Les messages suspects seront automatiquement sauvegardés.

## Licence

Projet libre et open-source sous [licence MIT](https://github.com/PotiteBulle/Mod_Scope/blob/main/LICENSE)
