let isSharing = false

// Turn any spelling into one comparable form, so "Tsumugi", "tumugi",
// "Raphaël" and "Raphael" all match the same entry.
function normalizeName(name, country){

let n = String(name)
.normalize("NFD")
.replace(/[̀-ͯ]/g, "")   // strip accents (é → e)
.toLowerCase()
.replace(/[^a-z]/g, "")            // drop spaces, hyphens, apostrophes

if(country === "japan"){
// Hepburn and Kunrei romaji both map to one form
n = n
.replace(/sh/g, "sy")
.replace(/ch/g, "ty")
.replace(/tsu/g, "tu")
.replace(/syi/g, "si")
.replace(/tyi/g, "ti")
.replace(/fu/g, "hu")
.replace(/j/g, "zy")
.replace(/zyi/g, "zi")
.replace(/nn/g, "n")
}

return n
.replace(/uu/g, "u")
.replace(/ou/g, "o")
.replace(/oo/g, "o")
.replace(/ii/g, "i")

}

function showMessage(text){
document.getElementById("message").textContent = text
document.getElementById("resultCards").innerHTML = ""
document.getElementById("shareBtn").style.display = "none"
}

function convert(){

let input = document.getElementById("nameInput").value.trim()
let country = document.getElementById("country").value
let gender = document.getElementById("gender").value

if(input === ""){
showMessage("Please enter your name!")
return
}

if(/[^\u0000-ɏ\s'-]/.test(input)){
showMessage("Please type your name in English letters (e.g. Misaki).")
return
}

let list = nameData[country][gender]
let name = normalizeName(input, country)

let rank = list.findIndex(n =>
normalizeName(n.roman !== undefined ? n.roman : n, country) === name
)

if(rank === -1){
showMessage("Name not found! Your name might be rare and special!")
return
}

let html = '<div class="result-grid">'

for(let key in nameData){

if(key === country) continue

let converted = nameData[key][gender][rank]
if(converted === undefined) continue

let romanName = converted.roman !== undefined ? converted.roman : converted
let nativeName = converted.native !== undefined ? converted.native : converted
html +=
'<div class="result-card">' +
flags[key] + '<br>' +
countryNames[key] + '<br>' +
'<b>'+ romanName +'</b><br>' +
(romanName !== nativeName ? '<span>'+ nativeName +'</span>' : '') +
'</div>'

}

html += '</div>'

document.getElementById("message").textContent = ""
document.getElementById("resultCards").innerHTML = html
document.getElementById("shareBtn").style.display="inline-block"

}

document.getElementById("nameInput").addEventListener("keydown", e => {
if(e.key === "Enter") convert()
})

function shareResult(){

if(isSharing) return
isSharing = true

let target = document.getElementById("result")
let title = document.querySelector(".share-title")
let url = document.querySelector(".share-url")

title.style.display="block"
url.style.display="block"

function done(){
isSharing = false
title.style.display="none"
url.style.display="none"
}

html2canvas(target).then(canvas => {

canvas.toBlob(async function(blob){

try{

const file = new File([blob],"name-result.png",{type:"image/png"})
const shareData = { files:[file], text:"My name in other countries" }

if(navigator.canShare && navigator.canShare(shareData)){
await navigator.share(shareData)
}else{
let twitterUrl =
"https://twitter.com/intent/tweet?text=" +
encodeURIComponent("My name in other countries") +
"&url=" +
encodeURIComponent("https://mimimi-night.github.io/name-country/")
window.open(twitterUrl,"_blank")
}

}catch(err){
// user closed the share sheet, or sharing isn't allowed
}

done()

})

}).catch(done)

}
