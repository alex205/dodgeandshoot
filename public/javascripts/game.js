/*var indexChoisiHard = document.forms["listes"].elements["hard"].selectedIndex;
var indexChoisiNBJ = document.forms["listes"].elements["NBJ"].selectedIndex;
var difficulty = document.forms["listes"].elements["hard"].options[indexChoisiHard].value;
var nbjoueurs = document.forms["listes"].elements["NBJ"].options[indexChoisiNBJ].value;*/

//Pour communiquer avec l'IA
var jscaml = new JsCaml('http://localhost:3001');

//LANCEMENT DE LA MUSIQUE DU JEU QUI PEUT ETRE ARRETE AVEC LE BOUTON MUTE
var audio = document.getElementById('son');
var ismuted = false;

function Mute(e) {
    e = e || window.event;
	audio.muted = !audio.muted;
	ismuted= !ismuted;
	e.preventDefault();
}

//INITIALISE LE CANVAS
 var monCanvas = document.getElementById('dessin');
	if(monCanvas.getContext){
		var ctx = monCanvas.getContext('2d');
		var i = 0;
		//ctx.translate(39,40);
		//ctx.strokeStyle ="white";
		ctx.strokeRect(0, 0, 600, 439); // on atteint la limite exacte du Canvas avec les bordures du cadre
		ctx.stroke();
		ctx.fillRect(posX1,419,20,20);

	} else {
	alert('canvas non supporté par le navigateur');
 }


 //DESSINE LE CADRE DU JEU
function Cadre(){ //Cette fonction sera utilisée pour réafficher le cadre qui limite le jeu pendant les animations
	ctx.strokeStyle ="white";
	ctx.strokeRect(0, 0, 600, 439); // on atteind la limite exacte du Canvas avec les bordures du cadre
}

//dessine les boules en focntion du pseudo (easter-egg)
function Dessin(X,Y,R,V,Pseudo){
	if(Pseudo==="Pokemon"){
		DessinPKM(X,Y,R,V);
	} else if(Pseudo==="Pacman"){
		DessinPacman(X, Y, R, V);
	} else if(Pseudo==="Pizza"){
		DessinBoules(X,Y,R,"pizza");
	} else if(Pseudo==="Minion"){
	    DessinBoules(X,Y,R,"minion");
	} else {
		DessinBase(X,Y,R,V);
	}

}



 //DESSINE LES BOULES
 function DessinBase(X, Y, R, V){
	 ctx.arc(X,Y,R,0,2 * Math.PI, false);
	 ctx.fillStyle ="white";
 	 ctx.fill();
 }

 //DESSINE LES BOULES
 function DessinBoules(X, Y, R,name){

 	if(images[name].loaded==true){
 		ctx.drawImage(images[name].img,X-R,Y-R,2*R,2*R);
 	}

 }

 //DESSINE une image
 function DessinImage(X, Y, Long, Larg, name){

 	if(images[name].loaded==true){
 		ctx.drawImage(images[name].img,X,Y,Long,Larg);
 	}

 }

  //DESSINE LES BOULES Pacman
 function DessinPacman(X, Y, R, V){
	ctx.arc(X,Y,R,Math.PI/8,9*Math.PI/8, false);
	ctx.fillStyle ="yellow";
 	ctx.fill();

	ctx.beginPath();
 	ctx.arc(X,Y,R,-Math.PI/8,-9*Math.PI/8, true);
 	ctx.fill();

 	ctx.beginPath();
 	ctx.fillStyle="black";
 	ctx.arc(X+R*0.35,Y-R*0.5,R*0.1,0,2*Math.PI, true);
 	ctx.fill();
 }

  //DESSINE LES BOULES Pokemon
 function DessinPKM(X, Y, R, V){
	//demi sphère rouge
	ctx.fillStyle ="red";
 	ctx.arc(X,Y,R,0,-Math.PI, true);
 	ctx.fill();
 	ctx.beginPath();
	//demi sphère blanche
 	ctx.fillStyle ="white";
 	ctx.arc(X,Y,R,0, -Math.PI, false);
 	ctx.fill();

	ctx.beginPath();
	ctx.fillStyle="black";
 	ctx.rect(X-R,Y-(R*0.05),2*R,R*0.1);
 	ctx.fill();

 	//centre de la ball
 	ctx.beginPath();
 	ctx.fillStyle ="black";
 	ctx.arc(X,Y,R*0.2,0, 2*Math.PI, false);
 	ctx.fill();

 	ctx.beginPath();
 	ctx.fillStyle ="white";
 	ctx.arc(X,Y,R*0.1, 2*Math.PI, false);
 	ctx.fill();

 }


