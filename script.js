function normalizeName(name){

return name
.toLowerCase()
.replaceAll("uu","u")
.replaceAll("ou","o")
.replaceAll("oo","o")

}

function convert(){

let name = document.getElementById("nameInput").value.trim()

let country = document.getElementById("country").value

let gender = document.getElementById("gender").value

name = normalizeName(name)

let list = nameData[country][gender]

let normalizedList = list.map(n => normalizeName(n))

let rank = normalizedList.indexOf(name)

if(rank === -1){

document.getElementById("result").innerText =
"Name not found! Your name might be rare and special!"

return

}

let html = '<div class="result-grid">'

for(let key in nameData){

if(key === country) continue

let convertedName = nameData[key][gender][rank]

html +=
'<div class="result-card">' +
flags[key] + '<br>' +
countryNames[key] + '<br>' +
'<b>'+ convertedName +'</b>' +
'</div>'

}

html += '</div>'

document.getElementById("result").innerHTML = html
document.getElementById("shareBtn").style.display="inline-block"

}



function sharePage(){

const shareData = {
title:"Your name in other countries",
text:"Check what your name is in other countries!",
url:window.location.href
}

if(navigator.share){
navigator.share(shareData)
}else{

const twitterUrl =
"https://twitter.com/intent/tweet?text=" +
encodeURIComponent(shareData.text) +
"&url=" +
encodeURIComponent(shareData.url)

window.open(twitterUrl,"_blank")

}

}
