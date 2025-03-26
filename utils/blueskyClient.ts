import { BskyAgent } from "@atproto/api";
import "dotenv/config"; // Charge les identifiants depuis .env

// Fonction asynchrone pour créer un client Bluesky authentifié
export async function createBlueskyClient() {
    const agent = new BskyAgent({ service: "https://bsky.social" }); // Initialisation
    await agent.login({
        identifier: process.env.BLUESKY_IDENTIFIER!, // Identifiant depuis .env
        password: process.env.BLUESKY_PASSWORD!, // Mot de passe depuis .env
    });
    return agent;
}