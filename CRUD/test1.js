// let idElement = document.getElementById('id1')
// console.log(idElement)
// let classElement = document.getElementsByClassName('child1')
// console.log(classElement)
// let tageElement = document.getElementsByTagName('div')
// console.log(tageElement)
// let allElements = document.querySelectorAll('div')
// console.log(allElements)
// let anyElement = document.querySelector('div')
// console.log(anyElement)
// // console.log("hi")
// tageElement.innerHtml = "<strong>modified inner html</strong>"
// console.log(tageElement)

// // let body = document.getElementsByTagName("body")
// let body = document.querySelector("body");

// let ul = document.createElement("ul");

// let li1 = document.createElement("li");
// let li2 = document.createElement("li");
// let li3 = document.createElement("li");
// let li4 = document.createElement("li");

// li1.textContent = "football";
// li2.textContent = "hockey";
// li3.textContent = "basketball";
// li4.textContent = "tabletennis";


// ul.appendChild(li1)
// ul.appendChild(li2)
// ul.appendChild(li3)
// ul.appendChild(li4)
// body.appendChild(ul)

// // let button1 = document.getElementById("btn")
// // button1.addEventListener(onclick,
// //     alert("hii")
// // )


// let button1 = document.getElementById("btn")

//   button1.addEventListener("copy", function() {
//     alert("Hello World!");
//   });
//   button1.addEventListener("mouseleave", function() {
//     alert("Hello World!");
//   });
//   button1.addEventListener("click", function (){ console.log("2+2=4") }) 
// //   function clickMe(){

// //   }
// window.addEventListener('scroll',function(){
//     console.log("scrolling")
// })

// // window.addEventListener("mouseleave",function({
// //     console.log("mouseleft")
// // }))

// // document.removeChild("child1")
// button1.addEventListener("click", function(event) {
//   // alert("Hello World!");

// event.preventDefault()
// let inputElement = document.getElementById("inp")
// console.log(inputElement)

// let inputValue = inputElement.value;
// console.log(inputValue)
// let liE = document.createElement("li")
// liE.textContent = inputValue;
// console.log(liE.textContent)
// let ulE = document.getElementsByTagName('ul')[0];
//  ulE.appendChild(liE);
//  console.log(inputValue)
// });


// Fetch data from the API

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(data => {
    
//     console.log(data);
   
//     const ul = document.createElement('ul');
//     document.body.appendChild(ul);
//     data.forEach(post => {
      
//       const li = document.createElement('li');
//       const strong = document.createElement('strong');
      
//       const span = document.createElement('div');
//       li.textContent = post.id + `.  `;
//       strong.textContent = post.title;
//       span.textContent = post.body
//       ul.appendChild(li);
//       li.appendChild(strong);
  
//       li.appendChild(span);
    
//    } 
//    );
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });


  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data =>
    { console.log(data)
    })

     
fetch('https://jsonplaceholder.typicode.com/posts', {
method: 'POST',
body: JSON.stringify({
  title: 'foo',
  body: 'bar',
  userId: 1,
  id:10
}),
headers: {
  'Content-type': 'application/json; charset=UTF-8',
},
})
.then(response => response.json())
.then(data => {
  console.log('POST request successful:', data);
})
.catch(error => {
  console.error('Error making POST request:', error);
});
    // Fetch data from the API and display in table format
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(data => {
  console.log(data);

  // Create a table
  const table = document.createElement('table');
  document.body.appendChild(table);

  // Create table header
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const headers = ['ID', 'Title', 'Body'];
  headers.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  const tbody = document.createElement('tbody');
  data.forEach(post => {
    const row = document.createElement('tr');
    const idCell = document.createElement('td');
    idCell.textContent = post.id;
    const titleCell = document.createElement('td');
    titleCell.textContent = post.title;
    const bodyCell = document.createElement('td');
    bodyCell.textContent = post.body;
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(bodyCell);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);
})
.catch(error => {
  console.error('Error fetching data:', error);
});

// Example of making a POST request

// Function to fetch and display posts in table format
// function fetchAndDisplayPosts() {
//   fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);

      
//       const table = document.createElement('table');
//       document.body.appendChild(table);

   
//       const thead = document.createElement('thead');
//       const headerRow = document.createElement('tr');
//       const headers = ['ID', 'Title', 'Body'];
//       headers.forEach(headerText => {
//         const th = document.createElement('th');
//         th.textContent = headerText;
//         headerRow.appendChild(th);
//       });
//       thead.appendChild(headerRow);
//       table.appendChild(thead);

     
//       const tbody = document.createElement('tbody');
//       data.forEach(post => {
//         const row = document.createElement('tr');
//         const idCell = document.createElement('td');
//         idCell.textContent = post.id;
//         const titleCell = document.createElement('td');
//         titleCell.textContent = post.title;
//         const bodyCell = document.createElement('td');
//         bodyCell.textContent = post.body;
//         row.appendChild(idCell);
//         row.appendChild(titleCell);
//         row.appendChild(bodyCell);
//         tbody.appendChild(row);
//       });
//       table.appendChild(tbody);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }


// fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//     title: 'foo',
//     body: 'bar',
//     userId: 1
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log('POST request successful:', data);
    
//     fetchAndDisplayPosts();
//   })
//   .catch(error => {
//     console.error('Error making POST request:', error);
//   });


// fetchAndDisplayPosts();

