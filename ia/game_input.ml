open Unix;;

type input = Left | Right | Enter | Bomb | Capture | Nothing;;

let trig_input inp =
  let command = "xdotool windowfocus `xdotool search --name \"Mozilla Firefox\" | head -1` &&  xdotool key " in
  match inp with
  | Left -> ignore(Sys.command(command ^ "Left"))
  | Right -> ignore(Sys.command(command ^ "Right"))
  | Enter -> ignore(Sys.command(command ^ "KP_Enter"))
  | Bomb -> ignore(Sys.command(command ^ "Up"))
  | Capture -> ignore(Sys.command(command ^ "Down"))
  | Nothing -> ()
;;

(*let test_trig inp =
  let fd = Unix.openfile "../key_queue" [Unix.O_WRONLY] 0o644 in
  let m = "essai" in
  ignore(Unix.write fd m 0 (String.length m))
;;*)

let rec trig_x_input inp n =
   match n with
   | 0 -> ()
   | _ -> trig_input inp; trig_x_input inp (n-1)
