# Forklaring til forenklet versjon

## Endret fil-hierarki

Nesten alle HTML-filer ligger nå på samme nivå som startsida `index.html`. Bare erklæringer er lagt inn i en egen katalog som jeg har kalt `kontakt`. Dette har forenklet *veldig* lenking fra side til side.

__Stilark__ har blitt lagt inn i katalog `css`. Stilarket `core.css`skal gjelde for alle sider *(vi kan selvsagt endre på dette i felleskap)*. Stilarket `combined.css`består av `@import`-klausuler som gjør av vi kan hente inn spesiell CSS for den enkelte side. Den spesielle CSS-en legges som en CSS-fil ved siden av den andre CSS-en.

__Javascript__ er satt inn i toppen på alle sider. Scriptet `main.js`leser hvilken side besøkeren befinner seg på og trigger relevante andre script ut ifra det. Så skriv gjerne dine egne script, så får vi `main.js`til å implementere dem.

__Bilder__ har fått sin egen katalog `grafikk` hvor ting som logo og *placeholder*-bilder ligger, *samt* en egen katalog for produktfotos: `produkter`. Produktbildene bør navngis med *varenummer*!

## CSS/Stiler

Med *variabler* øverst i `core.css` er det lettere for oss å forandre hele atmosfæren på nettstedet i én fei.

Det er satt inn en klasse `.active`som gjør at siden man er på blir markert i menyen.

Har også satt inn klassen `.shadow`for menyelementer som egentlig ikke skal vises i menyen, slik som vare-visninger. Disse sidene skal vel bare vises når man har klikke t et produkt?

### Farger

Jeg mener jeg har satt inn farger som er tiltaende, men dette får vi avgjøre på en demokratisk måte. Jeg har enda ikke teste kontrasten ved hjelp av verktøy.

Merk at jeg har skrevet farger i __HSL__ formatet øverst i `:root`i `core.css`! Dette vil hjelpe oss når vi etterhvert skal lage *forløpningsfarger* og ønsker å beholde nok kontrast i forhold til *universell utforming*.

