// Liste de mots-clés considérés comme suspects
export const infractionKeywords = [
    "viol",
    "pédophile",
    "harcèlement",
    "suicide",
    "menace"
];

// Fonction qui détecte si un texte contient un mot interdit
export function isSuspect(text: string): boolean {
    return infractionKeywords.some(word =>
        text.toLowerCase().includes(word)
    );
}