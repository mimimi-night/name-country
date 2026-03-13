let isSharing = false

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

let converted = nameData[key][gender][rank]
html +=
'<div class="result-card">' +
flags[key] + '<br>' +
countryNames[key] + '<br>' +
'<b>'+ converted.roman +'</b><br>' +
'<span>'+ converted.native +'</span>' +
'</div>'

}

html += '</div>'

document.getElementById("result").innerHTML = html
document.getElementById("shareBtn").style.display="inline-block"

}

function shareResult(){

if(isSharing) return
isSharing = true

let target = document.getElementById("result")

html2canvas(target).then(canvas => {

canvas.toBlob(async function(blob){

const file = new File([blob],"name-result.png",{type:"image/png"})

const shareData = {
files:[file],
text:"My name in other countries",
}

if(navigator.share){
await navigator.share(shareData)
isSharing = false
}else{

let twitterUrl =
"https://twitter.com/intent/tweet?text=" +
encodeURIComponent("My name in other countries") +
"&url=" +
encodeURIComponent("https://mimimi-night.github.io/name-country/")

window.open(twitterUrl,"_blank")
isSharing = false
}

})

})

}
