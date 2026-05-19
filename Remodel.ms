Du är en senior Vue/Nuxt-utvecklare, UI/UX-designer och frontend-arkitekt.

Uppdrag:
Utvidga och modernisera den befintliga Vue-hemsidan så att den får en professionell, trygg och industriell känsla inspirerad av sprinklerteknikk.no — men den får INTE kopiera layout, text, färger, bilder eller design rakt av.

Målet är:
- Modern B2B-hemsida för sprinkler / brandskydd / teknisk entreprenad
- Egen visuell identitet
- Seriös, trygg och premium känsla
- Mobilanpassad
- Snabb, ren och skalbar Vue-kod
- Tydlig struktur för framtida sidor och komponenter

Referensinspiration:
sprinklerteknikk.no har en tydlig branschprofil med fokus på totalleverans, projektering, installation, service och kontroll av sprinkleranläggningar. Använd detta som inspirationsnivå, inte som kopia.

Viktigt:
- Kopiera inte deras design exakt.
- Kopiera inte deras texter.
- Kopiera inte deras färgpalett exakt.
- Skapa en egen ton: modern, nordisk, teknisk, trygg och exklusiv.

Teknisk riktning:
- Använd Vue 3 / Nuxt 3 om projektet redan använder Nuxt.
- Bevara befintlig projektstruktur där det är rimligt.
- Refaktorera istället för att riva allt.
- Dela upp sidan i återanvändbara komponenter.
- Använd tydlig CSS/SCSS-struktur.
- Använd BEM eller välstrukturerade scoped styles.
- Säkerställ responsiv design för mobil, surfplatta och desktop.

Skapa/förbättra dessa sektioner:
1. Hero
   - Stor professionell startsida
   - Mörk overlay över teknisk/branschrelaterad bild
   - Tydlig rubrik
   - Kort säljande underrubrik
   - Primär CTA: “Kontakta oss”
   - Sekundär CTA: “Våra tjänster”

2. Tjänster
   - Projektering
   - Installation
   - Service & underhåll
   - Kontroll / besiktning
   - Ombyggnad & uppgradering
   - Varje tjänst ska ha ikon, kort text och knapp

3. Förtroendesektion
   - Lyft fram erfarenhet, kvalitet, säkerhet och certifieringar
   - Exempel på statistik:
     - “Många års erfarenhet”
     - “Projekt i alla typer av byggnader”
     - “Trygga installationer”
   - Gör detta snyggt med cards eller stora siffror

4. Om oss
   - Professionell text om företaget
   - Fokus på trygghet, ansvar och teknisk kompetens
   - Lägg till bildsektion eller split-layout

5. Process
   - Visa arbetsflöde:
     1. Rådgivning
     2. Projektering
     3. Installation
     4. Kontroll
     5. Serviceavtal

6. CTA-sektion
   - Stark avslutande kontaktsektion
   - “Behöver du hjälp med sprinkler eller brandskydd?”
   - Knapp till kontakt

7. Footer
   - Kontaktuppgifter
   - Snabblänkar
   - Tjänster
   - Sociala länkar
   - Diskret premium-känsla

Designriktning:
- Färgtema: mörk blå/antracit, vit, ljusgrå och en egen accentfärg, exempelvis koppar, röd-orange eller klar blå.
- Känsla: industriell, pålitlig, modern och exklusiv.
- Använd mycket luft, tydliga rubriker och professionella cards.
- Lägg till subtila hover-effekter.
- Lägg till mjuka animationer vid scroll om det passar.
- Undvik plottrighet.

Kodkrav:
- Skapa komponenter som:
  - AppHeader.vue
  - AppFooter.vue
  - HeroSection.vue
  - ServicesSection.vue
  - TrustSection.vue
  - AboutSection.vue
  - ProcessSection.vue
  - ContactCTA.vue
  - ServiceCard.vue
- All kod ska vara ren, kommenterad där det behövs och lätt att vidareutveckla.
- Undvik duplicerad kod.
- Kontrollera att allt fungerar responsivt.
- Kontrollera att inga brutna imports eller asset paths finns.
- Om bilder saknas, använd tydliga placeholder paths och kommentera var riktiga bilder ska läggas.

SEO:
- Lägg till vettiga meta titles och descriptions.
- Använd semantisk HTML.
- Rubrikstruktur ska vara korrekt: en H1, sedan H2/H3.
- Lägg till alt-texter på bilder.

Leverans:
- Uppdatera befintliga filer.
- Skapa nya komponenter där det behövs.
- Förklara kort vilka filer som ändrats.
- Ge även en kort lista på nästa rekommenderade förbättringar.

Ton:
Sidan ska kännas som ett seriöst nordiskt brandskyddsföretag med hög kompetens — inte som en kopia av någon annan sida.