// Major Kenyan towns/counties used for the location filter on the hero
// search and the therapists directory. Kept as a flat list (not nested by
// county) since therapists list a single free-text town/city on their
// profile and we match against that with ILIKE — a flat list keeps the
// dropdown value directly usable as a search term.
export const KENYA_LOCATIONS = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Kisii",
  "Thika",
  "Nyeri",
  "Machakos",
  "Kakamega",
  "Kericho",
  "Meru",
  "Malindi",
  "Naivasha",
  "Kitale",
  "Garissa",
] as const

export const REMOTE_OPTION = "Online / Remote"
