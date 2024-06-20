const dataArray =[];

function addNewCourse(cname){
    const ob ={cname : cname, isConfirmed: false};
    const el = document.createElement('div');
   // el.classList.add('course-container');
    const divo = document.createElement('span');
    divo.innerHTML = cname;

    var inputElement = document.getElementById('cname');
    //for an edit button
    var editt = document.createElement('button');
   
    editt.innerHTML = "EDIT";
    editt.classList.add('edit');
    editt.addEventListener("click", function() {
        var userInput = prompt("Please edit here");
        if (userInput !== null) {
        divo.innerHTML=userInput;
           
    }if(cname!=userInput){
       dataArray[userInput]= dataArray[cname];
         ob.cname=userInput;
         delete dataArray[cname];
      
    }
   

    console.log(dataArray);
});
//for delete button

    var dele = document.createElement('button');
   
    dele.innerHTML = "Delete";
    dele.classList.add('delete');
    dele.addEventListener("click", function() {
       el.remove();
       delete dataArray[cname];
       console.log(dataArray);
      
    });

   //for confirm button
    var con = document.createElement('button');
   
    con.innerHTML = "Confirm";
    con.classList.add('confirm');
    con.addEventListener("click", function() {
        dele.remove();
        editt.remove();
        con.remove();
       
     ob.isConfirmed=true;
     console.log( dataArray);

    });

    el.append(divo);
    el.append(editt);
    el.append(dele);
    el.append(con);
 
    document.getElementById('mm').append(el);

    inputElement.value = "";
    dataArray.push(ob);

      //dataArray[cname]=ob;
      

    console.log( dataArray);
   

}
function saveToDatabase() {
    for(let e in dataArray){
     console.log(dataArray[e].cname);
    }
    let manualJSON = {};

for (let key in dataArray) {
    let course = dataArray[key];
    manualJSON[course.cname] = {
        cname: course.cname,
        isConfirmed: course.isConfirmed
    };
}

console.log(JSON.stringify(manualJSON, null, 2));


    fetch('lab3.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: j(dataArray),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text(); // <-- Change to text() to see the response content
    })
    .then(data => {
        console.log('Response:', data); // <-- Log the response here
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function j(d){

let manualJSON = {};

for (let key in d) {
    let course = d[key];
    manualJSON[course.cname] = {
        cname: course.cname,
        isConfirmed: course.isConfirmed
    };
    
}
return JSON.stringify(manualJSON);
}
// function saveToDatabase() {
//     //console.log('Data Array:', dataArray);

//      fetch('lab3.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: jjsn(),
//     }
//     )
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error('Error:', error));
// }

// function jjsn(){
//     console.log(dataArray);
//     let jsonString='';

// for (let i = 0; i < dataArray.length; i++) {
//     const obj = dataArray[i];
//     jsonString += `{"cname":"${obj.cname}","isConfirmed":${obj.isConfirmed}}`;

//     // Add a comma if it's not the last element
//     if (i < dataArray.length - 1) {
//         jsonString += ',';
//     }
// }


// console.log(jsonString);
// return jsonString;
// }

// function jjsn() {
//     const jsonArray = dataArray.map(obj => ({
//         cname: obj.cname,
//         isConfirmed: obj.isConfirmed
//     }));

//     const jsonString = JSON.stringify(jsonArray);
//     console.log(jsonString);
//     return jsonString;
// }

// function jjsn() {
//     let jsonArray = {};

//     for (let i = 0; i < dataArray.length; i++) {
//         const obj = dataArray[i];
//         jsonArray.push({ "cname": obj.cname, "isConfirmed": obj.isConfirmed });
//     }

//     const jsonString = JSON.stringify(jsonArray);
//     console.log(jsonString);
//     return jsonString;
// }