//Dessine les carrés des joueurs
 function DessinerJoueur(nbjoueurs){
    ctx.save();
     ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
     ctx.save();
 	if((nbjoueurs%2)==1){
		ctx.fillStyle="red";
		ctx.fillRect(posX1,418,20,20);
	} else {
		if(posX1==posX2 && loose1==loose2){
			ctx.fillStyle="#BC1D7E";//violet en fait
			ctx.fillRect(posX1,418,20,20);
			ctx.restore();
			ctx.save();
			ctx.fillStyle= "#BC1D7E";//violet en fait
			ctx.fillRect(posX2,418,20,20);
		} else {
			if(loose1==0 && loose2==0){
				ctx.fillStyle="red";
				ctx.fillRect(posX1,418,20,20);
				ctx.restore();
				ctx.save();
				ctx.fillStyle="blue";
				ctx.fillRect(posX2,418,20,20);
			} else if(loose1==0 && loose2==1){
				ctx.fillStyle="red";
				ctx.fillRect(posX1,418,20,20);
			} else if(loose1==1 && loose2==0){
				ctx.fillStyle="blue";
				ctx.fillRect(posX2,418,20,20);
			}
		}
	}
     ctx.restore();

 }

//crée une image et la charge : oeuf de paques
 var images={};
function Create_Image(src,name){
	var img = new Image();
	img.src=src;
	var image = {img:img,name:name,loaded:false};
	images[name]=image;
	img.onload=function(){
		image.loaded=true;
	}
}




//variables globales importantes
var nb_boules = 25;
var playing =0;
 var menupresentation=1;
 var menuselect=0;
 var menuplay=0;
 var selectplay=0;
 var selectplayers=0;
 var selectdifficulty=0;
 var menuregle=0;
 var menucontrole=0;
 var menucredits=0;
 var menuperdu=0;
 var select=0;
 var selectperdu=0;
 var Nb_tir_executes=1;
 var shoot=0;
 var loose=0;
 var loose1=0;
 var loose2=0;
 var boules=0;
 var scoreJ1=0;
 var scoreJ2=0;

 var nbjoueurs=1;
 var difficulty=1;

function ImageDontExist(url)
{
   var img = new Image();
   img.src = url;
   return img.height == 0;
}


function fileExists(url) {
    if(url){
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send();
        return req.status==200;
    } else {
        return false;
    }
}

function UrlExists(url) {
$('<img src="'+ url +'">').load(function() {
    return true;
}).bind('error', function() {
    return false;
});
}


 function to_image(){
		// var new_image =  monCanvas.toDataURL('image/png');
		// document.getElementById('dessin').src = dataURL;
		 var a = document.createElement('a');
		 a.href = monCanvas.toDataURL('image/png');;
		 a.download = "output.png";
		 document.body.appendChild(a);
		 a.click();
		 document.body.removeChild(a);
 }

 // FONCTION TOURNANT AVEC L'INCREMENTATION DE INTER
 // ELLE FAIT ENTIEREMENT FONCTIONNER LE JEU
 // EN REUNISSANT LES DIFFERENTES FONCTIONS ET EN S'OCCUPANT DE L'APPARITION DES BOULES
 function Animer() {
    i++;
    Menu();
	Jeu();
 }

function MenuPresentation(){
    //i++;
    var inversion=1;
    var size = i/4;
    size=size%8;

    if(size==0 && inversion==1)
    {
        inversion=-1;
    } else if(size==0 && inversion==-1) {
        inversion=1;
    }

    ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
    DessinImage(0,0,600,439,"presentation");
   // Cadre();

    if(size<4)
    {
        DessinImage(98.5-(size*inversion*4),319-(size*inversion),403+(size*inversion*8),18+(size*inversion*2),"press");
    } else {
        DessinImage(98.5-((8-size)*inversion*4),319-((8-size)*inversion),403+((8-size)*inversion*8),18+((8-size)*inversion*2),"press");
    }
}

