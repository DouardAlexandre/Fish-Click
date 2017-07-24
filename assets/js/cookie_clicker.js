

/*    
*     Fish & Click
*/



//variables
let score = 0;
let multiplier = 1;
let priceMultiplier = 50;
let priceAutoClicker = 500;
let priceBonus = 5000;
let counter = 30;
let checkAutoClicker = 0;
//raccourcis éléments
let display = document.getElementById("display");
let btnCompteur = document.getElementById('compteur');
let btnMultiply = document.getElementById("multiply");
let btnAutoclick = document.getElementById("autoclic");
let btnBonus = document.getElementById("bonus");
//affichage
display.innerHTML = score;
btnMultiply.innerHTML = " multiplier"+ "<br>"+"Prix x"+(multiplier+1)+" : " +priceMultiplier; 
btnAutoclick.innerHTML = "Auto clicker"+"<br>"+ "prix : "+priceAutoClicker; 
btnBonus.innerHTML = "bonus : "+ priceBonus; 
//Boutons désactivés
btnMultiply.disabled = true;
btnAutoclick.disabled = true;
btnBonus.disabled = true;

function compteur(){
	//moveUp()
	changeImage();
	score += multiplier;
	display.innerHTML = score;
}

/*
*Fonction qui multiplie chaque clicks par un coefficient
*/

function augmenterMultiplicateur(){
	//on s'assure de detenir les points nécessaires pour acheter l'option
	if (score > 50){
		score -= priceMultiplier;
	}
	multiplier++;
	priceMultiplier *= 2;
	display.innerHTML = score;
	btnMultiply.innerHTML = "x"+multiplier+" multiplier"+ "<br>"+"Prix x"+(multiplier+1)+" : " +priceMultiplier;   
}

/*
*Fonction qui génere un click automatique toutes les secondes
*/

function autoClicker(){
	checkAutoClicker = 1;
	score -= priceAutoClicker;
	btnAutoclick.innerHTML = "Auto clicker"+"<br>"+ "prix : "+priceAutoClicker;
	btnAutoclick.disabled = true;
	setInterval(function () { 
		btnCompteur.click();
	},1000);
}

function bonus(){
    // le score est délesté du prix du bonus
    score -= priceBonus;
    //affichage du score
    display.innerHTML = score;
	//boutton bonus désactivé
	btnBonus.disabled = true;
	//variable pour désactiver scoreBonus()
	enabled = 1;
	// click sur compteur lance scoreBonus()
	btnCompteur.onclick = scoreBonus;

        /*
        *Fonction qui augmente la valeur de chaque click de 200%
        */

        function scoreBonus() {
        	if (enabled == 1){
        		score += multiplier*2;
        		display.innerHTML = score;
				//oeil fermé au click
				changeImage(); 
			}else {
				score += multiplier;
				display.innerHTML = score; 
				changeImage();
			}
		}
         // intervalle d'ID seconds qui génere un click toutes les secondes
         let seconds = setInterval(timer, 1000);

		/*
        *Fonction qui fait décroitre un compteur et supprime l'intervalle .
        */

        function timer() {
        	if (counter == 0) {
				//desacive scoreBonus
				enabled = 2;
				//desacive intervalle
				clearInterval(seconds);
				btnBonus.disabled = true;
				btnBonus.innerHTML = "bonus : "+ priceBonus;
			} else {
				counter--;
				btnBonus.innerHTML = "bonus : "+ priceBonus+"<br>"+"temps : "+counter+"s "; 
			}
		}
		timer();
	}

    /*
    * 3 intervalles qui vérifient le statut des boutons (100ms pour empecher le spam de boutton)
    */

    setInterval(function () { 
    	if ( priceMultiplier > score ){
    		btnMultiply.disabled = true;
    	} else {
    		btnMultiply.disabled = false;
    	}

    },100);

    setInterval(function () { 
		// si on a les points pour acheter l'autoclicker et si l'autoclicker n'est pas actif
		if ( score > priceAutoClicker && checkAutoClicker == 0 ){
			//activation du button
			btnAutoclick.disabled = false;
		} 

	},100);
    setInterval(function () { 
    	if ( priceBonus > score ){
    		btnBonus.disabled = true;
    	} else {
    		btnBonus.disabled = false;
    	}

    },100);

   /*
    * fonction qui change l'état de la paupière quand on clique sur le compteur
    */

    function changeImage() {
	        // à l'appel de la fonction la source de l'image change
	        document.images["close"].src = "assets/images/close_eye.png";
            // après 300ms on repasse à l'image initiale
            setTimeout(function(){
            	document.images["close"].src = "assets/images/eye.png";
            }, 300);
        }

        /*
        * boutton sur l'ancre du titre qui donne 1000 points
        */

        function hak(){
        	score += 1000;
        	document.getElementById("display").innerHTML = score;
        }


        /*-------tests faire apparaitre une bulle à chaque click + pupille qui suit la souris...en cours-------------*/


      /*  let classBulle = document.getElementsByClassName("bulle")[0];
        classBulle.style.visibility = 'hidden';
        var animate ;

        function init(){

        	classBulle.style.top = '0px'; 
        }

        function moveUp(){

        	classBulle.style.visibility = 'visible';
        	classBulle.style.top = parseInt(classBulle.style.top) + -40 + 'px';
    animate = setTimeout(moveUp,10); // call moveRight in 20msec
    end = setTimeout(stop,250);

}

function stop(){
	clearTimeout(animate);
	clearTimeout(end);
	classBulle.style.top = '0px';
	classBulle.style.visibility = 'hidden'; 

}   

window.onload =init;
*/



/*---------------------------------------------------------------------------------*/

/*
var DrawEye = function(compteur, pupille, eyeposx, eyeposy){
  // Initialise core variables
  var r = document.getElementById("pupille").offsetWidth/2;
  var center = {
    x: document.getElementById('compteur').offsetWidth/2 - r, 
    y: document.getElementById('compteur').offsetWidth/2 - r
  };
  var distanceThreshold = document.getElementById('compteur').offsetWidth/2 - r;
  var mouseX = 0, mouseY = 0;
  
  // Listen for mouse movement
  document.body.onmousemove(function(e){ 
    var d = {
      x: e.pageX - r - eyeposx - center.x,
      y: e.pageY - r - eyeposy - center.y
    };
    var distance = Math.sqrt(d.x*d.x + d.y*d.y);
    if (distance < distanceThreshold) {
      mouseX = e.pageX - eyeposx - r;
      mouseY = e.pageY - eyeposy - r;
    } else {
      mouseX = d.x / distance * distanceThreshold + center.x;
      mouseY = d.y / distance * distanceThreshold + center.y;
    }
  });
  
  // Update pupil location
  var pupil =document.getElementById("pupille");
  var xp = 0, yp = 0;
  var loop = setInterval(function(){
    // change 1 to alter damping/momentum - higher is slower
    xp += (mouseX - xp) / 1;
    yp += (mouseY - yp) / 1;
    pupil.css({left:xp, top:yp});    
  }, 2);
};

var eye = new DrawEye("#compteur", "#pupille", 40, 20);
*/

/*---------------------------------------------------------------------------------*/