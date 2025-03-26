import { createBlueskyClient } from "./utils/blueskyClient"; // Connexion au compte lurk
import { isSuspect } from "./analyzer/infractions"; // Fonction de détection
import { writeFileSync, existsSync, readFileSync, mkdirSync } from "fs"; // Modules pour lire/écrire des fichiers

// Création automatique des dossiers "suspects" et "scanned"
["suspects", "scanned"].forEach(dir => {
    if (!existsSync(dir)) mkdirSync(dir);
});

// Chemins des fichiers de sauvegarde
const suspectFile = "./suspects/suspects.json";
const scannedFile = "./scanned/uris.json";
const accountsFile = "./accounts.json";

// Chargement des messages suspects précédents
let suspects: any[] = existsSync(suspectFile)
    ? JSON.parse(readFileSync(suspectFile, "utf-8"))
    : [];

// Chargement des URI déjà scannées (Set pour éviter les doublons)
let scannedUris: Set<string> = existsSync(scannedFile)
    ? new Set(JSON.parse(readFileSync(scannedFile, "utf-8")))
    : new Set();

// Lecture de la liste des comptes à surveiller
const accounts: string[] = JSON.parse(readFileSync(accountsFile, "utf-8"));

// Fonction de scan pour un compte spécifique
async function scanAccount(agent: any, handle: string) {
    try {
        const profile = await agent.getProfile({ actor: handle }); // Récupération du profil
        const feed = await agent.getAuthorFeed({ actor: profile.data.did }); // Récupération des posts

        for (const post of feed.data.feed) {
            const uri = post.post.uri;
            if (scannedUris.has(uri)) continue; // Ignore les posts déjà scannés

            scannedUris.add(uri);
            const content = post.post.record.text;

            if (isSuspect(content)) {
                const record = {
                    did: profile.data.did,
                    handle,
                    uri,
                    text: content,
                    createdAt: post.post.record.createdAt,
                };
                suspects.push(record);
                console.log(`[Message suspect détecté] chez ${handle}:\n${content}\n`);
            }
        }
    } catch (err) {
        const error = err as Error;
        console.error(`Erreur en scannant ${handle} :`, error.message);
    }
}

// Fonction principale exécutée au lancement du script
async function main() {
    const agent = await createBlueskyClient(); // Connexion au compte lurk

    for (const handle of accounts) {
        await scanAccount(agent, handle); // Scan chaque compte
    }

    // Sauvegarde des résultats
    writeFileSync(suspectFile, JSON.stringify(suspects, null, 2));
    writeFileSync(scannedFile, JSON.stringify(Array.from(scannedUris), null, 2));
}

main(); // Démarrage du système