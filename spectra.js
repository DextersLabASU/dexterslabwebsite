//GLOBAL VARIABLES (SOME FOR FUTURE IMPLEMENTATION)
const xsecs = (1800, 20000);
const labels = ["$f$", "[M/H]", "C/O", "$\\times R_p$", "log$_{10}$$\\kappa_{cld}$"];
const hdr = 'P[bar]                T[K]';
let T, P, H2, He, H2O, CO, CO2, CH4, NH3, H2S, PH3, HCN, C2H2, OH, Na, K, TiO, VO, HMBF, Fe;
const domain = "https://api.dexterslabasu.com:5000";

///////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////

//GET JSON FROM API (GENERIC)
async function callAPI(url, format = 'json', content_type = 'application/json', accept = 'application/json') {
    //API CALL TO /path
    try {
        const fileURL = url;
        const requestResponse = await fetch(fileURL, {
            method: 'GET',
            headers: {
                'Content-Type': content_type,
                'Accept': accept,
                'Origin': domain,
            }
        });
        if (requestResponse.ok) {
            if (format == 'json') {
                return await requestResponse.json();
            }
            else if (format == 'text') {
                return await requestResponse.text();
            }
            else if (format == 'blob') {
                return await requestResponse.blob();
            }
        } else {
            console.log('Request failed with status: ' + requestResponse.status);
            throw new Error('Request failed');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

//GET MODEL DATA FROM API
async function getModelData(planet, redist, logZ, CtoO, logKzz) {
    //API CALL TO /planet/getmodel
    return await callAPI(`${domain}/${planet}/getmodel?redist=${redist}&logZ=${logZ}&CtoO=${CtoO}&logKzz=${logKzz}`, 'json');
}

async function getModelGraphedData(planet, redist, logZ, CtoO, logKzz) {
    //API CALL THAT RETURNS HTML
    return await callAPI(`${domain}/${planet}/getmodel?redist=${redist}&logZ=${logZ}&CtoO=${CtoO}&logKzz=${logKzz}`, 'text', 'text/html', 'text/html');
}

//FILE DATA RETRIEVAL FROM API (FUTURE IMPLEMENTATION)
function getfireFlyReduction() {
    return [null, null, null, null];
}

//RETRIEVES ATMOSPHERIC STATE DATA FROM API
async function getAtmStateData() {
    //API CALL TO /atmstate
    return [T, P, H2, He, H2O, CO, CO2, CH4, NH3, H2S, PH3, HCN, C2H2, OH, Na, K, TiO, VO, HMBF, Fe] = await callAPI(`${domain}/atmstate`, 'json');
}

//RETRIEVES ATMOSPHERIC STATE IMAGE FROM API AND SETS IT TO AN IMAGE ELEMENT
async function getAtmStateImage(width, height) {
    //API CALL TO /atmstate/plot
    return await callAPI(`${domain}/atmosphericstructure/plot?width=${width}&height=${height}`, format = 'blob', content_type = 'image/png', accept = 'image/png');
}

async function loadPlanetChoices() {
    //API CALL TO /planets
    let planets = await callAPI(`${domain}/calculator/planetlist`, 'json');
    let planetSelect = document.getElementById("planetSelect");
    for (let i = 0; i < planets.length; i++) {
        let option = document.createElement("option");
        option.text = planets[i];
        option.value = planets[i];
        planetSelect.add(option);
    }
}

async function updateGraph(){
    var planet = document.getElementById("planetSelect").value;
    console.log(planet);
    if (planet == null || planet == "") {
        alert("Please select a planet.");
        return;
    }

    var redistSliderValue = document.getElementById("redistSlider").value;
    var mhSliderValue = document.getElementById("mhSlider").value;
    var coSliderValue = document.getElementById("coSlider").value;
    var logkzz1SliderValue = document.getElementById("logkzz1Slider").value;
    /*var logsigSliderValue = document.getElementById("logsigSlider").value;
    var logkzz2SliderValue = document.getElementById("logkzz2Slider").value;
    var logkSliderValue = document.getElementById("logkSlider").value;*/

    var individualGasContributionsToggle = document.getElementById("individualGasContributionsToggle").checked;
    var h20Toggle = document.getElementById("h2oToggle").checked;
    var coToggle = document.getElementById("coToggle").checked;
    var co2Toggle = document.getElementById("co2Toggle").checked;
    var ch4Toggle = document.getElementById("ch4Toggle").checked;
    var nh3Toggle = document.getElementById("nh3Toggle").checked;
    var h2sToggle = document.getElementById("h2sToggle").checked;
    var ph3Toggle = document.getElementById("ph3Toggle").checked;
    var hcnToggle = document.getElementById("hcnToggle").checked;
    var c2h2Toggle = document.getElementById("c2h2Toggle").checked;
    var ohToggle = document.getElementById("ohToggle").checked;
    var naToggle = document.getElementById("naToggle").checked;
    var kToggle = document.getElementById("kToggle").checked;
    var tioToggle = document.getElementById("tioToggle").checked;
    var voToggle = document.getElementById("voToggle").checked;
    var hminusToggle = document.getElementById("hnegToggle").checked;
    var feToggle = document.getElementById("feToggle").checked;

    console.log(h20Toggle)
    console.log(coToggle)

    redist = redistSliderValue;
    logz = mhSliderValue;
    CtoO = coSliderValue;
    logKzz = logkzz1SliderValue;

    //UPDATE IFRAME SOURCE
    var iframe = document.getElementById("myGraph");
    iframe.src = `${domain}/calculator/${planet}?redist=${redist}&logZ=${logz}&CtoO=${CtoO}&logKzz=${logKzz}&individualGasContributions=${individualGasContributionsToggle}&H2O_on=${h20Toggle}&CO_on=${coToggle}&CO2_on=${co2Toggle}&CH4_on=${ch4Toggle}&NH3_on=${nh3Toggle}&H2S_on=${h2sToggle}&PH3_on=${ph3Toggle}&HCN_on=${hcnToggle}&C2H2_on=${c2h2Toggle}&OH_on=${ohToggle}&NA_on=${naToggle}&K_on=${kToggle}&TiO_on=${tioToggle}&VO_on=${voToggle}&HMBF_on=${hminusToggle}&Fe_on=${feToggle}&width=1200&height=780`;
    console.log(iframe.src);
}

///////////////////////////////////////////////
//MAIN
///////////////////////////////////////////////
async function main() {
    await loadPlanetChoices();

    /*let atmstatedata = await getAtmStateData(); //DEMO OF RETRIEVING ATMOSPHERIC STATE FROM API
    let atmstateimage = await getAtmStateImage(1000, 1000, "atmstateimage"); //DEMO OF RETRIEVING ATMOSPHERIC STATE IMAGE FROM API
    let modelData = await getModelData('wasp39b_1drc', 1.0, 0.0, 0.1, -1.0); //DEMO OF RETRIEVING MODEL FROM API
    let modelGraph = await getModelGraphedData('wasp39b_1drc', 1.0, 0.0, 0.1, -1.0); //DEMO OF RETRIEVING MODEL FROM API (MAY NOT BE USED)*/
    
    document.getElementById("calcButton").addEventListener('click', function() {
        updateGraph();
    });
    //UPDATE ATMOSPHERIC STATE IMAGE
    //if (atmstateimage != null) {
        //const img = document.getElementById("atmstateimage");
        //img.src = URL.createObjectURL(atmstateimage);
    //}
}
main();