//Gestion du menu principal de selection
function MenuSelect(){
    ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
    DessinImage(0,0,600,439,"select");
    DessinImage(217.5,128,165,48,"jouer");
    DessinImage(197.5,188,205,48,"regle");
    DessinImage(140.5,244,319,48,"controles");
    DessinImage(185,302,230,48,"credits");

   // Cadre();
    //chevron 48*55
    if(select%4==0){
        DessinImage(392.5,128,55,48,"selecD");
        DessinImage(152.5,128,55,48,"selecG");
    } else if(select%4==1){
        DessinImage(412.5,188,55,48,"selecD");
        DessinImage(132.5,188,55,48,"selecG");
    } else if(select%4==2){
        DessinImage(469.5,244,55,48,"selecD");
        DessinImage(75.5,244,55,48,"selecG");
    } else if(select%4==3){
        DessinImage(425,302,55,48,"selecD");
        DessinImage(120,302,55,48,"selecG");
    }
}

//menu de selection de la difficulte
function MenuPlay(){
    ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
    DessinImage(0,0,600,439,"menuplay");
    DessinImage(44,98,265,30,"joueurs");
    DessinImage(76,200,201,30,"difficulte");
    DessinImage(217.5,335,165,48,"jouer");
    //Cadre();
    //chevron 30*34
    if(selectplay%3==0){
        DessinImage(314,98,34,30,"selecD");
        DessinImage(5,98,34,30,"selecG");
    }else if(selectplay%3==1){
        DessinImage(282,200,34,30,"selecD");
        DessinImage(39,200,34,30,"selecG");
    }else if(selectplay%3==2){
        DessinImage(392.5,335,55,48,"selecD");
        DessinImage(152.5,335,55,48,"selecG");
    }
    if(selectplayers%2==0){
        DessinImage(450,91,66,48,"unjoueur");
    }else {
        DessinImage(414.5,91,137,48,"deuxjoueurs");
    }
    if(selectdifficulty%5==0){
        DessinImage(393,200,180,48,"easy");
    }else if(selectdifficulty%5==1) {
        DessinImage(393,200,180,48,"medium");
    }else if(selectdifficulty%5==2) {
        DessinImage(393,200,180,48,"hard");
    }else if(selectdifficulty%5==3) {
        DessinImage(393,200,180,48,"impossible");
    }else if(selectdifficulty%5==4) {
        DessinImage(393,200,180,48,"progressive");
    }



}


//affichage de la page de règle
 function MenuRegle(){
    ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
    DessinImage(0,0,600,439,"menuregle");
   // Cadre();
 }

//affichage de la page de controles
 function MenuControle(){
    ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
    DessinImage(0,0,600,439,"menucontrole");
    //Cadre();
 }


//affichage de la page de credits
 function MenuCredits(){
    ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
    DessinImage(0,0,600,439,"menucredits");
    //Cadre();
 }

//affichage de la page du menu défaite
 function MenuPerdu(){

    ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
    DessinImage(0,0,600,439,"menuperdu");
    DessinImage(173.5,236,253,48,"rejouer");
    DessinImage(221,314,158,48,"menumot");
    DessinImage(53.5,88,493,28,"perdu");
    //Cadre();
    if(selectperdu%2==0){
        DessinImage(436.5,236,55,48,"selecD");
        DessinImage(108.5,236,55,48,"selecG");
    }else if(selectperdu%2==1){
        DessinImage(389,314,55,48,"selecD");
        DessinImage(156,314,55,48,"selecG");
    }
 }

//gestion des differents menu (regles,controles et lancement du jeu)
function Menu(){

   if(menupresentation==1){
       MenuPresentation();
   } else if(menuselect==1){
       MenuSelect();
   } else if(menuplay==1){
       MenuPlay();
   } else if(menuregle==1){
       MenuRegle();
   } else if(menucontrole==1){
       MenuControle();
   } else if(menucredits==1){
       MenuCredits();
   } else if(menuperdu==1){
       MenuPerdu();
   }
}

