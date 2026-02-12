const token = prompt("Paste your login token");

async function loadChart(){

const res = await fetch("http://localhost:5000/api/dashboard/monthly",{
headers:{ "Authorization": token }
});

const data = await res.json();

new Chart(document.getElementById("chart"),{
type:"line",
data:{
labels:data.map(x=>x.week),
datasets:[{
label:"Expenses",
data:data.map(x=>x.total)
}]
}
});
}

loadChart();
