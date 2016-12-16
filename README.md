# dodgeandshoot
Dodge and Shoot game initially created by Toon and Ratedbullet enhanced with an AI

## Installation
You will need these following packets installed : `nodejs` (with `npm`), `ocaml` (with `ocamlbuild`), `imagemagick` and `xdotool`.

Clone this repository and then execute `./dodge_configure.sh`

## Usage
To start the server run `./dodge_start.sh`

Open a browser and go to http://localhost:3000

Prepare the game, navigate through the menu until you arrive on the "Difficulté" screen, choose the number of players and the difficulty and then place the cursor on "Jouer". **Don't press enter !**

For the AI, in other terminal, go into *ia* folder and run `./main.native`. It will start the game with AI playing the red character.

Don't press any key unless you want to stop the program and don't change the window focus. (*AI is very strong, it can play several hours !*)

To kill the AI, you can use arrow keys to collide a ball. Or, change the window focus.

### Multiplayer
You can play against the AI in the two players mode. You are the blue square, use Q and D to move.

In this mode bombs aren't allowed, so you have a chance to win !

## Known bugs
The progressive mode can't be played because it's on developpment so the display is bugged.

Impossible mode can't be played with the regular AI because there are some parameters to adjust to be fit with the new ball's speed.

*Good luck ! Enjoy this wonderful game



*Don't forget to SUBSCRIBE*


