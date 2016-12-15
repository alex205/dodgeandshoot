open Graphics;;



let white =16777215
let red =16711680
let black = 0
let purple = 12328318
let permissive = 350
let bomb_permissive = 325


let aff tab =
  for row = 0 to Array.length tab - 1 do
   let line = tab.(row) in
    for col = 0 to Array.length line - 1 do
     Printf.printf "%d%!  " line.(col)
    done;
    Printf.printf "\n%!"
   done


let wait milli =
  let sec = milli /. 1000. in
  let tm1 = Unix.gettimeofday () in
  while Unix.gettimeofday () -. tm1 < sec do () done

let rec string_of_list bl =
  match bl with
  |[]-> ""
  |hd::tl -> string_of_bool hd ^ " "^string_of_list tl

