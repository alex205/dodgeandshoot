open Graphics;;
open Utils;;

type black_list_t = {mutable bl : bool list}

let rec make_black_list n acu =
  if n = 0 then acu
  else make_black_list (n-1) (false::acu)

let update_black_list img bl =
  match bl with
  |[] -> failwith "Empty black list Oh my god !"
  |a :: tl -> 
     let rec loop img j acu =
      if j = Array.length img then acu 
      else loop img (j+1) (acu && img.(0).(j)=black)
     in List.rev((loop img 0 true):: List.rev tl)

let rec detect_end bl acu =
 match bl with
 | hd::tl -> detect_end tl (acu && hd)
 | [] ->acu

       

