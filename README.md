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

# Die Ordnerstruktur

```js
____________________________________________________________________________________________

AbschlussProjekt-React/
├── 📂 public/                          # Statische öffentliche Dateien
│   ├── 🖼️ favicon.ico                  # Favicon für den Browser
│
├── 📂 src/                             # Quellcode-Verzeichnis
│   ├── 📂 assets/                      # Globale Styles & Medien
│   │   ├── 🎨 components/              # Wiederverwendbare UI-Komponenten
│   │   │   ├── 🃏 cards.scss           # Karten-Styles
│   │   │   ├── 📑 forms.scss           # Formulare-Styles
│   │   │   ├── 🔘 buttons.scss         # Button-Styles
│   │   │
│   │   ├── 📐 layout/                  # Layout-Styles (Header, Footer, Grid)
│   │   │   ├── 📏 grid.scss            # Grid-Layout
│   │   │   ├── 📌 footer.scss          # Footer-Styles
│   │   │   ├── 🎭 header.scss          # Header-Styles
│   │   │
│   │   ├── 📜 pages/                   # Seiten-Spezifische Styles
│   │   │   ├── 🏠 home.scss            # Startseite
│   │   │   ├── 🛒 shop.scss            # Shop-Seite
│   │   │   ├──  ℹ️  about.scss             # About-Seite
│   │   │
│   │   ├── 🎨 styles/                  # Globale SCSS-Dateien
│   │   │   ├── 📂 base/                # Basis-Styles
│   │   │   │   ├── 🧹 reset.scss       # CSS-Reset
│   │   │   │   ├── 🛠️ mixins.scss      # SCSS-Mixins
│   │   │   │   ├── 🎨 variables.scss   # Globale Variablen
│   │   │   │   ├── 🔤 typography.scss  # Schriftarten-Styles
│   │   │
│   │   ├── 🎭 themes/                  # Dark- & Light-Mode Styles
│   │   │   ├── 🌑 dark.scss            # Dunkles Theme
│   │   │   ├── ☀️ light.scss           # Helles Theme
│
│   ├── ⚛️ components/                  # React-Komponenten
│   ├── 📏 layout/                      # Layout-Komponenten (Header, Footer, Grid)
│   ├── 📄 pages/                       # Seiten-Komponenten (Home, About, Shop)
│
│   ├── ⚛️ App.jsx                      # Haupt-React-Komponente
│   ├── 🚀 main.jsx                     # Einstiegspunkt der App
│   ├── 🎨 main.scss                    # Haupt-Styles der App
│
├── 📖 README.md                        # Diese Datei mit Doku zur Struktur
├── 🌍 index.html                       # Einstiegspunkt für Vite
├── 📦 package.json                     # Abhängigkeiten und Skripte
├── ⚙️ vite.config.js                   # Vite-Konfiguration
├── 🔍 eslint.config.js                 # ESLint-Konfiguration
├── 🔒 package-lock.json                # Versionssicherung der Pakete
├── 🙅 .gitignore                       # Dateien, die Git ignoriert

____________________________________________________________________________________________

```

## 💡 Legende

    📂 Ordner
    📦 Paketverwaltung
    🎨 Design & Styles
    ⚛️ React-Komponenten
    🚀 Einstiegspunkt
    🛠️ Werkzeuge
    🌍 HTML-Dateien
    🔍 Konfigurationsdateien
    🔒 Sperrdateien für Abhängigkeiten
    🙅 Git-ignore Dateien
# React-Abschluss
