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

        // Oppdaterer display navn og email
        document.getElementById('displayName').innerHTML = `<b>Navn:</b> ${tilLagring['firstName']} ${tilLagring['lastName']}`;
        document.getElementById('displayEmail').innerHTML = `<b>E-post:</b> ${tilLagring['email']}`;
        
        // Lagrer i browserens database
        localStorage.setItem('userAccountData', JSON.stringify(tilLagring));
        
        return '<h3>Takk ' + tilLagring['firstName'] + ', du er nå registrert hos Kledeli!</h3>';

    }catch(e){
        return '<p class="error">Feil oppstod under lagring av registreringsdatas: ' + e + '</p>';
    }
}
