const dataArray = {};

function addNewCourse(cname) {
    const ob = { cname: cname, isConfirmed: false };
    const el = document.createElement('div');
    const divo = document.createElement('span');
    divo.innerHTML = cname;

    // Create edit button
    const editBtn = document.createElement('button');
    editBtn.innerHTML = "EDIT";
    editBtn.classList.add('edit');
    editBtn.addEventListener("click", function () {
        const userInput = prompt("Please enter the new course name:");
        if (userInput !== null && userInput.trim() !== '') {
            // Update displayed course name
            divo.innerHTML = userInput;

            // في تعديل هون
            const index = dataArray.findIndex(item => item.cname === cname);
            if (index !== -1) {
                dataArray[index].cname = userInput;
            }
           
        }
    });

    // // Create delete button هون كمان في تعديل 
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "Delete";
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener("click", function () {
        el.remove(); // Remove the course element from the DOM

        // Remove the corresponding item from dataArray
        const index = dataArray.findIndex(item => item.cname === cname);
        if (index !== -1) {
            dataArray.splice(index, 1);
        }
    });


    // Create confirm button
    const confirmBtn = document.createElement('button');
    confirmBtn.innerHTML = "Confirm";
    confirmBtn.classList.add('confirm');
    confirmBtn.addEventListener("click", function () {
        // Update isConfirmed property in dataArray
        const index = dataArray.findIndex(item => item.cname === cname);
        if (index !== -1) {
            dataArray[index].isConfirmed = true;
        }

        // Remove buttons after confirmation
        editBtn.remove();
        deleteBtn.remove();
        confirmBtn.remove();
    });

    // Append elements to the course container
    el.appendChild(divo);
    el.appendChild(editBtn);
    el.appendChild(deleteBtn);
    el.appendChild(confirmBtn);

    // Append course container to the main container
    document.getElementById('mm').appendChild(el);

    // Add course object to dataArray
  //  dataArray.push(ob);
  dataArray[cname] = ob;
    console.log(dataArray);

}
// function saveToDatabase() {
//     // Prepare data for sending to the server
//     const dataToSend = dataArray.map(course => ({
//         cname: course.cname,
//         isConfirmed: course.isConfirmed ? 1 : 0
//     }));

//     console.log('Data to send:', dataToSend);

//     // Example fetch request to save data to server
//     fetch('lab3.php', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dataToSend),
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.text(); // Change to response.json() if expecting JSON response
//     })
//     .then(data => {
//         console.log('Response:', data);
//         // Handle successful response from server
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         // Handle error
//     });
// }


function saveToDatabase() {
    //console.log('Data Array:', dataArray);

     fetch('lab3.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jjsn(),
    }
    )
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

function jjsn(){
    console.log(dataArray);
    let jsonString='';

for (let i = 0; i < dataArray.length; i++) {
    const obj = dataArray[i];
    jsonString += `{"cname":"${obj.cname}","isConfirmed":${obj.isConfirmed}}`;

    // Add a comma if it's not the last element
    if (i < dataArray.length - 1) {
        jsonString += ',';
    }
}


console.log(jsonString);
return jsonString;
}

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
//     let jsonArray = [];

//     for (let i = 0; i < dataArray.length; i++) {
//         const obj = dataArray[i];
//         jsonArray.push({ "cname": obj.cname, "isConfirmed": obj.isConfirmed });
//     }

//     const jsonString = JSON.stringify(jsonArray);
//     console.log(jsonString);
//     return jsonString;
// }


function deleteCourseFromDatabase(cname) {
    const dataToSend = [cname]; // Course name to delete

    // Send data to backend (lab3.php) using fetch API
    fetch('lab4.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response JSON
    })
    .then(data => {
        console.log('Deletion response:', data);
        // Handle successful deletion response from server
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle error
    });
}
