// Yusra Ahmed
// Project 2: Web App Part 2
// VFW Term 1210

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
        selectedBreadColor();
        selectDelivery();
        var sandwich = {};
            sandwich.bcolor         = ["White/Whole Wheat:", bcValue];
            sandwich.breadtype      = ["Type of Bread:", getId("bread").value];
            sandwich.meat           = ["Meat(s):", selectedMeats];
            sandwich.anyelse        = ["Other Thing(s):", selectedExtras];
            sandwich.cheese         = ["Cheese(s):", selectedCheese];
            sandwich.condiments     = ["Condiment(s):", selectedCondiments];
            sandwich.delivery       = ["Get food by:", delValue];
            sandwich.house          = ["House Number:", h.value];
            sandwich.street         = ["Street:", st.value];
            sandwich.city           = ["City:", city.value];
            sandwich.zip            = ["Zip Code:", zip.value];
            sandwich.requests       = ["Requests/Notes:", notes.value];
        localStorage.setItem(id, JSON.stringify(sandwich));
        alert("Saved!");
    };
    
    function getData() {
        toggleDisplay("on");
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "sandwich");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        for (var i=0, j=localStorage.length; i<j;i++) {
            var makeli = document.createElement("li");
            var links = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
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
            makeLinks(localStorage.key(i), links);
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
        //deletion.addEventListener("click", deleteSandwich);
        deletion.innerHTML = deleteText;
        links.appendChild(deletion);
        deletion.style.display = "inline-block"
    }


    function clearData() {
        if (localStorage.length === 0) {
            alert("Nothing to clear!")
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
        for(var h=0; h<breadColor.length; i++){
            if (breadColor[h].value == "White" && sandwich.bcolor[1] == "White"){
                breadColor[h].setAttribute("checked", "checked");
            } else if(breadColor[h].value == "Whole Wheat" && sandwich.bcolor[1] == "Whole Wheat"){
                breadColor[h].setAttribute("checked", "checked");
            }
        }

        getId("bread").value = sandwich.breadtype[1];
        
        for(var i=0, j=sandwich.meat.length; i<j; i++){
            for(var k=0, l=meats.length; k<l; k++){
                if(sandwich.meat[1][i] == meats[k].value){
                    meats[k].setAttribute("checked", "checked");
                }
            }
        }

        // if(sandwich.meat[1][0] == "Turkey"){
        //     tu.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][1] == "Turkey"){
        //     tu.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][2] == "Turkey"){
        //     tu.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][3] == "Turkey"){
        //     tu.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][0] == "Chicken"){
        //     ch.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][1] == "Chicken"){
        //     ch.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][2] == "Chicken"){
        //     ch.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][3] == "Chicken"){
        //     ch.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][0] == "Pastrami"){
        //     pa.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][1] == "Pastrami"){
        //     pa.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][2] == "Pastrami"){
        //     pa.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][3] == "Pastrami"){
        //     pa.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][0] == "Beef Bacon"){
        //     bb.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][1] == "Beef Bacon"){
        //     bb.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][2] == "Beef Bacon"){
        //     bb.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][3] == "Beef Bacon"){
        //     bb.setAttribute("checked", "checked");
        // }if(sandwich.meat[1][0] == "No Meat"){
        //     nm.setAttribute("checked", "checked");
        // }

        for(var m=0, n=sandwich.anyelse.length; m<n; m++){
            for(var o=0, p=others.length; o<p; o++){
                if(sandwich.anyelse[1][m] == others[o].value){
                    others[o].setAttribute("checked", "checked");
                }
            }
        }

        // if(sandwich.anyelse[1][0] == "Tomatoes"){
        //     tm.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][1] == "Tomatoes"){
        //     tm.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][2] == "Tomatoes"){
        //     tm.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][3] == "Tomatoes"){
        //     tm.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][0] == "Pickles"){
        //     pi.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][1] == "Pickles"){
        //     pi.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][2] == "Pickles"){
        //     pi.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][3] == "Pickles"){
        //     pi.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][0] == "Onions"){
        //     on.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][1] == "Onions"){
        //     on.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][2] == "Onions"){
        //     on.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][3] == "Onions"){
        //     on.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][0] == "Lettuce"){
        //     le.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][1] == "Lettuce"){
        //     le.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][2] == "Lettuce"){
        //     le.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][3] == "Lettuce"){
        //     le.setAttribute("checked", "checked");
        // }if(sandwich.anyelse[1][0] == "No"){
        //     no.setAttribute("checked", "checked");
        // }

        for(var q=0, r=sandwich.cheese.length; q<r; q++){
            for(var s=0, t=cheeses.length; s<t; s++){
                if(sandwich.cheese[1][q] == cheeses[s].value){
                    cheeses[s].setAttribute("checked", "checked");
                }
            }
        }

        // if(sandwich.cheese[1][0] == "Amercan Cheese"){
        //     ac.setAttribute("checked", "checked");
        // }if(sandwich.cheese[1][1] == "Amercan Cheese"){
        //     ac.setAttribute("checked", "checked");
        // }if(sandwich.cheese[1][2] == "Amercan Cheese"){
        //     ac.setAttribute("checked", "checked");
        // }if(sandwich.cheese[1][0] == "Monterey Jack Cheese"){
        //     mjc.setAttribute("checked", "checked");
        // }if(sandwich.cheese[1][1] == "Monterey Jack Cheese"){
        //     mjc.setAttribute("checked", "checked");
        // }if(sandwich.cheese[1][2] == "Monterey Jack Cheese"){
        //     mjc.setAttribute("checked", "checked");
        // }if(sandwich.cheese[1][0] == "Parmesan Cheese"){
        //     pc.setAttribute("checked", "checked");
        // }if(sandwich.cheese[1][1] == "Parmesan Cheese"){
        //     pc.setAttribute("checked", "checked");
        // }if(sandwich.cheese[1][2] == "Parmesan Cheese"){
        //     pc.setAttribute("checked", "checked");
        // }if(sandwich.cheese[1][0] == "No Cheese"){
        //     nc.setAttribute("checked", "checked");
        // }

        for(var u=0, v=sandwich.condiments.length; u<v; u++){
            for(var w=0, x=condiments.length; w<x; w++){
                if(sandwich.condiments[1][u] == condiments[w].value){
                    condiments[w].setAttribute("checked", "checked");
                }
            }
        }

        // if(sandwich.condiments[1][0] == "Mayo"){
        //     mayo.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][1] == "Mayo"){
        //     mayo.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][2] == "Mayo"){
        //     mayo.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][3] == "Mayo"){
        //     mayo.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][0] == "Ketchup"){
        //     ke.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][1] == "Ketchup"){
        //     ke.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][2] == "Ketchup"){
        //     ke.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][3] == "Ketchup"){
        //     ke.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][0] == "Mustard"){
        //     must.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][1] == "Mustard"){
        //     must.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][2] == "Mustard"){
        //     must.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][3] == "Mustard"){
        //     must.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][0] == "Hot Sauce"){
        //     hs.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][1] == "Hot Sauce"){
        //     hs.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][2] == "Hot Sauce"){
        //     hs.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][3] == "Hot Sauce"){
        //     hs.setAttribute("checked", "checked");
        // }if(sandwich.condiments[1][0] == "No Condiments"){
        //     noCon.setAttribute("checked", "checked");
        // }

        var delivered = document.forms[0].delivery;
        for(var y=0; y<delivered.length; y++){
            if (delivered[y].value == "Delivery" && sandwich.delivery[1] == "Delivery"){
                delivered[y].setAttribute("checked", "checked");
            } else if(delivered[y].value == "Pick-Up" && sandwich.delivery[1] == "Pick-Up"){
                delivered[y].setAttribute("checked", "checked");
            }
        }
        getId("house").value = sandwich.house[1];
        getId("street").value = sandwich.street[1];
        getId("city").value = sandwich.city[1];
        getId("zip").value = sandwich.zip[1];
        getId("notes").value = sandwich.requests[1];

        save.removeEventListener("click", validate);

        getId("save").value = "Edit Sandwich";
        var editSave = getId("save");
        editSave.addEventListener("click", validate);
        editSave.key = this.key;
    }

    function validate(e){
        var getBreadColor = document.forms[0].bread,
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
            getZipCode = getId("zip"),
            errMsgAry = []
        ;
        for(var i=0; i<getBreadColor.length;i++){
            var breadLi = getId("bread") + "_" + i;
            if (breadLi.checked){
                breadColorArry.push(breadLi);
            }
        }
        if(breadColorArry.length === 0){
            var bcError = "Please choose White or Whole Wheat.";
            getId("breadCol").style.border = "#666";
            errMsgAry.push(bcError);
        }
        if(getBreadType === "What would you like?"){
            var btError = "Please choose the type of bread you would like."
            getBreadType.style.color = "#666";
            errMsgAry.push(btError);
        }
        for(var j=0; j<getMeat.length;j++){
            var meatLi = getId("meat") + "_" + j;
            if (meatLi.checked){
                meatArry.push(meatLi);
            }
        }
        if(meatArry.length === 0){
            var meatError = "Please choose some meat or select 'No Meat'.";
            getId("meat").style.color = "#666";
            errMsgAry.push(meatError);
        }
        for(var k=0; k<getOthers.length; k++){
            var othersLi = getId("other") + "_" + k;
            if(othersLi.checked){
                othersArry.push(othersLi);
            }
        }
        if(othersArry.length === 0){
            var otherError = "Please choose some veggies or select 'No'.";
            getId("other").style.color = "#666";
            errMsgAry.push(otherError);
        }
        for(var l=0; l<getCheese.length; l++){
            var cheeseLi = getId("cheese") + "_" + l;
            if(cheeseLi.checked){
                cheeseArry.push(cheeseLi);
            }
        }
        if(cheeseArry.length === 0){
            var cheeseError = "Please select a cheese or select 'No Cheese'.";
            getId("cheese").style.color = "#666";
            errMsgAry.push(cheeseError);
        }
        for(var m=0; m<getCondiments.length; m++){
            var condimentsLi = getId("condiments") + "_" + m;
            if(condimentsLi.checked){
                condimentsArry.push(condimentsLi);
            }
        }
        if(condimentsArry.length === 0){
            var conError = "Please select some condiments or select 'No Condiments'.";
            getId("condiments").style.color = "#666";
            errMsgAry.push(conError);
        }
        for(var n=0; n<getDelivery.length; n++){
            var deliLi = getId("delivery") + "_" + n;
            if(deliLi.checked){
                deliveryArry.push(deliLi);
            }
        }
       if(deliveryArry.length === 0){
            var deliError = "Please select how you will receive you order.";
            getId("delivery").style.color = "#666";
            errMsgAry.push(deliError);
        }
        if(del.checked){
            if(getHouseNumber === ""){
                var houseError = "Please enter your house number.";
                getHouseNumber.style.color = "#666";
                errMsgAry.push(houseError)
            }if(getStreet === ""){
                var streetError = "Please enter your street.";
                getStreet.style.color = "#666";
                errMsgAry.push(streetError);
            }if(getCity === ""){
                var cityError = "Please enter your street.";
                getCity.style.color = "#666";
                errMsgAry.push(cityError);
            }if(getZipCode === ""){
                var zipError = "Please enter your zip code.";
                getZipCode.style.color = "#666";
                errMsgAry.push(zipError)
            }
        }
        if(errMsgAry >=1){
            for(var o=0, p=errMsgAry.length; o<p; o++){
                var createErrorLi = document.createElement("li");
                createErrorLi.innerHTML = errMsgAry[i];
                errMsg.appendChild(createErrorLi);
            }
        }
        e.preventDefault();
        return false;
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
            h.style.display = "inline-block",
            st.style.display = "inline-block",
            city.style.display = "inline-block",
            zip.style.display = "inline-block",
            notes.style.display = "inline-block",
            addressForm.style.display = "inline-block"
        }
    };
    
    makeBread();
    nm.addEventListener("click", noMeat);
    no.addEventListener("click", nothing);
    nc.addEventListener("click", noCheese);
    noCon.addEventListener("click", noCondiments);
    pu.addEventListener("click", pickUp);
    del.addEventListener("click", pickUp);
    displayData.addEventListener("click", validate);
    save.addEventListener("click", storeData);
    clear.addEventListener("click", clearData);
    
});