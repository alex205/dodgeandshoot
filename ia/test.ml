
open Images;;
open Graphics;;
open Array;;
open Game_input;;
open Unix;;

(* ocamlc graphics.cma images.cmo test.ml -o test *)
(*mogrify -crop 597x436+40+41 output.png*)
(* R = 16711680
   Black = 0
   White = 16777215 
   purple = 12328318 *)

let aff tab =
  for row = 0 to Array.length tab - 1 do
   let line = tab.(row) in
    for col = 0 to Array.length line - 1 do
     Printf.printf "%d%!  " line.(col)
    done;
    Printf.printf "\n%!"
   done

let clone_matrix m =
  let cloned = Array.copy m in
  Array.iteri (fun i line -> cloned.(i) <- Array.copy line) cloned ;
  cloned


let traitement tab =
let white = 16777215 in
 for j = 0 to (Array.length tab.(0)) - 1 do
    for i = 0 to (Array.length tab -1) do
	let comp_i =(Array.length tab -1) -i in
	if comp_i != Array.length tab -1 then
		if tab.(comp_i).(j) < white && tab.(comp_i+1).(j) = white then tab.(comp_i).(j)<-(rgb 255 255 255)
    done;
   done


(*Printf.printf "%s%!" (string_of_bool (is_column img 0 0 0))*)

let rec is_column img i j px =
 if px >= 19 then true
   else img.(i).(j*20 + px) = 0 && is_column img i j (px+1)

(*Printf.printf "%d\n%!" (position_joueur img)*)
let position_joueur img =
  let i_max = Array.length img -4 in
  let red = 16711680 in
  let purple = 12328318 in
  let rec loop j =
    if j < Array.length img.(0) then
      if img.(i_max).(j) = red || img.(i_max).(j) = purple then j else loop (j+1)
    else -1
  in loop 0

(**********************************************)

let rec reachable img pos j obj =
 if pos = obj then true
 else
  if (obj-pos) <0 then
     if j <= obj then true
     else if img.(Array.length img - 60).(j) != 16777215  then reachable img pos (j-1) obj else false
  else
     if j >= obj then true
     else if img.(Array.length img - 60).(j) != 16777215 || (j-pos)<21 then reachable img pos (j+1) obj else false


let choose_direction pos obj =
 let diff = obj-pos in
  if diff <0 then Left
   else if diff > 0 then Right
    else Nothing


let rec best_pos img i j found res=
 if not found  then
  if i < Array.length img then
    if j < 20  then
      if is_column img i j 0 && (reachable img (position_joueur img) (position_joueur img) (j*20)) then best_pos img i (j+1) true (j*20)
      else best_pos img i (j+1) false (-1)
    else best_pos img (i+1) 0 true (j*20)
  else res
 else res

(**********************************************)



(****************************************)
(****************************************)

let rec coef_to_string l=
  match l with
  |[] ->  ""
  | (col,score)::tl -> "("^string_of_int col^","^string_of_int score^");" ^ (coef_to_string tl)


let eval_coef_col img col =
   let rec loop i =
     if i < Array.length img -1 && not(is_column img i col 0) then loop (i+1)
     else (col,i)
   in loop 0

let eval_coef_img img =
   let rec loop j =
     if j < ((Array.length img.(0))/20) then eval_coef_col img j :: loop (j+1)
     else []
   in loop 0

let update_coef_by_distance img pos coef_list = List.map (fun (col,score) -> (col,score+20*(abs (col - pos)) )) coef_list


(****************************************)
(****************************************)


let get_image img = lire_image ("../"^img)

let wait milli =
  let sec = milli /. 1000. in
  let tm1 = Unix.gettimeofday () in
  while Unix.gettimeofday () -. tm1 < sec do () done

let color_column img obj =
  for j = obj to (obj+19) do
   for i = 0 to 20 do
    img.(i).(j)<-(rgb 0 255 0)
  done;
 done;
 for j = 0 to Array.length img.(0)-1 do
  img.(Array.length img - 60).(j)<-(rgb 128 255 255)
 done
(*let monImage = get_image "output.png"*)




(*let run =trig_input Enter;
	open_graph " 600x440+700-350";
	wait 100.0;
	while true do
	 trig_input Capture;
	 let monImage = get_image "img_queue" in
	 traitement monImage;
	 let pos = (position_joueur monImage) in
	 let obj = (best_pos monImage 0 0 false (-1)) in
	 color_column monImage obj;
	 dessiner_image monImage;
	 trig_x_input (choose_direction pos obj) (if (abs (obj-pos))/20 >= 3 then 3 else (abs (obj-pos))/20);
	 
	done*)
let run =trig_input Enter;
	open_graph " 600x440+700-350";
	wait 100.0;
	while true do
	 trig_input Capture;
	 let monImage = get_image "img_queue" in
	 traitement monImage;
	let pos = (position_joueur monImage) in
	 let obj = (best_pos monImage 0 0 false (-1)) in
	let coef = (update_coef_by_distance monImage (pos/20) (eval_coef_img monImage)) in
	 Sys.command ("clear");
	 Printf.printf "%s\n\n%!" (coef_to_string coef);
	 color_column monImage obj;
	 dessiner_image monImage;
	 trig_x_input (choose_direction pos obj) (if (abs (obj-pos))/20 >= 3 then 3 else (abs (obj-pos))/20);
	 
	done


let () = run




(*let run =open_graph " 600x400+1200-50";wait 100.0;
	while true do
	 trig_input Capture;
	 wait 80.0;
	 let monImage = get_image "output.png" in
	 traitement monImage;
	 dessiner_image monImage;
	 trig_input (choose_direction (position_joueur monImage) (best_pos monImage 0 0 false (-1)));
	 ignore(Sys.command ("rm image/output.png"));
	done*)



(*Printf.printf "%d\n%!" (best_pos img 0 0 false (-1))*)

(*let rec best_pos img i j found res=
 if not found  then
  if i < Array.length img then
    if j < 30 then
      if is_column img i j 0 then best_pos img i (j+1) true (j*20)
      else best_pos img i (j+1) false (-1)
    else best_pos img (i+1) 0 true (j*20)
  else res
 else res *)




(*if obj-pos >=0 then (obj-pos)/20 else (pos-obj)/20*)
(*let run = open_graph " 600x400+1200-50";wait 100.0;
	while true do
 	 let monImage = get_image "output.png" in
	 traitement monImage;
	 dessiner_image monImage;
	 Printf.printf "%d\n%!" (best_pos monImage 0 0 false (-1));
	done*)
