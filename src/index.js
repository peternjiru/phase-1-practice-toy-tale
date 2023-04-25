let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Fetch Andy's Toys

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((data) => {

    let collection = document.getElementById("toy-collection")

    for (let eachToy of data) {
      collection.innerHTML += `

      <div class="card">
      <h2>${eachToy.name}</h2>
      <img src="${eachToy.image}" class="toy-avatar"/>
      <p>${eachToy.likes}</p>
      <button class="like-btn" id="${eachToy.id}">Like ❤️</button>
      </div>
      
      `;
    }


  })


document.querySelector("form").addEventListener("submit", (e) => {

  e.preventDefault();

  const toyObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: e.target.likes = 0,
    }),
  };


  fetch("http://localhost:3000/toys", toyObject)
    .then((response) => response.json())
    .then((data) => {

      let collection = document.getElementById("toy-collection")

      collection.innerHTML += `

      <div class="card">
      <h2>${e.target.name.value}</h2>
      <img src="${e.target.image.value}" class="toy-avatar"/>
      <p>0</p>
      <button class="like-btn" id="${e.target.id.value}">Like ❤️</button>
      </div>
      
      `;

    })

    .catch((error) => {

      // console.log(error)

    })

})


// // Increase a Toy's Likes


// fetch("http://localhost:3000/toys")
//   .then((response) => response.json())
//   .then((data) => {

//     let buttonCollection = document.querySelectorAll("button")

//     for (let element of buttonCollection) {

//       element.addEventListener("click", () => {

//         let currentLikeCount = element.previousElementSibling.textContent

//         //increase count
//         currentLikeCount = parseInt(currentLikeCount) + 1;

//         const toyObject = {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//           },
//           body: JSON.stringify({
//             likes: currentLikeCount
//           }),
//         };


//         fetch(`http://localhost:3000/toys/${element.id}`, toyObject)
//           .then((response) => response.json())
//           .then((data) => {

//             // console.log(element.id)
//             // console.log(currentLikeCount)

//             let likeContainer = element.previousElementSibling
//             likeContainer.textContent = currentLikeCount

//           })

//           .catch((error) => {

//             // console.log(error)

//           })


//       })
//     }


//   })

// Increase Likes (why does this work fine without need to refresh page?)

fetch("http://localhost:3000/toys")
  .then((response) => response.json())
  .then((data) => {

    let container = document.getElementById("toy-collection");

    for (let eachToy of data) {
      container.innerHTML += `
        <div class="card">
          <h2>${eachToy.name}</h2>
          <img src="${eachToy.image}" class="toy-avatar"/>
          <p>${eachToy.likes}</p>
          <button class="like-btn" id="${eachToy.id}">Like ❤️</button>
        </div>
      `;
    }

    container.addEventListener("click", (event) => {
      if (event.target.classList.contains("like-btn")) {
        let currentLikeCount = parseInt(event.target.previousElementSibling.textContent);
        currentLikeCount++;
        event.target.previousElementSibling.textContent = currentLikeCount;

        const toyObject = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            likes: currentLikeCount,
          }),
        };

        fetch(`http://localhost:3000/toys/${event.target.id}`, toyObject)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });

  });