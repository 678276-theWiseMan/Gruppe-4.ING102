const LOCAL_STORAGE_KEY = 'userAccountData';

function kontoOppretting(skjemaData){
    try{
        // Henter inn alle input-felt
        let inputs = skjemaData.querySelectorAll('input');
        
        // Klargjør objekt som skal inneholde innsendte data
        let tilLagring = {};
        
        // legger inn hvert felt og dets verdi
        inputs.forEach((inp) => {
            tilLagring[inp.id] = inp.value;
        });
        
        // Lagrer i browserens database
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tilLagring));
        
        // Oppdaterer konto data til UI
        visKontoData();
        
        // Returnerer respons
        return '<h3>Takk ' + tilLagring['firstName'] + ', du er nå registrert hos Kledeli!</h3>';

    }catch(e){
        return '<p class="error">Feil oppstod under lagring av registreringsdatas: ' + e + '</p>';
    }
}

/**
 * TODO:
 * document.getElementById('editAccountUI') får endret innerText til 'Rediger din konto' dersom konto allerede finnes.
 * document.getElementById('changePWfieldset').style.display = 'block' dersom konto allerede finnes.
 * document.getElementById('setPWfieldset').style.display = 'none' dersom konto IKKE finnes.
 */

async function visKontoData(){
	let changePWfieldset = document.getElementById('changePWfieldset');
	    let setPWfieldset = document.getElementById('setPWfieldset');
	let accountData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	if (accountData !== null){
		
		// Oppdater UI basert på eksisterende konto.
		
		let editAccountUI = document.getElementById('editAccountUI');
        	let newPWusername = document.getElementById('newPWusername');
        	let displayName = document.getElementById('displayName');
    	
		if (!!newPWusername && !!displayName) {
			newPWusername.innerText =`${accountData['firstName']} ${accountData['lastName']}`;
		}
		
		if (!!editAccountUI) {
			editAccountUI.innerText = 'Rediger din konto';
		}
		
		if (!!changePWfieldset) {
			// Viser område for ev. endring av passord.
			changePWfieldset.style.display = 'block';
		}
		
		if (!!setPWfieldset) {
			// Har kontor fra før, skjule område for førstegangssetting av passord
			setPWfieldset.outerHTML = '';
		}

		// Oppdaterer til konto-info
		try{
			let nameTrgt = document.getElementById('displayName');
        		let emailTrgt = document.getElementById('displayEmail');
			if (nameTrgt && emailTrgt){
				nameTrgt.innerHTML = `${accountData['firstName']} ${accountData['lastName']}`;
				emailTrgt.innerHTML = accountData['email'];
			}else{
				console.info('Kledeli: Fant ikke id-er displayName eller displayEmail');
			}
		}catch(e){
			console.error('Kledeli: Kunne ikke behandle kontodata: ' + e);
		}
		
		// Oppdaterer til skjemaoverskrift
		try{
			let skjemaOverskrift = document.getElementById('editAccountUI');
			if (!!skjemaOverskrift){
				skjemaOverskrift.innerText = 'Hold kontoen din oppdatert!';
			}
		}catch(e){
			console.error('Kledeli: Kunne ikke oppdatere skjemaoverskrift: ' + e);
		}
		
		// Oppdaterer til navigasjonsmenyen
		let dinKontoMenyElement = document.querySelector('nav').querySelector('a[href$="dinkonto.html"]');
		if (!!dinKontoMenyElement){
			try{
				dinKontoMenyElement.innerText = accountData['firstName'] + ' sin konto';
			}catch(e){
				console.error('Kledeli: Kunne ikke oppdatere meny-element: ' + e);
			}
		}
		// Fyll inn form-feltene hvis de eksisterer på siden
		try {
			let lastNameField = document.getElementById('lastName');
			let firstNameField = document.getElementById('firstName');
			let emailField = document.getElementById('email');
			
			if (lastNameField && firstNameField && emailField) {
				lastNameField.value = accountData['lastName'];
				firstNameField.value = accountData['firstName'];
				emailField.value = accountData['email'];
			}
		} catch(e) {
			console.error('Kunne ikke fylle ut form-feltene: ' + e);
		}

		
	}else{
		if (!!changePWfieldset) {
			// Har ikke konto fra før, skjuler område for 'Endre passord'.
			changePWfieldset.outerHTML = '';
	    }
		console.info('Kledeli: Ingen konto er registrert for denne bruker.');
	}
}

