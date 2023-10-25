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

function updateAllDynamic(){
	visKontoData();
	updateFooter();
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
