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

function shareImage(){

let target = document.getElementById("result")

html2canvas(target).then(canvas => {

let link = document.createElement("a")

link.download = "name-result.png"

link.href = canvas.toDataURL()

link.click()

})

}