function DrawAll(n){
    DessinerJoueur(n);
    ctx.save();
		for (var j=0; j<=nb_boules; j++){
			if(Presence_Boule[j] == 1) {
				ctx.beginPath();
				Dessin(Coord_X[j],Coord_Y[j],Rayon[j],Vitesse[j],$('#name').val());
				ctx.restore();
            }
        }
    //Cadre();
}



 //Fonction permettant de jouer une partie
function Jeu(){

    if(loose==0){


		if(nbjoueurs==1){loose2=1};

		if((i%2)==0){
			Presence_Boule[Math.round(Math.random()*nb_boules)]=1;
		}

		DessinerJoueur(nbjoueurs);

		ctx.save();
		for (var j=0; j<=nb_boules; j++){
			if(Presence_Boule[j] == 1) {
				if(Coord_Y[j]<(439.0+Rayon[j])){
				ctx.beginPath();
				Coord_Y[j]=Coord_Y[j] + Vitesse[j];
				Dessin(Coord_X[j],Coord_Y[j],Rayon[j],Vitesse[j],$('#name').val());
				ctx.restore();
                if((nbjoueurs%2)==0){
			         CollisionJ1(j);
			         CollisionJ2(j);
			         Perdu();
		        } else {
			         CollisionJ1(j);
			         Perdu();
		        }
				} else {
					if(loose1!=1){
						scoreJ1++;
					}
					if(loose2!=1){
						scoreJ2++;
					}
					boules++;
					if(nbjoueurs==1){
						shoot=scoreJ1/50;
					}
					if(nbjoueurs==1){
						document.getElementById("scoreJ1").innerHTML='Score Joueur 1: ' +scoreJ1;
					} else {
						document.getElementById("scoreJ1").innerHTML='Score Joueur 1: ' +scoreJ1;
						document.getElementById("scoreJ2").innerHTML='Score Joueur 2: ' +scoreJ2;
					}
					document.getElementById("bombe").innerHTML='Nombre de bombes disponibles : ' +(Math.ceil(shoot-Nb_tir_executes));
					Reset_boules(j);
				}
			}
		}
		//Cadre();
	}
}


 // FONCTION PERMETTANT DE REINITIALISER LES BOULES SANS PRENDRE EN COMPTE LES DIFFICULTES
 function InitialiserBoules(difficulty,j){
 	Presence_Boule[j]=0;
	Rayon[j]=10+Math.random()*20;
	Vitesse[j]=3*difficulty+Math.random()*4;
	Coord_X[j]=(Math.random()*600+Rayon[j])-Rayon[j];
	Coord_Y[j]=Rayon[j];
 }




 // FONCTION PERMETTANT DE REINITIALISER LES TABLEAUX DE BOULES EN PRENANT EN COMPTE LES DIFFICULTES
 function Reset_boules(j){
 	if(difficulty==0){
		Presence_Boule[j]=0;
		Rayon[j]=10+Math.random()*20;
		Vitesse[j]=(boules/30)+Math.random()*4+2;
		Coord_X[j]=(Math.random()*600+Rayon[k])-Rayon[k];
		Coord_Y[j]=Rayon[j];
	} else if(difficulty==1){
		InitialiserBoules(difficulty,j);
	} else if(difficulty==2){
		InitialiserBoules(difficulty,j);
	} else if(difficulty==3){
		InitialiserBoules(difficulty,j);
	} else if(difficulty==9){
		InitialiserBoules(difficulty,j);
	}
 }

