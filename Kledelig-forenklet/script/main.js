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
			let action = 'varelistevisning.html';
			if (/\/kontakt\//.test(window.location)){
				action = '../varelistevisning.html'
			}
			searchBar.innerHTML = `
			<form action="${action}" method="get" class="searchbar">
                <input class="searchbar" type="search" placeholder="Søk" name="q">
                <input type="submit" name="Søk" value="Søk">
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

function bestilt(){
		alert("Takk for bestillingen!");
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

// Medlemskap i dinkonto.html
function avslutteMedlemskap(){
	localStorage.removeItem('medlemskap');
	harMedlemskap = false;
	window.location.reload();
}

let medl = JSON.parse(localStorage.getItem("medlemskap"));
if (medl != null){
	let kontomedlemskap = document.getElementById('dittMedlemskapId');
	kontomedlemskap.innerHTML = '<p>Ditt medlemskap: <strong>' + medl.navn + '<strong><p>\n' +
	'<a href="kontakt/medlemskap.html">Endre</a>' +
	'<div><a onclick="avslutteMedlemskap()" href="">Avslutte</a><div>';
}
else{
	let kontomedlemskap = document.getElementById('dittMedlemskapId');
	kontomedlemskap.innerHTML = '<p>Du har ingen medlemskap<p>\n'+ 
	'<a href="kontakt/medlemskap.html"><h3>Bli medlem!<h3></a>';
}

