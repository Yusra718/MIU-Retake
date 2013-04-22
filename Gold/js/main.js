// Yusra Ahmed
// New App for MiU Retake
// MiU Term 1304

window.addEventListener("DOMContentLoaded", function() {

    function getId(id) {
        var element = document.getElementById(id)
        return element
    };

        //Save Data
    var save = getId("save");

        //Display Data Link
    var displayData = getId("displaydata");

        //Clear Link
    var clear = getId("clearstoreddata");

        //Meat
    var tu = getId("turkey"),
        ch = getId("chicken"),
        pa = getId("pastrami"),
        bb = getId("beefbacon"),
        nm = getId("nomeat"),
        meat = [tu, ch, pa, bb],
        meats = [tu, ch, pa, bb, nm]
    ;
        //Anything Else
    var tm = getId("tomatoes"),
        pi = getId("pickles"),
        on = getId("onions"),
        le = getId("lettuce"),
        no = getId("no"),
        other = [tm, pi, on, le],
        others = [tm, pi, on, le, no]
    ;
        //Cheese
    var ac = getId("americancheese"),
        mjc = getId("montereyjackcheese"),
        pc = getId("parmesancheese"),
        nc = getId("nocheese"),
        cheese = [ac, mjc, pc],
        cheeses = [ac, mjc, pc, nc]
    ;
        //Condiments
    var mayo = getId("mayo"),
        ke = getId("ketchup"),
        must = getId("mustard"),
        hs = getId("hotsauce"),
        noCon = getId("nocondiments"),
        condiment = [mayo, ke, must, hs],
        condiments = [mayo, ke, must, hs, noCon]
    ;
        //Delivery
    var addressForm = getId("address"),
        del = getId("delivery"),
        pu = getId("pickup"),
        h = getId("house"),
        st = getId("street"),
        city = getId("city"),
        zip = getId("zip"),
        notes = getId("notes")
    ;
        //Define variables to hold values
    var bcValue,
        delValue,
        selectedMeats = [],
        selectedExtras = [],
        selectedCheese = [],
        selectedCondiments = [],
        errMsg = getId("errors")
    ;
    
    function toggleDisplay(n){
        switch(n){
            case "on":
                getId("sandwichForm").style.display = "none";
                clear.style.display = "inline";
                displayData.style.display = "none";
                getId("addsandwich").style.display = "inline";
                break;
            case "off":
                getId("sandwichForm").style.display = "block";
                clear.style.display = "inline";
                displayData.style.display = "inline";
                getId("addsandwich").style.display = "none";
                getId("sandwich").style.display = "none";
                break;
            default:
                return false;
        }
    }

    function storeData(key){
        if(!key){
            var id = Math.floor(Math.random()*1000001);
        }else{
            id = key;
        }
        meatValues();
        extraValues();
        cheeseValues();
        condimentValues();
        selectedBreadColor();
        selectDelivery();
        var sandwich = {};
            sandwich.bcolor         = ["White/Whole Wheat:", bcValue];
            sandwich.breadtype      = ["Type of Bread:", getId("bread").value];
            sandwich.meat           = ["Meat(s):", selectedMeats];
            sandwich.anyelse        = ["Extra(s):", selectedExtras];
            sandwich.cheese         = ["Cheese(s):", selectedCheese];
            sandwich.condiments     = ["Condiment(s):", selectedCondiments];
            sandwich.delivery       = ["Get food by:", delValue];
            if(delValue == "Delivery"){
                sandwich.house          = ["House Number:", h.value];
                sandwich.street         = ["Street:", st.value];
                sandwich.city           = ["City:", city.value];
                sandwich.zip            = ["Zip Code:", zip.value];
                sandwich.requests       = ["Requests/Notes:", notes.value];
            }
        localStorage.setItem(id, JSON.stringify(sandwich));
        alert("Saved!");
    };
    
    function getData() {
        if(localStorage.length === 0){
            alert("You have not added any sandwiches, so we added some examples.");
            defaultData();
        }
        toggleDisplay("on");
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "sandwich");
        var makeList = document.createElement("ol");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        for (var i=0, j=localStorage.length-1; j>=i; j--) {
            var makeli = document.createElement("li");
            var links = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(j);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            for (var n in obj){
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(links);
            }
            makeLinks(localStorage.key(j), links);
        }
    };

    function makeLinks(key, links){
        var edit = document.createElement("a");
        edit.href = "#";
        edit.key = key;
        var editText = "Edit Sandwich";
        edit.addEventListener("click", editSandwich);
        edit.innerHTML = editText;
        links.appendChild(edit);
        edit.style.display = "inline-block"

        var deletion = document.createElement("a");
        deletion.href = "#";
        deletion.key = key;
        var deleteText = "Delete Sandwich";
        deletion.addEventListener("click", deleteSandwich);
        deletion.innerHTML = deleteText;
        links.appendChild(deletion);
        deletion.style.display = "inline-block"
    }


    function clearData() {
        if (localStorage.length === 0) {
            alert("Nothing to clear!")
            window.location.reload();
        } else {
            localStorage.clear();
            alert("Data Cleared!");
            window.location.reload();
            return false;
        }
    }
    function editSandwich(){
        var value = localStorage.getItem(this.key);
        var sandwich = JSON.parse(value);

        toggleDisplay("off");

        var breadColor = document.forms[0].bread;
        for(var h=0; h<breadColor.length; h++){
            if (breadColor[h].value == "White" && sandwich.bcolor[1] == "White"){
                breadColor[h].setAttribute("checked", "checked");
            } else if(breadColor[h].value == "Whole Wheat" && sandwich.bcolor[1] == "Whole Wheat"){
                breadColor[h].setAttribute("checked", "checked");
            }
        }

        getId("bread").value = sandwich.breadtype[1];
        
        for(var i=0, j=sandwich.meat[1].length; i<j; i++){
            for(var k=0, l=meats.length; k<l; k++){
                if(sandwich.meat[1][i] == meats[k].value){
                    meats[k].setAttribute("checked", "checked");
                }
            }
        }

        for(var m=0, n=sandwich.anyelse[1].length; m<n; m++){
            for(var o=0, p=others.length; o<p; o++){
                if(sandwich.anyelse[1][m] == others[o].value){
                    others[o].setAttribute("checked", "checked");
                }
            }
        }

        for(var q=0, r=sandwich.cheese[1].length; q<r; q++){
            for(var s=0, t=cheeses.length; s<t; s++){
                if(sandwich.cheese[1][q] == cheeses[s].value){
                    cheeses[s].setAttribute("checked", "checked");
                }
            }
        }

        for(var u=0, v=sandwich.condiments[1].length; u<v; u++){
            for(var w=0, x=condiments.length; w<x; w++){
                if(sandwich.condiments[1][u] == condiments[w].value){
                    condiments[w].setAttribute("checked", "checked");
                }
            }
        }

        var delivered = document.forms[0].delivery;
        for(var y=0; y<delivered.length; y++){
            if (delivered[y].value == "Delivery" && sandwich.delivery[1] == "Delivery"){
                delivered[y].setAttribute("checked", "checked");
                getId("address").style.display = "block";
                getId("house").style.display = "block";
                getId("street").style.display = "block";
                getId("city").style.display = "block";
                getId("zip").style.display = "block";
                getId("notes").style.display = "block";
                getId("house").value = sandwich.house[1];
                getId("street").value = sandwich.street[1];
                getId("city").value = sandwich.city[1];
                getId("zip").value = sandwich.zip[1];
                getId("notes").value = sandwich.requests[1];
            } else if(delivered[y].value == "Pick-Up" && sandwich.delivery[1] == "Pick-Up"){
                delivered[y].setAttribute("checked", "checked");
                getId("address").style.display = "none";
            }
        }

        noMeat();
        nothing();
        noCondiments();
        noCheese();

        // save.removeEventListener("click", validate);

        var editSave = getId("save");
        editSave.value = "Edit Sandwich";
        editSave.addEventListener("click", validate);
        editSave.key = this.key;
    }

    function deleteSandwich(){
        var ask = confirm("Remove Sandwich?");
        if(ask){
            localStorage.removeItem(this.key);
            window.location.reload();
        }else{
            alert("Sandwich NOT removed.");
        }
    }

    function validate(eventData){
        errMsg.innerHTML = "";
        var errMsgAry = [],
            getBreadColor = document.forms[0].bread,
            breadColorArry = [],
            getBreadType = getId("bread"),
            getMeat = document.forms[0].meat,
            meatArry = [],
            getOthers = document.forms[0].other,
            othersArry = [],
            getCheese = document.forms[0].cheese,
            cheeseArry = [],
            getCondiments = document.forms[0].condiments,
            condimentsArry = [],
            getDelivery = document.forms[0].delivery,
            deliveryArry = [],
            getHouseNumber = getId("house"),
            getStreet = getId("street"),
            getCity = getId("city"),
            getZipCode = getId("zip")
            
        ;
        for(var i=0; i<getBreadColor.length; i++){
            // var breadLi = getId("bread");
            if(getBreadColor[i].checked){
                breadColorArry.push(getBreadColor[i].value);
            }
        }

        if(breadColorArry.length === 0){
            var bcError = "Please choose White or Whole Wheat.";
            getId("breadCol").style.border = "1px solid red";
            errMsgAry.push(bcError);
        } else if(breadColorArry.length >= 1){
            getId("breadCol").style.border = "none";
        }

        if(getBreadType.value === "What would you like?"){
            var btError = "Please choose the type of bread you would like."
            getBreadType.style.border = "1px solid red";
            errMsgAry.push(btError);
        } else {
            getBreadType.style.border = "none";
        }

        for(var j=0; j<getMeat.length;j++){
            // var meatLi = getId("meat");
            if (meats[j].checked){
                meatArry.push(meats[j].value);
            }
        }

        if(meatArry.length === 0){
            var meatError = "Please choose some meat or select 'No Meat'.";
            getId("meat").style.border = "1px solid red";
            errMsgAry.push(meatError);
        } else if(meatArry.length >=1){
            getId("meat").style.border = "none";
        }

        for(var k=0; k<getOthers.length; k++){
            // var othersLi = getId("other");
            if(others[k].checked){
                othersArry.push(others[k].value);
            }
        }
        if(othersArry.length === 0){
            var otherError = "Please choose some veggies or select 'No'.";
            getId("other").style.border = "1px solid red";
            errMsgAry.push(otherError);
        } else if(othersArry.length >= 1){
            getId("other").style.border = "none";
        }

        for(var l=0; l<getCheese.length; l++){
            // var cheeseLi = getId("cheese");
            if(cheeses[l].checked){
                cheeseArry.push(cheeses[l].value);
            }
        }
        if(cheeseArry.length === 0){
            var cheeseError = "Please select a cheese or select 'No Cheese'.";
            getId("cheese").style.border = "1px solid red";
            errMsgAry.push(cheeseError);
        } else if(cheeseArry.length >= 1){
            getId("cheese").style.border = "none";
        }

        for(var m=0; m<getCondiments.length; m++){
            // var condimentsLi = getId("condiments");
            if(condiments[m].checked){
                condimentsArry.push(condiments[m].value);
            }
        }
        if(condimentsArry.length === 0){
            var conError = "Please select some condiments or select 'No Condiments'.";
            getId("condiments").style.border = "1px solid red";
            errMsgAry.push(conError);
        } else if(condimentsArry.length >= 1){
            getId("condiments").style.border = "none";
        }
        for(var n=0; n<getDelivery.length; n++){
            // var deliLi = getId("delivery");
            if(getDelivery[n].checked){
                deliveryArry.push(getDelivery[n].value);
            }
        }
       if(deliveryArry.length === 0){
            var deliError = "Please select how you will receive you order.";
            getId("receiveOrder").style.border = "1px solid red";
            errMsgAry.push(deliError);
        } else if(deliveryArry.length >= 1){
            getId("receiveOrder").style.border = "none";
            if(deliveryArry[0] == "Delivery"){
                if(getHouseNumber.value === ""){
                    var houseError = "Please enter your house number.";
                    getHouseNumber.style.border = "1px solid red";
                    errMsgAry.push(houseError);
                }if(getStreet.value === ""){
                    var streetError = "Please enter your street.";
                    getStreet.style.border = "1px solid red";
                    errMsgAry.push(streetError);
                }if(getCity.value === ""){
                    var cityError = "Please enter your city.";
                    getCity.style.border = "1px solid red";
                    errMsgAry.push(cityError);
                }if(getZipCode.value === ""){
                    var zipError = "Please enter your zip code.";
                    getZipCode.style.border = "1px solid red";
                    errMsgAry.push(zipError);
                }
            }
        }

        if(errMsgAry.length >=1){
            for(var o=0, p=errMsgAry.length; o<p; o++){
                var createErrorLi = document.createElement("li");
                createErrorLi.innerHTML = errMsgAry[o];
                errMsg.appendChild(createErrorLi);
                errMsg.style.color = "red";
            }
            eventData.preventDefault();
            return false;
        } else {
            storeData(this.key);
            window.location.reload();
        }
    }   

    function meatValues(){
        for(var i=0, j=meats.length; i<j; i++){
            if(meats[i].checked){
                selectedMeats.push(meats[i].value);
            }
        }
    }

    function extraValues(){
        for(var i=0, j=others.length; i<j; i++){
            if(others[i].checked){
                selectedExtras.push(others[i].value);
            }
        }
    }

    function cheeseValues(){
        for(var i=0, j=cheeses.length; i<j; i++){
            if(cheeses[i].checked){
                selectedCheese.push(cheeses[i].value);
            }
        }
    }

    function condimentValues(){
        for(var i=0, j=condiments.length; i<j; i++){
            if(condiments[i].checked){
                selectedCondiments.push(condiments[i].value);
            }
        }
    }

    // selected radio button value    
    function selectDelivery(){
        var delivered = document.forms[0].delivery;
        for(var i=0; i<delivered.length; i++) {
            if (delivered[i].checked){
                delValue = delivered[i].value;
            }
        }
    }
    
    // selected radio button value
    function selectedBreadColor(){
        var breadColor = document.forms[0].bread;
        for(var i=0; i<breadColor.length; i++) {
            if (breadColor[i].checked){
                bcValue = breadColor[i].value;
            }
        }
    }
   
    // html select option through javascript
    function makeBread(){
        var form = document.getElementsByTagName("form"),
            selectLi = getId("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "bread");
        for (var i=0, j=breadType.length; i<j; i++){
            var makeOption = document.createElement("option");
            var optText = breadType[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    };

        // Bread Type Select Field
    var breadType = ["What would you like?", "Hero", "Roll", "Bagel", "Sliced Bread", "Hamburger Buns"];

    // disable choices when "no" of each category is selected
    function noMeat() {
        for(var i=0, j=meat.length; i<j; i++){
            if (nm.checked) {
                meat[i].setAttribute("disabled", "disabled")
            } else {
                meat[i].removeAttribute("disabled", "disabled")
            }
        }
    };
    
    function nothing() {
        for(var i=0, j=other.length; i<j; i++){
            if (no.checked) {
                other[i].setAttribute("disabled", "disabled")
            } else {
                other[i].removeAttribute("disabled", "disabled")
            }
        }
    };
    
    function noCheese() {
        for(var i=0, j=cheese.length; i<j; i++){
            if (nc.checked) {
                cheese[i].setAttribute("disabled", "disabled")
            } else {
                cheese[i].removeAttribute("disabled", "disabled")
            }
        }
    };

    function noCondiments() {
        for(var i=0, j=condiment.length; i<j; i++){
            if (noCon.checked) {
                condiment[i].setAttribute("disabled", "disabled")
            } else {
                condiment[i].removeAttribute("disabled", "disabled")
            }
        }
    };
    
    function defaultData(){
        for(var d in json){
            var id = Math.floor(Math.random()*100001);
            localStorage.setItem(id, JSON.stringify(json[d]));
        }
    }

    // toggles the display of the address form
    function pickUp() {
        if (pu.checked) {
            h.style.display = "none",
            st.style.display = "none",
            city.style.display = "none",
            zip.style.display = "none",
            notes.style.display = "none",
            addressForm.style.display = "none"
        } else if (del.checked){
            h.style.display = "block",
            st.style.display = "block",
            city.style.display = "block",
            zip.style.display = "block",
            notes.style.display = "block",
            addressForm.style.display = "block"
        }
    };
    makeBread();
    nm.addEventListener("click", noMeat);
    no.addEventListener("click", nothing);
    nc.addEventListener("click", noCheese);
    noCon.addEventListener("click", noCondiments);
    pu.addEventListener("click", pickUp);
    del.addEventListener("click", pickUp);
    displayData.addEventListener("click", getData);
    save.addEventListener("click", validate);
    clear.addEventListener("click", clearData);
    
});