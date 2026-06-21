// stats.ts — i numeri mostrati nel riquadro "KoreRift in Numeri".
// Aggiorna qui i tuoi numeri reali (value) quando cambiano.
// icon = icona Font Awesome (fab = brand, fas = solid). color = colore del numero/icona.

export interface Stat {
  icon: string;
  value: string;   // es. "12.4K", "350", "1.2M"
  label: string;
  color: string;
}

export const stats: Stat[] = [
  { icon: "fab fa-twitch",    value: "—", label: "Follower Twitch",  color: "#9146FF" },
  { icon: "fab fa-tiktok",    value: "—", label: "Follower TikTok",  color: "#00D4C8" },
  { icon: "fas fa-heart",     value: "—", label: "Like TikTok",      color: "#FF2EB3" },
  { icon: "fab fa-youtube",   value: "—", label: "Iscritti YouTube", color: "#FF3B3B" },
  { icon: "fab fa-x-twitter", value: "—", label: "Follower X",       color: "#FFFFFF" },
];
