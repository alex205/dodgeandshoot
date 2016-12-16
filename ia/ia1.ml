open Graphics;;
open Images;;

let white =16777215
let red =16711680
let black = 0
let purple = 12328318
let permissive = 350
let bomb_permissive = 325

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

let rec reachable img pos j obj =
 if pos = obj then true
 else
  if (obj-pos) <0 then
     if j <= obj then true
     else if img.(Array.length img - 60).(j) != white  then reachable img pos (j-1) obj else false
  else
     if j >= obj then true
     else if img.(Array.length img - 60).(j) != white || (j-pos)<21 then reachable img pos (j+1) obj else false



let rec best_pos img i j found res=
 if not found  then
  if i < Array.length img then
    if j < 20  then
      if is_column img i j 0 && (reachable img (position_joueur img) (position_joueur img) (j*20)) then best_pos img i (j+1) true (j*20)
      else best_pos img i (j+1) false (-1)
    else best_pos img (i+1) 0 true (j*20)
  else res
 else res

