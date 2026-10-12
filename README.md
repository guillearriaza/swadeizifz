# Isthmus Free Zone (SWADE / Interface Zero 3.0)

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](https://unlicense.org/)

An unofficial corporate cyberpunk campaign module and accompanying dynamic character sheet web app for **Savage Worlds Adventure Edition (SWADE)** and **Interface Zero 3.0**, set in the neon-drenched, morally bankrupt corporate landscape of the Isthmus Free Zone in 2095.

---

## Overview

Following the Second Isthmus Civil Wars and the Tendril Access Plague (TAP 1.0) crisis, the Isthmus Free Zone operates as a deregulated tax haven dominated by multinational conglomerates, feudal agro-industrial dynasties, and private military security forces.

This repository hosts:
1. **The Campaign Supplement (`Isthmus Free Zone.pdf`):** A 7-session operational corporate campaign module with complete lore, GM guidance, NPC stat blocks, homebrew Cyber Psychosis rules, and 20 visual character sheets.
2. **Interactive Character Sheet Web App:** A lightweight, single-page Google Apps Script web application powered directly by a Google Sheets relational database to inspect and run operatives at the table.

The pdf can be accessed directly here:
https://guillearriaza.github.io/swadeizifz/Isthmus%20Free%20Zone.pdf

## Web App Architecture
The Apps Script can be viewed here:
https://script.google.com/macros/s/AKfycbwf704MTr3yz_nzcMlhpZBeFRoiuLak82KvYe3LG0CsXW1I1DNThDQp_mwjjUFfBVs/exec

The Google Sheet containing the Apps Script can be viewed and copied here:
https://docs.google.com/spreadsheets/d/1lIWMbaGDFwCm61CMvXYg5hKTs7M8pgTO-46HQh38KPs

The companion web app is built entirely with vanilla HTML5/CSS/JavaScript and Google Apps Script, treating a standard Google Spreadsheet as a normalized relational database:

    ├── Code.gs             # Apps Script entry point; pulls sheets and serializes payload
    ├── index.html          # Main container of divs for the engine_js files to load information into
    ├── css.html            # Cyberpunk dark HUD styling and neon UI tokens
    ├── dice.html           # Inline SVG polyhedral dice assets, created by Lucas Rathgeb for the Noun Project
    ├── engine_js.html      # SWADE rules engine, trait math, step calculations, and derived stats
    ├── ui_config_js.html   # Registry configuration for menus, modals, and rules breakdowns
    └── ui_render_js.html   # UI views, event routing, screen navigation, and DOM renderers

While these files are listed inside the google sheet, they've also been included as files in this repository, inside the `appsscript` folder.

### Key Technical Features

* **Relational Sheet Normalization:** Operative stats, cyberware, weapons, armor, and gear are stored in dedicated relational tables (`attrib_c`, `skills_c`, `cbw_c`, `weapons_c`, `armor_c`, `gear_c`) linked by `character_id`.
* **Universal Modifier Pipeline (`mods`):** Consolidated rules engine supporting die steps, flat bonuses, granted Edges/Hindrances, and Special Abilities without redundant race/hybrid tabs.
* **Condition-Aware Stat Calculations:** Conditional modifiers (entries with non-empty `requirements`) are kept out of base derived statistics while remaining clearly documented in itemized calculation breakdowns, though their effects are listed inside their Insight screens.
* **Dynamic Toughness & Armor Stacking:** Layered protection accounts for worn armor, subdermal cybernetics (e.g. Benkei Sarashi stacks), and racial traits simultaneously.
* **Transparent Breakdown Modals:** Every derived stat, attribute, and skill features an **INSIGHT** modal detailing exact base trait points, advancements, implants, and rulebook page references.

---

## Deployment & Setup

### Running the Apps Script

1. Make a copy of the following google sheet: https://docs.google.com/spreadsheets/d/1lIWMbaGDFwCm61CMvXYg5hKTs7M8pgTO-46HQh38KPs
2. Open **Extensions > Apps Script** from your spreadsheet menu.
3. Click **Deploy > New deployment**.
4. Select **Web app**, configure access permissions (e.g. *Anyone with the link* or *Only myself*), and deploy.
5. Google might return security alerts due to it not being a verified app. If you receive a `"Google hasn't verified this app"` error message, click on `Advanced` and then on `Go To [script ID] (unsafe)`.

### Alternative Apps Script deployment

1. Download the 10 csv files in the `gsheet` folder: `c`, `dictionary`, `mods`, `gear_c`, `armor_c`, `cbw_c`, `e_h_c`, `skills_c`, `attrib_c` and  `weapons_c`.
2. Paste each csv in a new google sheet that contains the 10 tabs with the same name.
3. Open **Extensions > Apps Script** from your spreadsheet menu.
4. Click **Deploy > New deployment**.
5. Download the 7 files in the `appsscript` folder: `Code.gs`, `index.html`, `css.html`, `dice.html`, `engine_js.html`, `ui_config_js.html` and `ui_render_js.html`
6. Paste the contents of the `Code.gs` file from this repository into your App Script's `Code.gs` file.
7. Create 6 html files in your Apps Script, named the same way as the 6 html files in the `appsscript` folder
8. Paste the content of the 7 files into their respective Apps Script files
9. Click **Deploy > New deployment**.
10. Select **Web app**, configure access permissions (e.g. *Anyone with the link* or *Only myself*), and deploy.
11. Google might return security alerts due to it not being a verified app. If you receive a `"Google hasn't verified this app"` error message, click on `Advanced` and then on `Go To [script ID] (unsafe)`.

---

## Google Sheet Structure

### c

The `c` tab contains the character descriptions, with columns working as follows:

- **A:** `character_id`: The numeric character id to be used as a primary key for establishing relations.
- **B:** `player`: The name of the player running the character. For this particular implementation of the system, as it lists 5 premade characters, 9 Wild Cards and 6 mob character sheets, the `player` column defines which of these 3 different categories the character sheet lists.
- **C:** `character`: The name of the character.
- **D:** `race`: The race of the character. Races can provide modifiers, as defined in the `mods` tab.
- **E:** `hybrid`: If the character underwent hybridization. Hybridization can provide modifiers, as defined in the `mods` tab.
- **F:** `origin`: The character's Origin, from the Interface Zero 3.0 Players Guide to 2095
- **G:** `advancement`: The character's Advancement following the SWADE Core Rulebook. Rank is obtained automatically via Advancement.
- **H:** `age`: The character's age
- **I:** `height`: The character's height
- **J:** `weight`: The character's weight
- **K:** `portrait`: A portrait of the character. It can be a link to an image, or a base64 string.
- **L:** `Notes`: A free column to make notes

### dictionary

The `dictionary` tab contains the descriptions for all the mechanics, mostly stemming from the SWADE Core Rules book or the Interface Zero Players Guide to 2095. It should be noted not all the descriptions in the book have been implemented. Only the ones necessary for the module and my table. New descriptions can be added and the system interacts with them however. Its columns work as follows:

- **A:** `source_type`: What type of mechanic is being described (a Skill, an Edge, a piece of Biotech, etc)
- **B:** `source_id`: The name of what's being described. It works relationally with entries in tabs such as mods, gear_c, skills_c, etc.
- **C:** `sourcebook`: Where this description comes from
- **D:** `page`: What page in the source book this description comes from
- **E:** `description`: The text description for the mechanic
- **F:** `dimension_1`: Some descriptions require one text dimension. For example, Edges have their requirements listed here, while Hindrances have their Minor or Major tag here
- **G:** `metric_1`: Some descriptions require at least one numeral metric. For example, augmentations have their price listed in this column
- **H:** `metric_2`: Some descriptions require a second numeral metric. For example, augmentations have their strain cost listed in this column

### mods

The `mods` tab serves as the universal rules modification engine. It aggregates passive and conditional trait adjustments, step bonuses, flat modifiers, and granted features across Races, Hybrids, Cyberware, Edges, Hindrances, and Armor. Its columns work as follows:

- **A:** `source_type`: Category of the origin providing the modifier (`Race`, `Hybrid`, `Cyberware`, `Edge`, `Hindrance`, `Armor`).
- **B:** `source_id`: Specific entity name granting the effect (must match the race/hybrid name or item name in relational tabs).
- **C:** `to_modify`: What game aspect is affected (`Attribute`, `Skill`, `Derived Statistic`, `Edge`, `Hindrance`, `Special Ability`, `Natural Weapon`, `Penalty`).
- **D:** `target`: The specific trait, skill, or stat receiving the modifier, e.g. `Agility`, `Athletics`, `Pace`, `Armor`, or `"Any 1"` for flexible choices. `"Any 1"` options are defined in `target` columns, in the relational databases that apply such modifications.
- **E:** `mod_type`: Mathematical or tagging behavior (`die` for step adjustments, `modifier`/`flat` for flat roll bonuses, `reroll`, or `tag`).
- **F:** `mod_value`: Numeric value or severity tag (`1`, `2`, `-1`, `Major`, `Minor`, `Free`).
- **G:** `requirements`: Conditional situational triggers. If populated, the engine treats the modifier as situational, keeping it out of baseline sheet stats while rendering the note inside the INSIGHT breakdown modal.
- **H:** `stackable`: Maximum permitted stack multiplier for repeatable items (such as tiered subdermal armor).
- **I:** `notes`: Descriptive log string rendered inside the calculation breakdown modal, using a google sheets *ARRAYFORMULA*.

### attrib_c

Stores base attribute advancement points invested per character.

- **A:** `character_id`: Foreign key matching `c.character_id`.
- **B:** `attribute`: Attribute name (`Agility`, `Smarts`, `Spirit`, `Strength`, `Vigor`).
- **C:** `advancement_points_spent`: Number of base points invested into this attribute (0 = base d4, 1 = d6, 2 = d8, etc.).
- **D:** `notes`: A description of how the advancement points were spent, such as during Character Creation, or for the Second Advancement. This information is listed under the INSIGHTS breakdown modal.

### skills_c

Stores base skill allocations per character.

- **A:** `character_id`: Foreign key matching `c.character_id`.
- **B:** `skill`: Name of the skill.
- **C:** `skill_points_spent`: Number of skill points allocated to this skill.
- **D:** `notes`: A description of how the skill points were spent, such as during Character Creation, or for the Second Advancement. This information is listed under the INSIGHTS breakdown modal.

### e_h_c

Tracks native Edges and Hindrances acquired through character creation and advancements.

- **A:** `character_id`: Foreign key matching `c.character_id`.
- **B:** `type`: Classification (`Edge` or `Hindrance`).
- **C:** `edge_hindrance`: Name of the Edge or Hindrance.
- **D:** `major_minor`: Severity tag (`Major` or `Minor`) for Hindrances.
- **E:** `bonus_or_forced`: Source attribution tag (e.g. `Character Creation`, `Human 2.0 Free Edge`, `Second Advancement`).
- **F:** `target`: Specific trait choice if the Edge requires a target selection.
- **G:** `character_details`: Custom character-specific narrative flavor or details.

### cbw_c

Tracks installed Cyberware and Bioware per character.

- **A:** `character_id`: Foreign key matching `c.character_id`.
- **B:** `ware`: Name of the implant or augment (must match `dictionary.source_id` and/or `mods.source_id`).
- **C:** `strain`: Item Strain cost override (if blank, the engine falls back to `dictionary.metric_2`).
- **D:** `target`: Target specialization choice if the augment applies to a specific trait or skill.
- **E:** `cost`: Financial cost override.
- **F:** `stacks`: Number of installed stacks/levels for tiered augmentations.
- **G:** `notes`: Specific character installation notes.

### weapons_c

Tracks ranged and melee weaponry assigned to the operative. The full weapon name is listed as [brand] [weapon] ([caliber if listed]) [category]

- **A:** `character_id`: Foreign key matching `c.character_id`.
- **B:** `weapon`: Weapon name.
- **C:** `brand`: Weapon brand.
- **D:** `caliber`: Caliber of bullets for ranged weapons.
- **E:** `category`: Weapon Category.
- **F:** `mod_parent`: Weapons with a mod_parent value are indented in the weapon selection screen.
- **G:** `range`: Range brackets (`Short/Medium/Long` or `Melee`).
- **H:** `damage`: Damage dice formula (e.g., `2d6+1`, `Str+d6`).
- **I:** `ap`: Armor Piercing rating.
- **J:** `rof`: Rate of Fire.
- **K:** `shots`: Magazine capacity.
- **L:** `min_str`: Minimum strength required to effectively wield this weapon.
- **M:** `wt`: Mass in pounds (feeds into derived Encumbrance load calculations).
- **N:** `conceal`:  `Conceal is a modifier to the Notice roll for others to spot and locate. A negative number means the weapon is more difficult to locate`, from the Interface Zero Players Guide to 2095, page 80.
- **O:** `cost`: Credit price.
- **P:** `source`: Origin of procurement (e.g. `Standard Issue`, `Gearhead Origin`).
- **Q:** `notes`: Weapon properties, firing modes, or special rules.
- **R:** `picture`: A picture of the weapon. It can be a link to an image, or a base64 string. It's used as a bullet point in the weapon selection screen, and in full size inside the weapon's insights screen.
- **S:** `irlwebsite`: With the exception of Stefano Silva, Isthmus Free Zone extensively lists real life weapons. Due to the LATAM setting, it's mainly Taurus guns, though there's some Walthers, Rugers, MasterPiece Arms, etc. The weapon insight page lists the real life website for the weapon listed, using this column.

### armor_c

Tracks worn protective armor suites.

- **A:** `character_id`: Foreign key matching `c.character_id`.
- **B:** `armor`: Armor name.
- **C:** `armor_bonus`: Numeric armor protection bonus added directly to derived Armor and Toughness.
- **D:** `armor_covers`: Anatomical coverage areas (e.g. `Arms, Torso, Legs`).
- **E:** `cost`: Credit price.
- **F:** `wt`: Mass in pounds (feeds into derived Encumbrance load calculations).
- **G:** `source`: Procurement origin.
- **H:** `notes`: Any notes necessary for the armor listed.

### gear_c

Tracks general equipment and field kit inventory.

- **A:** `character_id`: Foreign key matching `c.character_id`.
- **B:** `gear`: Item name.
- **C:** `cost`: Credit price.
- **D:** `wt`: Mass in pounds (feeds into derived Encumbrance load calculations).
- **E:** `source`: Procurement origin.
- **F:** `notes`: Item capabilities or capacity notes.

---

## License & Credits
- Written & Designed by **Guille Arriaza**.
- All art was drawn, traced or refined by **Google Gemini**.
- Dedicated to the public domain under the **The Unlicense**.
- *Interface Zero* is a trademark of **Gun Metal Games**. *Savage Worlds* is a trademark of **Pinnacle Entertainment Group**. This is an unofficial fan publication not affiliated with or endorsed by either company.