
val traitement: Graphics.color array array -> unit

val is_column: Graphics.color array array -> int -> int -> int -> bool

val position_joueur: Graphics.color array array -> int

val coef_to_string: (int*int) list -> string

val eval_coef_col: Graphics.color array array -> int -> (int*int)

val eval_coef_img: Graphics.color array array -> (int*int) list

val update_coef_by_distance: Graphics.color array array -> int -> (int*int) list -> (int*int) list

val update_right_side: int -> int -> (int*int) list -> (int*int) list

val update_left_side: int -> int -> (int*int) list -> (int*int) list

val compare_tuple: (int*int) -> (int*int) -> int

val choose_column: (int*int) list -> int

val bomb: (int*int) list -> int -> unit

val choose_direction: int -> int -> Game_input.input
