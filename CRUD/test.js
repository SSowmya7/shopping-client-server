let url = "https://dummy-a521a-default-rtdb.firebaseio.com/data.json";

var tableElement = document.querySelector("#table-posts");

document.addEventListener("DOMContentLoaded", () => {
  fetchposts();
});

function fetchposts() {
  const postsurl = "https://dummy-a521a-default-rtdb.firebaseio.com/data.json";
  const headers = new Headers();
  tableElement.innerHTML = "";
  fetch(postsurl, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      // console.log('response',data);
      let tableRows = "";
      for (let key in data) {
        const item = data[key];
        // console.log(`ID: ${key}, Title: ${item.title}, Body: ${item.body}`);

        tableRows += `<tr>
          <td>${key}</td>
          
          <td><img src="${item.image}" alt="Image"></td>
          <td>${item.price}</td>
          <td>${item.title}</td>
          <td>${item.body}</td>
          <td>
          <div><button class="updatePost" >update</button>
         <button class="deletePost">delete</button></div>
          </td>
          </tr>
          `;
      }
      tableElement.innerHTML = tableRows;
    });
}

const AddpostButton = document.getElementById("addPost");
const addModal = document.getElementById("add-post");
const modalButton = document.getElementById("add-Post")
AddpostButton.addEventListener("click", () => {
  addModal.style.display = "block";
});
modalButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const image = document.getElementById("image").value;
  const price = document.getElementById("price").value;
  const headers = new Headers();
 
  let postData = {
    title: title,
    body: body,
    image: image,
    price: price,
   
  };

  fetch(url, {
    method: "POST",
    
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(postData),
  })
    .then(() => {
      fetchposts();
      addModal.style.display = "none";
      document.getElementById("add-post").reset(); // Reset the form
    })
    .catch((error) => {
      console.error("Error adding post:", error);
    });
  console.log(postData);
});



tableElement.addEventListener("click", (e) => {
  let target = e.target;
  console.log(target);
  if (target.classList.contains("deletePost")) {
    let postId =
      target.parentElement.parentElement.parentElement.firstElementChild
        .textContent;
    console.log(postId);
    fetch(
      `https://dummy-a521a-default-rtdb.firebaseio.com/data/${postId}.json`,
      {
        method: "delete",
      }
    ).then((response) => {
      console.log(response);
      fetchposts();
    });
  }
});

let selectedPostId;


document.addEventListener("DOMContentLoaded", () => {
  fetchposts();

  
  document.getElementById("postUpdate").addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById("title-update").value;
    const body = document.getElementById("body-update").value;
    const image = document.getElementById("image-update").value;
    const price = document.getElementById("price-update").value;

    fetch(
      `https://dummy-a521a-default-rtdb.firebaseio.com/data/${selectedPostId}.json`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          id: parseInt(selectedPostId),
          title: title,
          body: body,
          image: image,
          price: price,
          
        }),
      }
    )
      .then(() => {
        fetchposts();
        document.getElementById("update-post").style.display = "none";
        // e.target.reset();
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  });
});

tableElement.addEventListener("click", (e) => {
  let target = e.target;
  let postId = target.closest("tr").querySelector("td:first-child").textContent;

  if (target.classList.contains("updatePost")) {
    selectedPostId = postId;
    fetch(`https://dummy-a521a-default-rtdb.firebaseio.com/data/${postId}.json`)
      .then((response) => response.json())
      .then((post) => {
        document.getElementById("title-update").value = post.title;
        document.getElementById("body-update").value = post.body;

        document.getElementById("price-update").value = post.price;
        document.getElementById("image-update").value = post.image;
        document.getElementById("update-post").style.display = "block";
        
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }
});
const cancelAddButton = document.getElementById("cancelAdd");
const cancelUpdateButton = document.getElementById("cancelUpdate");

cancelAddButton.addEventListener("click", () => {
   addModal.style.display = "none";
 
});

cancelUpdateButton.addEventListener("click", () => {
  document.getElementById("update-post").style.display = "none";
});