// FONCTION CORRESPONDANT A L'EXPLOSION QUI DETRUIT TOUTES LES BOULES
 function Boom(){
	shoot=shoot-Nb_tir_executes;
	if(shoot>0){
		Nb_tir_executes++;
		if(nbjoueurs==1){
		shoot=scoreJ1/50;
		}
		document.getElementById("bombe").innerHTML='Nombre de bombes disponibles : ' +Math.ceil((shoot-Nb_tir_executes));
		var soundboom = new Audio('music/boom.mp3');
		if(!ismuted){
			soundboom.play();
		}
		for (var j=0;j<=25;j++){
			Reset_boules(j);
			ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
		}
	}

 }



 //GESTIONNAIRE DES INTERACTIONS CLAVIER
	var posX1 = 280;
	var posX2 = 280;
	document.addEventListener("keydown", down, false);
	document.addEventListener("keyup", up, false);
	function down(e){
		//traitement des differents cas
		if(e.keyCode==	38 || e.keyCode == 40 || e.keyCode == 32)
			e.preventDefault();
		switch(e.keyCode) {
		case 39:
			//fleche droite J1
            if(menuplay==1){
                if(selectplay%3==0){
                    selectplayers++;
                }else if(selectplay%3==1){
                    selectdifficulty++;
                }
            }else{
                if(posX1<580 && playing ==1){
                    posX1 = posX1 + 20;
                    DrawAll(nbjoueurs);
                }
            }
			break;
		case 37:
			//fleche gauche J1
            if(menuplay==1){
                if(selectplay%3==0){
                    selectplayers++;
                }else if(selectplay%3==1){
                    if(selectdifficulty!=0){
                        selectdifficulty--;
                    } else{
                        selectdifficulty=4;
                    }
                }
            }else{
                if(posX1>0 && playing ==1){
                posX1 = posX1-20;
                    DrawAll(nbjoueurs);
                }
            }
			break;

		case 68:
			//fleche droite J2
            if(posX2<580 && playing ==1){
            posX2 = posX2 + 20;
               DrawAll(nbjoueurs);
            }
			break;
		case 81:
			//fleche gauche J2
			if(posX2>0 && playing ==1){
			posX2 = posX2-20;
                DrawAll(nbjoueurs);
			}
			break;
		case 38:
			//fleche haut
            if(menuselect==1){
                if(select!=0){
                    select=select-1;
                } else {
                    select=3;
                }
                var soundselectmenu = new Audio('music/moveselection.mp3');
                if(!ismuted){
			     soundselectmenu.play();
                }
            }else if(menuperdu==1){
                selectperdu++;
                var soundselectmenu = new Audio('music/moveselection.mp3');
                if(!ismuted){
			     soundselectmenu.play();
                }
            } else if(menuplay==1){
                if(selectplay!=0){
                    selectplay=selectplay-1;
                } else {
                    selectplay=2;
                }
                var soundselectmenu = new Audio('music/moveselection.mp3');
                if(!ismuted){
			     soundselectmenu.play();
                }
            } else if(nbjoueurs==1){
				Boom();
			}
			e.preventDefault();
			break;
        case 40:
	//to_image();
          jscaml.export_canvas();
			//fleche bas
            if(menuselect==1){
                select=select+1;
                var soundselectmenu = new Audio('music/moveselection.mp3');
                if(!ismuted){
			     soundselectmenu.play();
                }
            }else if(menuperdu==1){
                selectperdu++;
                var soundselectmenu = new Audio('music/moveselection.mp3');
                if(!ismuted){
			     soundselectmenu.play();
                }
            } else if(menuplay==1){
                selectplay++;
                var soundselectmenu = new Audio('music/moveselection.mp3');
                if(!ismuted){
			     soundselectmenu.play();
                }
            }
			e.preventDefault();
			break;
		case 13:

			//enter
            if(menupresentation==1){
                menupresentation=0;
                menuselect=1;

            } else if(menuselect==1){
                menuselect=0;
                if(select%4==0){
                    menuplay=1;
                } else if(select%4==1){
                    menuregle=1;
                } else if(select%4==2){
                    menucontrole=1;
                } else if(select%4==3){
                    menucredits=1;
                }
            } else if(menuplay==1){
                if(selectplay%3==2){
                    if(selectplayers%2==0){
                        nbjoueurs=1;
                    }else if(selectplayers%2==1){
                        nbjoueurs=2;
                    }
                    if(selectdifficulty%5==0){
                        difficulty=1;
                    } else if(selectdifficulty%5==1){
                        difficulty=2;
                    } else if(selectdifficulty%5==2){
                        difficulty=3;
                    } else if(selectdifficulty%5==3){
                        difficulty=9;
                    } else if(selectdifficulty%5==4){
                        difficulty=0;
                    }
                    menuplay=0;
                    selectplay=0
                    selectplayers=0
                    selectdifficulty=0;
                    Recommencer();
                }
            } else if(menuperdu==1){
				if(selectperdu%2==0){
                    menuperdu=0;
                    Recommencer();
                } else if(selectperdu%2==1){
                    menuperdu=0;
                    menuselect=1;
                }
			}
			break;
          case 27:
			//echap
            if(menuselect==1){
                menuselect=0;
                menupresentation=1;
            } else if(menuplay==1){
                menuplay=0;
                menuselect=1;
            } else if(menuregle==1){
                menuregle=0;
                menuselect=1;
            } else if(menucontrole==1){
                menucontrole=0;
                menuselect=1;
            } else if(menucredits==1){
                menucredits=0;
                menuselect=1;
            }
			e.preventDefault();
			break;

          case 77:
                Mute(e);
                break;

		default:
		}
	}
	function up(e){
		posX1 = posX1;
	}

 //FONCTION DE MOUVEMENT DU PERSONNAGE CARRE

