
/* let btn = document.getElementById("view");
      btn.onclick = function(e) {
        var y=document.getElementById("modalTwo")
        var x= document.getElementById("modalOne");
          x.style.display = "block";
          y.style.display = "none";
        
      }
let btn1 = document.getElementById("add");
      btn1.onclick = function(e) {
        var y=document.getElementById("modalTwo")
        var x= document.getElementById("modalOne");
          y.style.display="block";
          x.style.display = "none";
      } */


var table=document.getElementById("myTable")
for(i=0;i<=20;i++){
    var row=table.insertRow();
    var cell=row.insertCell();
    cell.style.padding="11px 2px";
}