function updateFooter(){
	let firmaOpplysninger = document.createElement('div');
	firmaOpplysninger.id = 'firmaOpplysninger';
	firmaOpplysninger.innerHTML = `
		<h3>Firmaopplysninger</h3>
		<ul>
			<li>Stiftelsen Kledeli</li>
			<li>Organisasjonsnummer: NO 92939495 MVA</li>
			<li>Telefon: +47 900 90 733</li>
		</ul>
	`;
	document.querySelector('footer').appendChild(firmaOpplysninger);
	try {
	
	}catch(e){
		console.error('Kledeli: Kunne ikke sette inn i footer: ' + e);
	}
	
}

function updateSearchBtn(){
	// Oppdaterer til funksjonell HTML for søkefelt.
	try {
		let searchBar = document.querySelector('.searchbar-div');
		if (!!searchBar){
			let action = 'kategorier.html';
			if (/\/kontakt\//.test(window.location)){
				action = '../varelistevisning.html'
			}
			searchBar.innerHTML = `
			<form action="${action}" method="get" class="searchbar">
                <input class="searchbar" type="search" placeholder="Søk" name="q" id="searchbarBar">
                <label for="searchbarBar">
					<button ttype="submit" name="Søk" value="Søk">Søk</button>
				</label>
            </form>
			`;		
		}else{
			console.error('Kledeli: Kunne ikkefinne område for søk.');
		}
		
	}catch(e){
		console.error('Kledeli: Kunne ikke manipulere Search-knappen: ' + e);
	}	
}

function updateAllDynamic(){
	visKontoData();
	updateFooter();
	updateSearchBtn();
}

// Oppdaterer konto data til UI på alle sider (etter at siden er lastet helt).
document.addEventListener("DOMContentLoaded", updateAllDynamic);

function loggUt (){
	localStorage.clear();
	window.location.reload();
}

// Toggle for favoritt ved varelistevisning og varedetalj.
async function toggleFavoritt(element) {
    element.classList.toggle('active');
}

function handleKey(event, element) {
    if (event.key === 'Enter' || event.code === 'Space') {
        toggleFavoritt(element);
        event.preventDefault();
    }
}

// MEDLEMSKAP
class Medlemskap {
	constructor(maxPlagg, antallPlagg, navn){
		this.navn = navn;
		this.maxPlagg= maxPlagg;
		this.antallPlagg = antallPlagg;
	}
}

let medlemskap3 = new Medlemskap(3, 0, "3-Plagg");
let medlemskap5 = new Medlemskap(5, 0, "5-Plagg");
let medlemskap8 = new Medlemskap(8, 0, "8-Plagg");
let medlemskap10 = new Medlemskap(10, 0, "10-Plagg");

let harMedlemskap = new Boolean();

if (localStorage.getItem("harMedlemskap") != "true"){
	harMedlemskap = false;
	localStorage.setItem("harMedlemskap", JSON.stringify(harMedlemskap));
}


function getMedlemskap(buttonID){

	let accountData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
	
	if (accountData != null){

		let typeMedlemskap = null;

		switch(buttonID){
			case '03plagg':
				typeMedlemskap = medlemskap3;
				break;
			case '05plagg':
				typeMedlemskap = medlemskap5;
				break;
			case '08plagg':
				typeMedlemskap = medlemskap8;
				break;
			case '010plagg':
				typeMedlemskap = medlemskap10;
				break;
			default:
				console.log("Feil oppstod.");
		}
	
		localStorage.setItem("medlemskap", JSON.stringify(typeMedlemskap));

		harMedlemskap = true;
		localStorage.setItem("harMedlemskap", JSON.stringify(harMedlemskap));

		
		alert('Takk for kjøpet!\n\n' + 'Nå har du "' + typeMedlemskap.navn + '" medlemskap.');

		location.href = '../index.html';
	
	} else{
		alert('Du må ha en konto!');
		location.href = '../dinkonto.html';
	}


}

