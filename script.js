const japan = [
"haruto",
"yuto",
"sota",
"yuki",
"hayato"
]

const usa = [
"liam",
"noah",
"oliver",
"elijah",
"james"
]

const korea = [
"minjun",
"seojun",
"jiho",
"yujun",
"junseo"
]

const flags = {
japan:"🇯🇵",
usa:"🇺🇸",
korea:"🇰🇷"
}

function convert(){

let name = document.getElementById("nameInput").value.toLowerCase()

let rank = japan.indexOf(name)

if(rank === -1){
document.getElementById("result").innerText =
"Name not found! Your name might be rare and special!"
return
}

let usName = usa[rank]
let krName = korea[rank]
  
document.getElementById("flag").innerHTML =
flags.usa + " " + flags.korea
  
document.getElementById("result").innerHTML =
"USA name: " + usName +
"<br>Korea name: " + krName
}
