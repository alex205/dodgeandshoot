open Images;;
open Graphics;;
open Array;;
open Game_input;;
open Unix;;
open Ia1;;
open Ia2;;
open Utils;;
open Black;;


let black_list ={bl=make_black_list 6 []}

let get_image img = lire_image ("../"^img)

let color_column_j img tuple =
 match tuple with
 |(col,score) -> 
  for j = (col*20) to (col*20)+19 do
   for i=0 to 30 do
     if score <350 && score != (-1) then img.(i).(j) <- (rgb 0 255 0) else if score=(-1) then img.(i).(j) <- (rgb 128 255 255) else img.(i).(j) <- (rgb 255 0 0)
   done;
  done


let rec color_column img coef_list =
 match coef_list with
 |[] -> ()
 |(col,score)::tl -> color_column_j img (col,score); color_column img tl
  
let color_chosen img sorted =
 match sorted with
 |[]->()
 |(col,score)::tl-> color_column_j img (col,-1)




(* IA2 *)
let run =trig_input Enter;
	open_graph " 600x440+700-350";
	wait 100.0;
	while not (detect_end black_list.bl true) do
	 trig_input Capture;
	 let monImage = get_image "img_queue" in
	 traitement monImage;
	 black_list.bl <- update_black_list monImage black_list.bl;
	 let pos = (position_joueur monImage) in
	 let coef = List.rev (update_left_side (pos/20) 0 (List.rev (update_right_side (pos/20) 0 ((update_coef_by_distance monImage (pos/20) (eval_coef_img monImage)))))) in
	 let sorted = List.sort compare_tuple coef in
	 let obj = choose_column sorted in
	 ignore(Sys.command ("clear"));
	 Printf.printf "%s\n\n%!" (coef_to_string coef);
  	 Printf.printf "Colonne objectif (en bleu clair sur le graph Ocaml) : %d\n%!" obj;
         color_column monImage sorted;
         color_chosen monImage sorted;
	 dessiner_image monImage;
         bomb sorted (pos/20);
	 trig_x_input (choose_direction (pos/20) (obj)) (if (abs (obj-pos/20)) >= 3 then 3 else (abs (obj-pos/20)));
	done;
	ignore(Sys.command ("clear"));
	Printf.printf "Et c'est perdu !\nNos développeurs mentalistes pensent que la partie a été très courte, ou qu'une personne mal intentionnée y a mis fin !\n"; 
	Printf.printf "Ce n'est pas gentil, vous n'aimeriez pas que l'on vous empêche de vous amuser ainsi !\n";
	Printf.printf "Cela dit, merci d'avoir essayé notre IA ! Si ce n'est pas déjà fait, vous pouvez essayer de l'affronter dans un mode prévu à cet effet !\n";
	Printf.printf "Pensez à laisser un pouce bleu et à vous abonner !\n\n\n\n%!"


	

let () = run




(* IA1 : cette version du code est présente pour des raisons historiques *)
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
