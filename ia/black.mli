
(*
Structure contenant une liste de booléen mutable. ELle nous permettra de détacter la fin de la partie
*)
type black_list_t = {mutable bl : bool list}

(*
Créé une liste de type black_list_t de taille "n"
*)
val make_black_list: int -> bool list -> bool list

(*
Remplace le booléen le plus vieux par un nouveau booléen.
Vrai si on détecte une frame où l'ecran est vide (fin de aprtie ?) 
Faux sinon
*)
val update_black_list: Graphics.color array array -> bool list -> bool list

(*
Si la liste est remplit de "True" alors on détecte la fin de la partie et on renvoie "True"
*)
val detect_end: bool list -> bool -> bool
