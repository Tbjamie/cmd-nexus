# About the project

CMD Nexus is een zoekplatform voor kennis die binnen de CMD opleiding wordt aangeboden. Het product is bedoelt voor eerstejaars leerlingen tot en met de docenten. Het product bevat meerdere "flows" om informatie te kunnen vinden.

# Usage
## Installation

Node is nodig om de applicatie te starten.

### Development
1. Installeren
```node
npm install
```
Dit installeert de benodigde modules om het project te runnen.

2. Runnen
```node
npm run dev
```
Dit runt het project lokaal op de machine, om het te previewen kan je kijken op [localhost:5173](http://localhost:5173/)

### Build
```node
npm run build
```
Om de website te builden wordt deze commando gebruikt, dit creëert een statische export waar alle componenten, features en layouts in elkaar worden gevoegd.

## Stack

- [SvelteKit/Node](https://svelte.dev/)
- [Vite](https://vite.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Dependencies

- "@poppanator/sveltekit-svg": "^5.0.1",
- "fuse.js": "^7.1.0",
- "gsap": "^3.13.0",
- "lenis": "^1.3.1"

## Structure
Componenten en icons kunnen gevonden worden in 'src/lib/[NAAM]'

Pagina's en layouts zijn te vinden in de 'src/routes/[NAAM]'

### Componenten

![Componenten en layout overview](https://github.com/user-attachments/assets/4ec8dc41-5f02-4bc8-b602-8fc82ecf8569)

- Searchbar
- Dropdown
- Conditionele vragen/follow up questions
- Slider
- Pill button
- Filter
- Icon button
- Card
- Input field
- Label

### Layouts

- Zoekpagina
- Overview pagina
- Detail pagina
- (Accounts)


