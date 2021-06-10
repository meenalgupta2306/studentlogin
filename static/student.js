fetch('http://localhost:2000/add')
.then((apidata)=>{
    console.log(apidata)
    return apidata.json();
})
.then((actualdata) =>{
    console.log(actualdata)
    l=actualdata.length
    console.log("length",l)
    let table = document.querySelectorAll("table")[1];
    console.log(table)
    var link = document.createElement("a");
    link.setAttribute("href", "http://localhost:2000/student/add")
    link.className = "someCSSclass";
    var y=document.getElementById("modalTwo")
    var x= document.getElementById("modalOne");
    var i=0
    
    var linkText = document.createTextNode("Edit");
    link.appendChild(linkText);
    for(let element of actualdata)
    {
        i=i+1
        let row = table.insertRow();
        for (k in element) {
            if(k=="_id"){
                let cell = row.insertCell()
                let text=document.createTextNode(i)
                cell.appendChild(text)
            }  
            if( k=="name"||k=="age"||k=="school"||k=="class"||k=="division"||k=="status" ){
                let cell = row.insertCell()
                let text = document.createTextNode(element[k]);
                cell.appendChild(text);
            }
            if(k=="__v"){
                let cell = row.insertCell()
                cell.append("edit")
            }
        }
    }

    //search
    var search = document.getElementById('name');
    search.onkeyup = function(){
    // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("name");
        filter = input.value.toUpperCase();
        table = document.getElementById("studentTable");
        tr = table.getElementsByTagName("tr");
          
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 1; i < tr.length; i++) {
            na = tr[i].getElementsByTagName("td")[1];
            if(na) {
                txtValue = na.textContent || na.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "table-row";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }


        //append the edit link to lat column
        row=table.rows.length
        column=table.rows[1].cells.length
        for(i=1;i<=row;i++){
            table.rows[i].cells[column-1].innerHTML='<a href="http://localhost:2000/student/add" onClick="editTable();">Edit</a> <a href="#" onClick="deleteRow();">Delete</a>';  
        
        }

    
})
       
.catch((error)=> {
    console.log(error)
});