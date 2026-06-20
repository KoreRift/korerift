// assets.ts — trova le icone degli asset (personaggi, armi, moduli) dal nome.
// Convenzione file:  public/games/<slug>/<slug>_<tipo>_<Nome>.png
//   personaggi -> <slug>_icon_<Nome>.png        (es. nte_icon_Zero.png)
//   armi/arc   -> <slug>_weapon_<Nome>.png       (es. nte_weapon_Day_Off.png)
//   moduli     -> <slug>_module_<Nome>.png       (es. nte_module_Lost_Radiance.png)
import { games } from "../data/games";

// Dal nome del gioco ricava lo slug (cartella asset). Es. "Neverness To Everness" -> "nte".
export function gameSlug(gameName: string): string {
  return games.find((g) => g.name === gameName)?.slug ?? "";
}

// Prefisso dei nomi file: assetPrefix se impostato, altrimenti lo slug.
function prefixForSlug(slug: string): string {
  const g = games.find((x) => x.slug === slug);
  return g?.assetPrefix ?? slug;
}

// I nomi con spazi diventano underscore, per combaciare coi file.
function fileName(name: string): string {
  return name.trim().replace(/\s+/g, "_");
}

export function charIcon(slug: string, name: string): string {
  return `/games/${slug}/${prefixForSlug(slug)}_icon_${fileName(name)}.png`;
}

export function assetIcon(slug: string, type: "weapon" | "module", name: string): string {
  return `/games/${slug}/${prefixForSlug(slug)}_${type}_${fileName(name)}.png`;
}
