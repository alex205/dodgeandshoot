(****
Cette version de l'IA n'est pas obsolète.
Elle est relativement futée bien qu'elle soit un peu "brut".
Nous l'avons baptisée IkyA l'IA ky vous faut.
*)
(* On rappelle que l'image est constituée de 30 colonnes de 20 pixels*)


(*
Permet de traiter le tableau de pixel reçu sur le pipe nommé.
Elle fait apparaître les colonnes blanches visibles lors de l'execution du programme.
Ces colonnes nous permettent de déterminer les zones à éviter pour l'IA.
*)
val traitement: Graphics.color array array -> unit

(*
Détermine si une colonne donnée est libre (contient bien ses 20 pixels noirs)
*)
val is_column: Graphics.color array array -> int -> int -> int -> bool

(*
Récupère la position du joueur et renvoie sa colonne
*)
val position_joueur: Graphics.color array array -> int

(*
Convertis les tuples d'int en string
*)
val coef_to_string: (int*int) list -> string

(*
Permet de calculer le coefficient initial de dangerosité d'une colonne donnée. Retourne sa colonne et son indice de danger (nombre de pixels blanc sur cette colonne)
*)
val eval_coef_col: Graphics.color array array -> int -> (int*int)

(*
Initialise toutes les colonnes avec leur coefficients de dangerosité initiaux.
*)
val eval_coef_img: Graphics.color array array -> (int*int) list

(*
Mets a jour la liste de dangerosité. On augmente le coefficient de danger proportionellement à la distance entre la colonne et le joueur.
*)
val update_coef_by_distance: Graphics.color array array -> int -> (int*int) list -> (int*int) list

(*
On met à jour les coefficients de danger des colonnes à droite du joueur : si une colonne est considérée trop dangeureuse, toutes les suivantes le deviennent aussi.
*)
val update_right_side: int -> int -> (int*int) list -> (int*int) list

(*
On met à jour les coefficients de danger des colonnes à gauche du joueur : si une colonne est considérée trop dangeureuse, toutes les suivantes le deviennent aussi.
*)
val update_left_side: int -> int -> (int*int) list -> (int*int) list

(*
Permet de comparer des tuples (coefficients de danger + position de la colonne).
*)
val compare_tuple: (int*int) -> (int*int) -> int

(*
Classe les colonnes en fonction de leur coefficient de dangerosité. (ordre croissant)
*)
val choose_column: (int*int) list -> int

(*
Envoie une bombe qui nettoie l'écran de jeu si une bombe est disponible et que l'IA se sent en danger.
*)
val bomb: (int*int) list -> int -> unit

(*
Choisis une colonne "objectif" en fonction de a liste des coefficients de danger. On choisit évidemment la colonne la moins dangereuse.
*)
val choose_direction: int -> int -> Game_input.input

