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
│   ├── 🖼️ favicon.ico                           # Favicon für den Browser
│--------------------------------------------------------------------------------------------
├── 📂 src/                                      # Quellcode-Verzeichnis                    |
│   ├── 📂 assets/                               # Globale Styles & Medien
│   │   ├── 🖼️ images/                           # Bilder & Icons
│   │   ├── 🎨 styles/                           # Globale & seitenbasierte Styles
│   │   │   ├── 📂 base/                         # Basis-Styles
│   │   │   │   ├── 🧹 reset.scss                # CSS-Reset
│   │   │   │   ├── 🛠️ mixins.scss               # SCSS-Mixins
│   │   │   │   ├── 🎨 variables.scss            # Globale Variablen
│   │   │   │   ├── 🔤 typography.scss           # Schriftarten-Styles
│   │   │   │   ├── 📜 index.scss                # Haupt-Style Datei
│   │   │   │
│   │   │   ├── 📂 themes/                       # Dark- & Light-Mode Styles
│   │   │   │   ├── 🌑 dark.scss                 # Dunkles Theme
│   │   │   │   ├── ☀️ light.scss                # Helles Theme
│   │   │   │
│   │   │   ├── 📜 pages/                        # Seiten-Spezifische Styles
│   │   │   │   ├── ℹ️ AboutUs.scss                # About-Seite
│   │   │   │   ├── 📖 Blog.scss                 # Blog-Seite
│   │   │   │   ├── 🏷️ Categories.scss           # Kategorien
│   │   │   │   ├── 🛒 Cart.scss                 # Warenkorb
│   │   │   │   ├── 🏠 Home.scss                 # Startseite
│   │   │   │   ├── 🔑 Login.scss                # Login-Seite
│   │   │   │   ├── 📩 ShippingReturns.scss      # Versand & Rückgaben
│   │   │   │   ├── 📣 Offers.scss               # Angebote
│   │   │   │   ├── ✨ Popular.scss              # Beliebte Produkte
│   │   │   │   ├── 🆕 New.scss                  # Neue Produkte
│   │   │   │   ├── 🛍️ Shop.scss                 # Shop-Seite
│
│   ├── 📂 layout/                               # Layout-Komponenten & Styles
│   │   ├── 🎭 header.scss                       # Header-Styles
│   │   ├── 📏 grid.scss                         # Grid-Styles
│   │   ├── 📌 footer.scss                       # Footer-Styles
│   │   ├── 🏗️ layout.scss                       # Allgemeines Layout
│   │   ├── ⚛️ Header.jsx                        # Header-Komponente
│   │   ├── ⚛️ Grid.jsx                          # Grid-Komponente
│   │   ├── ⚛️ Footer.jsx                        # Footer-Komponente
│
│   ├── 📂 pages/                                # Seiten-Komponenten
│   │   ├── ℹ️ AboutUs.jsx                         # About-Seite
│   │   ├── 📖 Blog.jsx                          # Blog-Seite
│   │   ├── 🏷️ Categories.jsx                    # Kategorien-Seite
│   │   ├── 🛒 Cart.jsx                          # Warenkorb
│   │   ├── 🏠 Home.jsx                          # Startseite
│   │   ├── 🔑 Login.jsx                         # Login-Seite
│   │   ├── 🆕 New.jsx                           # Neue Produkte
│   │   ├── 📣 Offers.jsx                        # Angebote
│   │   ├── ✨ Popular.jsx                       # Beliebte Produkte
│   │   ├── 📩 ShippingReturns.jsx               # Versand & Rückgaben
│   │   ├── 🛍️ Shop.jsx                          # Shop-Seite
│   │   ├── 🖥️ Dashboard.jsx                     # Dashboard                               |
│-------------------------------------------------------------------------------------------
│   ├── ⚛️ App.jsx                               # Haupt-React-Komponente
│   ├── 🚀 main.jsx                              # Einstiegspunkt der App
│   ├── 🎨 main.scss                             # Haupt-Styles der App
│
├── 📖 README.md                                 # Projekt-Dokumentation
├── 🌍 index.html                                # Einstiegspunkt für Vite
├── 📦 package.json                              # Abhängigkeiten und Skripte
├── 🔍 eslint.config.mjs                         # ESLint-Konfiguration (modular)
├── ⚙️ vite.config.js                            # Vite-Konfiguration
├── 🔒 package-lock.json                         # Versionssicherung der Pakete
├── 🙅 .gitignore                                # Dateien, die Git ignoriert
├── 📦 REACT-MODULAR-PROJEKT.zip                 # Projekt als ZIP-Datei



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
