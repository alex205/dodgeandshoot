(*************************
Cette version de notre IA est obsolète.
Par respect pour l'Histoire, nous l'avons laissé malgré tout.
Elle n'est pas très fûtée.
Nous l'avons baptisée l'Arthigu-IA. Toute ressemblance du nom avec celui d'une personne existante est tout à fait fortuite.

Du code en commun est présent entre les deux versions des IAs. Nous ne considérons pas ça comme de la duplication car la deuxième IA n'est préente que pour le plaisir.
*)


val is_column: Graphics.color array array -> int -> int -> int -> bool

val position_joueur: Graphics.color array array -> int

val reachable: Graphics.color array array ->  int -> int -> int -> bool

val best_pos: Graphics.color array array -> int -> int -> bool -> int -> int
