# Abschlussprojekt mit React/Vite [10.02.2025]

## Author: Chris Schubert | Verwendet: Vite | React | SCSS | Mixins | Hooks | Lokal-Storage |

### Get-Started:

```js
- npm install [Installieren der Abhängigkeiten & Libarys]
- npm run dev [Projekt Starten Port: 3000]
```

## Idee | Motivation:

### Warum habe ich mich dafür enschieden?

Der Grund, warum ich mich für einen Onlineshop entschieden habe, ist ganz einfach: Wir lernen neue Skills und diese möchte ich gerne beherrschen, egal wie aufwendig es wird.

### Mit diesem Projekt kann ich:

```js
1. Zeigen, was ich gelernt habe und bereits beherrsche.
2. Mein Wissen vertiefen und meine strukturierte, effiziente und schnelle Arbeitsweise festigen.
3. Ein Shop-System ist nicht immer einfach zu erstellen; es erfordert ein hohes Maß an Genauigkeit und Weitsicht.
   Perfekt zum Üben!
4. Ein gesamtes Rohgerüst für meine weiteren Shop-Projekte erstellen, was mir am Ende die Arbeit vereinfacht.
```

# ||| Die Ordnerstruktur |||

```js
____________________________________________________________________________________________

AbschlussProjekt-React/
├── 📂 dist/                                     # Produktionsbuild (nach `vite build`)
├── 📂 node_modules/                             # Abhängigkeiten (automatisch generiert)
├── 📂 public/                                   # Statische öffentliche Dateien
│
├── 📂 src/                                      # Quellcode-Verzeichnis
│   ├── 📂 assets/                               # Globale Assets (Bilder, Icons, JSON, Fonts)
│   │   ├── 📂 data/                             # Daten
│   │   │   ├── 📜 produkte.json                 # Produktdaten
│   │   ├── 📂 fonts/                            # Schriftarten
│   │   ├── 📂 images/                           # Bilder & Icons
│   │   │   ├── 🖼️ CandleScopeLogo.png
│   │   │   ├── 🖼️ Grid-Kategorien.png
│   │   │   ├── 🖼️ Hintergrund-Dashboard.png
│   │   │   ├── 🖼️ Ordnerstruktur.png
│   │   │   ├── 🖼️ Sign.gif
│   │   │   ├── 🖼️ Suchergebnis.jpg
│   │   │   ├── 🖼️ texture.jpg
│   │   │   ├── 🖼️ WeltallBlog.jpg
│
│   ├── 📂 layout/                               # Layout-Komponenten
│   │   ├── 📂 styles/                           # Layout-Styles
│   │   │   ├── 🎨 header.scss                   # Header-Styles
│   │   ├── ⚛️ ContextAPI.jsx                    # Globale AppContext-Logik
│   │   ├── ⚛️ Header.jsx                        # Header-Komponente
│   │   ├── ⚛️ ProtectedRoute.jsx                # Geschützte Routen-Logik
│   │   ├── ⚛️ PlaceholderSVG.jsx                # Platzhalter SVG-Komponente
│
│   ├── 📂 pages/                                # Seiten-Komponenten
│   │   ├── ⚛️ AboutUs.jsx                       # About-Seite
│   │   ├── ⚛️ Blog.jsx                          # Blog-Seite
│   │   ├── ⚛️ Categories.jsx                    # Kategorien-Seite
│   │   ├── ⚛️ Dashboard.jsx                     # Dashboard
│   │   ├── ⚛️ Home.jsx                          # Startseite
│   │   ├── ⚛️ Login.jsx                         # Login-Seite
│   │   ├── ⚛️ NotFound404.jsx                   # 404-Fehlerseite
│   │   ├── ⚛️ ProductList.jsx                   # Produktlisten-Komponente
│   │   ├── ⚛️ Shop.jsx                          # Shop-Seite
│   │   ├── 📂 styles/                           # Seiten-Styles
│   │   │   ├── 🎨 AboutUs.scss
│   │   │   ├── 🎨 Blog.scss
│   │   │   ├── 🎨 Categories.scss
│   │   │   ├── 🎨 Dashboard.scss
│   │   │   ├── 🎨 Home.scss
│   │   │   ├── 🎨 Login.scss
│   │   │   ├── 🎨 NotFound404.scss
│   │   │   ├── 🎨 ProductList.scss
│   │   │   ├── 🎨 Shop.scss
│
│   ├── 📂 styles/                               # Allgemeine Styles
│   │   ├── 📂 base/                             # Basis-Styles
│   │   │   ├── 🎨 index.scss                    # Haupt-Style Datei
│   │   │   ├── 🎨 reset.scss                    # CSS-Reset
│   │   │   ├── 🎨 variables.scss                # Globale Variablen
│
│   ├── ⚛️ App.jsx                               # Haupt-React-Komponente
│   ├── 🚀 main.jsx                              # Einstiegspunkt der App
│   ├── 🎨 main.scss                             # Haupt-Styles der App
│
├── 📜 .gitignore                                # Git Ignore Datei
├── 📜 .gitattributes                            # Git Attribute Datei
├── 📜 package.json                              # Abhängigkeiten und Skripte
├── 📜 package-lock.json                         # Versionssicherung der Pakete
├── 📜 README.md                                 # Projekt-Dokumentation
├── 📜 vite.config.js                            # Vite-Konfiguration
├── 📜 eslint.config.js                          # ESLint-Konfiguration
├── 🌍 index.html                                # Einstiegspunkt für Vite


____________________________________________________________________________________________

```

## 💡 Legende

    📂 Ordner – Beinhaltet verschiedene Module & Unterverzeichnisse
    📦 Paketverwaltung – Enthält package.json und package-lock.json für npm-Abhängigkeiten
    🎨 Design & Styles – SCSS- und CSS-Dateien für Layout, Komponenten & Themes
    ⚛️ React-Komponenten – Wiederverwendbare React-Komponenten & Seiten
    🚀 Einstiegspunkt – Hauptdateien wie main.jsx, die die App initialisieren
    🛠️ Werkzeuge – Entwicklungs-Tools, Linter, Build-Konfigurationen (eslint.config.mjs, vite.config.js)
    🌍 HTML-Dateien – Statische HTML-Dateien (index.html) für den Einstieg
    🔍 Konfigurationsdateien – Einstellungen für Linter, Vite & andere Tools
    🔒 Sperrdateien für Abhängigkeiten – Lockfiles (package-lock.json) für Paketversionen
    🙅 Git-ignore Dateien – .gitignore, um nicht versionierte Dateien auszuschließen
# React-Abschluss