// MEDLEMSKAP i dinkonto.html og handlekurv
let medl = JSON.parse(localStorage.getItem("medlemskap"));

function navigateToLink(url) {
    window.location.replace(url);
}

function avslutteMedlemskap(){
	localStorage.removeItem('medlemskap');

	harMedlemskap = false;
	localStorage.setItem("harMedlemskap", JSON.stringify(harMedlemskap));

	window.location.reload();
}

if (medl != null){
	try{
		let kontomedlemskap = document.getElementById('dittMedlemskapId');
		kontomedlemskap.innerHTML =
		'<h3>Ditt medlemskap: <strong>' + medl.navn + '</strong></h3>\n' +
		'<p>Du har: <strong>' + parseInt(medl.maxPlagg - medl.antallPlagg) + '</strong> plagg igjen</p>\n' +
		'<strong>' +
		'<a onclick="navigateToLink(\'kontakt/medlemskap.html\')">Endre</a><br><br>' +
		'<a onclick="avslutteMedlemskap()" href="">Avslutte</a>' +
		'</strong>';
	} catch(e){
		try{
			let kontomedlemskap = document.getElementById('dittMedlemskapHandlekurvId');
			kontomedlemskap.innerHTML =
			'<p>Ditt medlemskap: <strong>' + medl.navn + '</strong></p>\n' +
			'<p>Du har: <strong>' + parseInt(medl.maxPlagg - medl.antallPlagg) + ' plagg igjen</strong></p>\n';
		}catch(e){
			console.log("Element not found.")
		}
	}
}
else{
	try{
		let kontomedlemskap = document.getElementById('dittMedlemskapId');
		kontomedlemskap.innerHTML =
		'<p>Du har ingen medlemskap<p>\n'+ 
		'<a onclick="navigateToLink(\'kontakt/medlemskap.html\')"><h3>Bli medlem!</h3></a>';
	} catch(e){
		try{
			let kontomedlemskap = document.getElementById('kjopmedlemskapHandlekurvId');
			kontomedlemskap.innerHTML =
			'<p>Du har ingen medlemskap<p>\n'+ 
			'<a onclick="navigateToLink(\'kontakt/medlemskap.html\')"><h3>Bli medlem!</h3></a>';
		} catch(e){
			console.log("Element not found.")
		}

	}

}

//mini "DATABASE" med plagg
class Garment {
	constructor(id, name, size, picture){
		this.id = id; 
		this.name = name;
		this.size = size;
		this.picture = picture;
	}
}

const body1S56 = new Garment(01, '"Hello" Body', 56, "grafikk/produkter/body1.jpeg");

const body2S86 = new Garment(02, 'Joha Body', 86, "grafikk/produkter/body2.jpeg");

const jakke1S128 = new Garment(03, 'Reima Jakke', 128, "grafikk/produkter/jakke1.jpeg");

const jakke2S98 = new Garment(04, 'Didrikson Jakke', 98, "grafikk/produkter/jakke2.jpeg");

const sko1S35 = new Garment(05, 'Superfit Joggesko', 35, "grafikk/produkter/sko1.jpeg");

const sko2S24 = new Garment(06, 'Superfit Støvler', 24, "grafikk/produkter/sko2.jpeg");

const sko3S24 = new Garment(07, 'Viking Støvler', 29, "grafikk/produkter/sko3.jpeg");

const stromper1S116 = new Garment(08, 'Fixoni Strømper', 116, "grafikk/produkter/stromper1.jpeg");

const votter1SG3 = new Garment(09, 'Reflex Votter', 3, "grafikk/produkter/votter1.jpeg");

const hansker2SG2 = new Garment(010, 'Reima Hansker', 2, "grafikk/produkter/hansker2.jpeg");


const allePlagg = [body1S56, body2S86, jakke1S128, jakke2S98, sko1S35, sko2S24, sko3S24, stromper1S116, votter1SG3, hansker2SG2]
localStorage.setItem("alleplag", JSON.stringify(allePlagg));

//HANDLEKURV
let finnesHandlekurv = localStorage.getItem("handlekurv");