function DistancePlayer1ToBall(j){
    return Math.sqrt(Math.pow(Math.abs((418+10)-Coord_Y[j]), 2) + Math.pow(Math.abs((posX1+10)-Coord_X[j]),2));
}

function DistancePlayer2ToBall(j){
    return Math.sqrt(Math.pow(Math.abs((418+10)-Coord_Y[j]), 2) + Math.pow(Math.abs((posX2+10)-Coord_X[j]),2));
}

 // FONCTION POUR VERIFIER S'IL Y A COLLISION ENTRE UNE BOULE ET LE PERSONNAGE 1
	function CollisionJ1(j){

            if(DistancePlayer1ToBall(j) < Rayon[j]+5){
                loose1=1;
				loose =(loose1 && loose2);
            }

	}

// FONCTION POUR VERIFIER S'IL Y A COLLISION ENTRE UNE BOULE ET LE PERSONNAGE 2
	function CollisionJ2(j){

			if(DistancePlayer2ToBall(j) < Rayon[j]+5){
                loose2=1;
				loose =(loose1 && loose2);
            }

	}

	//Fonction qui vérifie si la partie est terminée
 	function Perdu(){
		if(loose==1){
            for(var i =0; i<1000000000;i++){}
            audio.pause();
            audio.currentTime=0;
            playing =0;
            menuperdu=1;
			for (var i=0;i<=nb_boules;i++){
				//$("#hardCss").show();
				ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
                var nam = $('#name').val();
                /*$.ajax({
                    type: 'GET',
                    url: 'saveScore.php',
                    data: { score: scoreJ1, name: nam, difficulty: 4 },
                    timeout: 3000,
                    success: function() {
                    },
                    error: function() {
                        alert('ça marche pas !!!!!!');
                    }
                });*/
                Presence_boule[i]=0;
			}
		}
	}

 //FONCTION POUR RECOMMENCER A JOUER
 function Recommencer(){

     audio.play();
     playing =1;
     menuselect==0;
     selectperdu=0;
	//$("#hardCss").hide();
	if(audio.ended){
		audio.restartAudio();
	}
	/*indexChoisiHard = document.forms["listes"].elements["hard"].selectedIndex;
	indexChoisiNBJ = document.forms["listes"].elements["NBJ"].selectedIndex;
	difficulty = document.forms["listes"].elements["hard"].options[indexChoisiHard].value;
	nbjoueurs = document.forms["listes"].elements["NBJ"].options[indexChoisiNBJ].value;*/
    posX1 = 280;
    posX2 = 280;
	boules=0;
	scoreJ1=0;
	scoreJ2=0;
	shoot=0;
	loose=0;
	loose1=0;
	loose2=0;
	Nb_tir_executes=1;

	$('#name').hide();
	if(nbjoueurs==1){
		document.getElementById("scoreJ1").innerHTML='Score Joueur 1: ' +scoreJ1;
		$('#name').show();
		$('#scoreJ2').hide();
	} else {
		$('#scoreJ2').show();
		document.getElementById("scoreJ1").innerHTML='Score Joueur 1: ' +scoreJ1;
		document.getElementById("scoreJ2").innerHTML='Score Joueur 2: ' +scoreJ2;
		$('#name').hide();
	}
	document.getElementById("bombe").innerHTML='Nombre de bombes disponibles : 0';
	for (var j=0;j<=25;j++){
		Reset_boules(j);
		ctx.clearRect(-1,-1,monCanvas.width+200,monCanvas.height+200);
	}
 }



