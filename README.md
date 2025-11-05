# gooihetindebak

**gooihetindebak** is een quiz waarmee je op een leuke manier kunt leren welk afval waar hoort.  
Tijdens het spelen kun je punten verdienen en badges krijgen.

Een quizronde is klaar als alle vragen werken, de punten goed worden opgeteld, en je meteen kunt zien welke badges je hebt verdiend.  

Zodra je iets goed doet, krijg je direct je punten en badges, zodat je altijd weet hoe je ervoor staat.  

Op deze manier leer je op een leuke manier beter afval te scheiden en blijft leuk om je score en badges te verbeteren.

---

## Installatie van Ionic

### 1. Node.js installeren
Ga naar **[https://nodejs.org](https://nodejs.org)**  
Klik op **LTS (Long Term Support)** – dat is de stabiele versie.  
Download en installeer het.

Controleer daarna de installatie via:  
`node -v`

---

### 2. Ionic installeren via npm
Installeer Ionic wereldwijd met het volgende commando:  
`npm install -g @ionic/cli`  

Dit installeert de Ionic Command Line Interface (CLI) wereldwijd op je laptop.  
De vlag `-g` betekent *global*, dus je kunt het overal gebruiken.

---

### 3. Controleren of Ionic werkt
Controleer of Ionic goed is geïnstalleerd met:  
`ionic --version`  

Als er een versienummer verschijnt, is het goed geïnstalleerd.

---

### 4. Open de code
Om te testen of het werkt:  
`ionic start gooihetindebak-1`  

Ionic vraagt daarna welk framework je wilt gebruiken — meestal **Angular**, **React** of **Vue**.  
Kies wat je wilt (voor beginners is **Angular** vaak het makkelijkst).

Daarna:  
`cd mijnApp`  
`ionic serve`

Nu opent Ionic automatisch je app in de browser.

---

## Extra probleemoplossing

Als je merkt dat je een foutcode krijgt en Ionic is wel goed geïnstalleerd, doe dan het volgende:

1. Open **PowerShell als beheerder**  
   (Rechtermuisklik op PowerShell → *Als administrator uitvoeren*)
2. Typ het volgende commando:  
   `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`
3. Bevestig met **Y (Yes)**  
4. Start daarna opnieuw:  
   `ionic serve`
