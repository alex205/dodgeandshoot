type black_list_t = {mutable bl : bool list}

val make_black_list: int -> bool list -> bool list

val update_black_list: Graphics.color array array -> bool list -> bool list

val detect_end: bool list -> bool -> bool