if(finnesHandlekurv == null){
	let minHandlekurv = [sko2S24];
	localStorage.setItem("handlekurv", JSON.stringify(minHandlekurv));
}

let minHandlekurv = JSON.parse(localStorage.getItem('handlekurv'));

for (let i = 0; i < minHandlekurv.length; i++){
	visHandlekurv(minHandlekurv[i]);
}

function bestilt(){
	if(medl != null) {
		let check1 = medl.antallPlagg;
		let check2 = minHandlekurv.length;
		if((check1 + check2) <= medl.maxPlagg){
			medl.antallPlagg += minHandlekurv.length;
			localStorage.setItem('medlemskap', JSON.stringify(medl));
			minHandlekurv = [];
			localStorage.setItem("handlekurv", JSON.stringify(minHandlekurv));
			alert("Takk for bestillingen!");
			location.href = '../index.html';
		} else{
			alert("For mye i handlekurven");
		}
	}
	else{
		alert("Du må være medlem");
	}
}

function randomPlg(){
	return allePlagg[Math.floor(Math.random() * allePlagg.length)];
} 


function visHandlekurv(minGarment){
	const ulHandlekurv = document.querySelector("#handlekurvUL");

	// <li class="produktGrid2"></li>
	const newLi = document.createElement('li');
	newLi.setAttribute("class", "produktGrid2");

	//topDiv
	const topDiv = document.createElement('div');
	topDiv.setAttribute("class", "produkttekst");

	const newName = document.createElement('h3');
	newName.innerText = minGarment.name;
	topDiv.appendChild(newName);

	const newSize = document.createElement('p');
	newSize.innerText = 'Størrelse: ' + minGarment.size;
	topDiv.appendChild(newSize);

	//bottomDiv
	const bottomDiv = document.createElement('div');
	bottomDiv.setAttribute("class", "produktbildet");

	let newPicture = new Image();
	newPicture.src = minGarment.picture;
	newPicture.setAttribute("alt", "Plagg_" + minGarment.name);

	bottomDiv.appendChild(newPicture);

	//fjernButton
	const fjernButton = document.createElement('button');
	fjernButton.setAttribute("onclick", "fjernFraHandlekurv(this)");
	fjernButton.innerText = "Fjern";
	
	//newLi
	newLi.appendChild(topDiv);
	newLi.appendChild(bottomDiv);
	newLi.appendChild(fjernButton);
	ulHandlekurv.appendChild(newLi);

	for(let i = 0; i < minHandlekurv.length; i++){
		if(minHandlekurv[i].id == minGarment.id){
			newLi.setAttribute("id", minHandlekurv[i].id);
		} 
	}
}

function plaggFraVaredetalj(ID){
	for(let plagg of allePlagg){
		if(ID == plagg.id){
			minHandlekurv.push(plagg);
			break;
		}
	}
	localStorage.setItem('handlekurv', JSON.stringify(minHandlekurv));
}

function leggTilHandlekurv(minGarment){

	visHandlekurv(minGarment);
	let minHandlekurv = JSON.parse(localStorage.getItem('handlekurv'));
	minHandlekurv.push(minGarment);
	localStorage.setItem('handlekurv', JSON.stringify(minHandlekurv));
	location.reload()
}

function fjernFraHandlekurv(thisElement){

	for(let i = 0; i < minHandlekurv.length; i++){
		if (minHandlekurv[i].id == thisElement.parentElement.id){
			minHandlekurv.splice(i, 1);
			break;
		}
	}
	localStorage.setItem('handlekurv', JSON.stringify(minHandlekurv));
	thisElement.parentElement.remove();
	location.reload()
}

// Viser hvor mange plagg det er i handlekurven
if (minHandlekurv.length > 0) {
	const antallPlagg = document.getElementById("antallplaggIhk");
	const showPlagg = document.createElement('h3');
	showPlagg.innerText = minHandlekurv.length + " plagg i handlekurven";
	antallPlagg.appendChild(showPlagg);
}else {
	const antallPlagg = document.getElementById("antallplaggIhk");
	const showPlagg = document.createElement('h3');
	showPlagg.innerText = "Handlekurven er tom! :(";
	antallPlagg.appendChild(showPlagg);
}