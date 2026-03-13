function convert(){

let name = document.getElementById("nameInput").value.trim().toLowerCase()
let country = document.getElementById("country").value

let list = nameData[country]
let rank = list.indexOf(name)

if(rank === -1){
document.getElementById("result").innerText =
"Name not found! Your name might be rare and special!"
return
}

let html = '<div class="result-grid">'

for(let key in nameData){

if(key === country){
continue
}

let convertedName = nameData[key][rank]

if(convertedName){
html +=
'<div class="result-card">' +
flags[key] + '<br>' +
countryNames[key] + '<br>' +
'<b>' + convertedName + '</b>' +
'</div>'
}

}

html += '</div>'

document.getElementById("result").innerHTML = html
}
