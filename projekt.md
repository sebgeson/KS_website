Extra funktion: Sida för färdiga projekt

Skapa en ny sida: “Färdiga projekt”

Syfte:
Sidan ska automatiskt kunna visa färdiga projekt från Google Drive. Administratören ska via inställningar kunna ange vilket Google-konto eller vilken Google Drive-konfiguration som ska användas.

Google Drive-struktur:
Varje projekt ska ligga i en egen mapp.

Exempel:

/Färdiga projekt
  /Projekt 1
    /huvudbild
      hero.jpg
    /bilder
      bild1.jpg
      bild2.jpg
      bild3.jpg
    projektbeskrivning.md

  /Projekt 2
    /huvudbild
      hero.jpg
    /bilder
      bild1.jpg
      bild2.jpg
    projektbeskrivning.md

Krav:
- Hämta projekt automatiskt från vald Google Drive-mapp.
- Varje undermapp ska tolkas som ett projekt.
- Läs in huvudbild från mappen “huvudbild”.
- Läs in bildgalleri från mappen “bilder”.
- Läs in projekttext från “projektbeskrivning.md”.
- Markdown-filen ska renderas snyggt på projektsidan.
- Skapa översiktssida med projektkort.
- Varje projektkort ska visa:
  - huvudbild
  - projektnamn
  - kort utdrag från projektbeskrivning
  - knapp: “Läs mer”
- Skapa detaljsida för varje projekt.
- Detaljsidan ska innehålla:
  - stor huvudbild
  - projektbeskrivning
  - bildgalleri
  - tillbaka-knapp

Inställningar:
Skapa en admin-/settings-sektion där man kan ange:
- Google Client ID
- Google API Key eller service account-konfiguration
- Drive Folder ID för huvudmappen
- Cache-tid
- Om projekten ska vara publika eller bara hämtas via server/API

Säkerhet:
- Lägg aldrig hemliga nycklar direkt i frontend.
- API-nycklar och service account ska hanteras via server/backend eller runtime config.
- Använd miljövariabler.
- Lägg till tydliga exempel i `.env.example`.

Kodstruktur:
Skapa exempelvis:
- pages/projects/index.vue
- pages/projects/[slug].vue
- components/projects/ProjectCard.vue
- components/projects/ProjectGallery.vue
- components/projects/ProjectHero.vue
- components/projects/ProjectMarkdown.vue
- server/api/projects.get.ts
- server/api/projects/[slug].get.ts
- composables/useProjects.ts
- utils/googleDriveProjects.ts

Funktion:
- Skapa slug automatiskt från mappnamn.
- Sortera projekt efter namn eller datum.
- Hantera laddning, tomma resultat och fel.
- Lägg till snygg skeleton-loader.
- Lägg till fallback-bild om huvudbild saknas.
- Optimera bilder där det är möjligt.
- Bygg UI i samma professionella stil som resten av hemsidan.

Design:
Sidan ska kännas som en professionell referens-/projektportfolio för ett sprinkler- eller brandskyddsföretag.
Den ska vara modern, tydlig, responsiv och premium.