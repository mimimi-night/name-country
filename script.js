const japan = [
"Haruto",
"Yuto",
"Sota",
"Yuki",
"Hayato"
]

const usa = [
"Liam",
"Noah",
"Oliver",
"Elijah",
"James"
]

const korea = [
"Minjun",
"Seojun",
"Jiho",
"Yujun",
"Junseo"
]

function convert(){

let name = document.getElementById("nameInput").value

let rank = japan.indexOf(name)

if(rank === -1){
document.getElementById("result").innerText =
"name not found"
return
}

let usName = usa[rank]
let krName = korea[rank]

document.getElementById("result").innerHTML =
"USA name: " + usName +
"<br>Korea name: " + krName
}