$(function(){

	$('#name').hide();

// CREATION DES IMAGES
//-----------------------------------------------------------//
    Create_Image("images/menu/presentation.png","presentation");
    Create_Image("images/menu/press.png","press");
    Create_Image("images/menu/menu.png","select");
    Create_Image("images/menu/controles.png","controles");
    Create_Image("images/menu/credits.png","credits");
    Create_Image("images/menu/jouer.png","jouer");
    Create_Image("images/menu/regle.png","regle");
    Create_Image("images/menu/selecD.png","selecD");
    Create_Image("images/menu/selecG.png","selecG");
    Create_Image("images/menu/menuregle.png","menuregle");
    Create_Image("images/menu/menucontrole.png","menucontrole");
    Create_Image("images/menu/menucredits.png","menucredits");
    Create_Image("images/menu/menumot.png","menumot");
    Create_Image("images/menu/rejouer.png","rejouer");
    Create_Image("images/menu/perdu.png","perdu");
    Create_Image("images/menu/menuperdu.png","menuperdu");
    Create_Image("images/menu/menuplay.png","menuplay");
    Create_Image("images/menu/difficulte.png","difficulte");
    Create_Image("images/menu/joueurs.png","joueurs");
    Create_Image("images/menu/1joueur.png","unjoueur");
    Create_Image("images/menu/2joueurs.png","deuxjoueurs");
    Create_Image("images/menu/easy.png","easy");
    Create_Image("images/menu/medium.png","medium");
    Create_Image("images/menu/hard.png","hard");
    Create_Image("images/menu/impossible.png","impossible");
    Create_Image("images/menu/progressive.png","progressive");

//-----------------------------------------------------------//
                            //BOULES//
//-----------------------------------------------------------//
	Create_Image("images/boules/pizza.png","pizza");
	Create_Image("images/boules/minion.png","minion");
//-----------------------------------------------------------//
                    //Chargement des sons//
//-----------------------------------------------------------//
    //var soundboom = new Audio('music/boom.mp3');
    //var soundselectmenu = new audio('music/move_selection.mp3');
//-----------------------------------------------------------//
//gestion de l'affichage des scores en fonction du nombre de joueurs
	loose=1;
	if(nbjoueurs==1){
		document.getElementById("scoreJ1").innerHTML='Score Joueur 1: ' +scoreJ1;
		$('#name').show();
	} else {
		document.getElementById("scoreJ1").innerHTML='Score Joueur 1: ' +scoreJ1;
		document.getElementById("scoreJ2").innerHTML='Score Joueur 2: ' +scoreJ2;
		$('#name').hide();
	}


    /*$('#name').change(function() {
        //$('#restart').show();
        menupresentation=0;
        menuselect=1;
    });*/

	Coord_X = new Array(); Coord_Y = new Array(); Presence_Boule = new Array(); Rayon = new Array(); Vitesse = new Array ();
        //tableaux permettant de savoir la position des boules,
        //S'il elle doivent être affichées, leur rayon, et leur vitesse de chute

	if(difficulty==0){
		for(var k=0; k<=nb_boules;k++){ //initialisation des objets boules
			Presence_Boule[k]=0;
			Rayon[k]=10+Math.random()*20;
			Vitesse[k]=(boules/30)+Math.random()*4+2;
			Coord_X[k]=(Math.random()*600+Rayon[k])-Rayon[k];
			Coord_Y[k]=Rayon[k];
		}
	} else if(difficulty==1){
		for(var k=0; k<=nb_boules;k++){ //initialisation des objets boules
			InitialiserBoules(difficulty,k);
		}
	} else if(difficulty==2){
		for(var k=0; k<=nb_boules;k++){ //initialisation des objets boules
			InitialiserBoules(difficulty,k);
		}
	} else if(difficulty==3){
		for(var k=0; k<=nb_boules;k++){ //initialisation des objets boules
			InitialiserBoules(difficulty,k);
		}
	} else if(difficulty==9){
		for(var k=0; k<=nb_boules;k++){ //initialisation des objets boules
			InitialiserBoules(difficulty,k);
		}
	}

	var i =0;
	var inter = setInterval(Animer, 30);

 });
