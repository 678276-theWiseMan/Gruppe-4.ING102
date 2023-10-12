# Forklaring til forenklet versjon

## Endret fil-hierarki

Nesten alle HTML-filer ligger nå på samme nivå som startsida `index.html`. Bare erklæringer er lagt inn i en egen katalog som jeg har kalt `kontakt`.

Stilark har blitt lagt inn i katalog `css`. Stilarket `core.css`skal gjelde for alle sider *(vi kan selvsagt endre på dette i felleskap)*. Silarket `combined.css`består av `@import`-klausuler som gjør av vi kan hente inn spesiell CSS for den enkelte side. Den spesielle CSS-en legges som en CSS-fil ved siden av den andre CSS-en.

Javascript er satt inn i toppen på alle sider. Scriptet `main.js`leser hvilken side besøkeren befinner seg på og trigger relevante andre script ut ifra det. Så skriv gjerne dine egne script, så får vi `main.js`til å implementere dem.

