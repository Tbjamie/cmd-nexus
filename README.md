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

![Component sketches](https://github.com/user-attachments/assets/a7560a24-7daa-49b8-99ed-066346937f91)

![Componenten en layout overview](https://github.com/user-attachments/assets/4ec8dc41-5f02-4bc8-b602-8fc82ecf8569)

- Searchbar
De Searchbar component wordt gebruikt bij de zoekpagina en overview pagina, deze bevat fuse.JS om resultaten te matchen van de prompt met de database.

![Searchbar](https://github.com/user-attachments/assets/3cd9ce4a-ecaa-47b3-9e04-af645941196f)

- Dropdown
![Dropdown](https://github.com/user-attachments/assets/a74fb057-6b14-4da0-8390-23a6e2d61ce9)

Deze geeft de meest gerelateerd kaarten en toont ze als suggesties

- Conditionele vragen/follow up questions

![Conditionele vragen](https://github.com/user-attachments/assets/c513d52a-7f91-4f52-b872-dfffed806747)

- Slider

![afbeelding](https://github.com/user-attachments/assets/060d3a93-3044-4a24-a238-67949c847ec9)


- Pill button

![afbeelding](https://github.com/user-attachments/assets/c6d4035c-8382-43cd-a8f2-7f489b3bb5d0)

- Filter

![afbeelding](https://github.com/user-attachments/assets/8d71f759-17ce-470a-87e4-509cb200b27b)


- Icon button

![afbeelding](https://github.com/user-attachments/assets/f83949a3-28a2-421c-8542-2f7fa774831e) 
![afbeelding](https://github.com/user-attachments/assets/6206de38-b831-4b2a-aef1-246c28c95ca8)
![afbeelding](https://github.com/user-attachments/assets/38e7f92d-f341-46a8-8946-c30368b6ea8c)
![afbeelding](https://github.com/user-attachments/assets/c60b6ee8-5130-44f7-86e9-76e0115fead4)

- Card

![afbeelding](https://github.com/user-attachments/assets/329e9c88-2cd1-4955-a659-4dc1deb4fe36)


- Label

![afbeelding](https://github.com/user-attachments/assets/2f519f62-91b9-4121-a904-b03b0938edd5)


### Layouts

- Zoekpagina

![afbeelding](https://github.com/user-attachments/assets/a18a791c-d715-43e0-8616-6a28e25ea0d3)

- Overview pagina


![afbeelding](https://github.com/user-attachments/assets/f8e322eb-d86f-440e-9ad1-6a7214eceb8b)


- Detail pagina


![afbeelding](https://github.com/user-attachments/assets/286c53f2-dd4d-4a79-8bce-c2f48d1a79b2)

- (Accounts)

![afbeelding](https://github.com/user-attachments/assets/0028fcbf-51d9-4975-a097-df615f6c15b0)

