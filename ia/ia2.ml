open Graphics;;
open Utils;;
open Game_input;;
open Images;;

let white =16777215
let red =16711680
let black = 0
let purple = 12328318
let permissive = 350
let bomb_permissive = 325

type col_coef_t = (int*int)

let traitement tab =
 for j = 0 to (Array.length tab.(0)) - 1 do
    for i = 0 to (Array.length tab -1) do
	let comp_i =(Array.length tab -1) -i in
	if comp_i != Array.length tab -1 then
		if tab.(comp_i).(j) < white && tab.(comp_i+1).(j) = white then tab.(comp_i).(j)<-(rgb 255 255 255)
    done;
   done


let rec is_column img i j px =
 if px >= 19 then true
   else img.(i).(j*20 + px) = 0 && is_column img i j (px+1)

let position_joueur img =
  let i_max = Array.length img -4 in
  let rec loop j =
    if j < Array.length img.(0) then
      if img.(i_max).(j) = red || img.(i_max).(j) = purple then j else loop (j+1)
    else -1
  in loop 0


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

let update_coef_by_distance img pos coef_list = List.map (fun (col,score) -> (col,score+30*(abs (col - pos)) )) coef_list

let rec update_right_side pos memo l =
  match l with
  |[]->[]
  |(col,score)::tl -> if (score >= permissive || memo >= permissive) && col >pos then (col,1000):: update_right_side pos 1000 tl
		      else (col,score):: update_right_side pos 0 tl

let rec update_left_side pos memo l =
  match l with
  |[]->[]
  |(col,score)::tl -> if (score >= permissive || memo >= permissive) && col < pos then (col,1000):: update_left_side pos 1000 tl
		      else (col,score):: update_left_side pos 0 tl


let compare_tuple t1 t2 =
  match t1,t2 with
  |(c1,s1),(c2,s2)-> if s1!=s2 then compare s1 s2 else compare (abs (c1-14)) (abs (c2-14))

let choose_column coef_list_sorted =
   match coef_list_sorted with
   |(col,_)::tl-> col
   |_-> -1

let bomb coef_list_sorted pos =
 match coef_list_sorted with
 |(_,score)::tl-> if score > bomb_permissive then  trig_input Bomb
 |_-> ()


let choose_direction pos obj =
 let diff = obj-pos in
  if diff <0 then Left
   else if diff > 0 then Right
    else Nothing

