// Dom Selectors
let profileImg = document.querySelector(".username");
let repo = document.querySelector(".repo");
const ul = document.querySelector(".repo-item");
let navToggle = document.querySelector(".nav_toggle");
let navWrapper = document.querySelector(".nav_wrapper");


// Nav Button toggler
navToggle.addEventListener("click", function() {
  if(navWrapper.classList.contains("activeItem")) {
    this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-label", "menu");
    navWrapper.classList.remove("activeItem");
  } else {
    navWrapper.classList.add("activeItem");
    this.setAttribute("aria-label", "close menu");
    this.setAttribute("aria-expanded", "true");
  }
});




function createNode(element) {
  return document.createElement(element);
};
function append(parent, el) {
  return parent.appendChild(el);
};


// grapql endpoint
const base_url = `https://cors-anywhere.herokuapp.com/https://api.github.com/graphql`;
// token
const accessToken = ` e2deb74ee871a645cac1394cf1436832dc2728b8`;
// query
const query = `query {
  rateLimit {
    limit
    cost
    remaining
    resetAt
      }
  repositoryOwner(login: "kuicpet") {
    ... on User {
      name
      login
      avatarUrl
      bio
      following {
        totalCount
      }
      followers {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      repositories(last: 20) {
        edges {
          node {
            name,
            url,
            description,
            licenseInfo {
              name
            }
            stargazers {
              totalCount
            }
            primaryLanguage {
              name
            }
            updatedAt
          }
        }
      }
    }
  }
  }

`
 
// get the github data
const getData = () => {
 fetch(`${base_url}`, {
     method: "POST",
     headers: {
      Authorization: `bearer ${accessToken}`,
       'Content-Type' : "application/json"},
     body:JSON.stringify({query})
 })
 .then(response => {
   console.log("Response", response)
   return response.json()
 })
 .then(result => {
   console.log(result.data);
   const repos = result.data.repositoryOwner.repositories.edges;
   console.log("Repos", repos);
   repos.flatMap((item) => {
     console.log(item.node);
     const liMarkUp =`
      <li class="repo-item-no">
         <span class="repo-heading">
           <h3>
             <a class="repo-link">
               ${item.node.name}
             </a>
           </h3>
           <button class="repo-star">
             <svg class="octicon octicon-star" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
             Star
           </button>
         </span>
         <div>
             <p class="description">${item.node.description}</p>
         </div>
         <div class="repo-item-time">
           <span>
             <div class="lang-color"></div>
           </span>
           <span class="mr-1">${item.node.primaryLanguage}</span>
           <span class="license">
               <svg class="octicon octicon-law" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8.75.75a.75.75 0 00-1.5 0V2h-.984c-.305 0-.604.08-.869.23l-1.288.737A.25.25 0 013.984 3H1.75a.75.75 0 000 1.5h.428L.066 9.192a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.514 3.514 0 00.686.45A4.492 4.492 0 003 11c.88 0 1.556-.22 2.023-.454a3.515 3.515 0 00.686-.45l.045-.04.016-.015.006-.006.002-.002.001-.002L5.25 9.5l.53.53a.75.75 0 00.154-.838L3.822 4.5h.162c.305 0 .604-.08.869-.23l1.289-.737a.25.25 0 01.124-.033h.984V13h-2.5a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-2.5V3.5h.984a.25.25 0 01.124.033l1.29.736c.264.152.563.231.868.231h.162l-2.112 4.692a.75.75 0 00.154.838l.53-.53-.53.53v.001l.002.002.002.002.006.006.016.015.045.04a3.517 3.517 0 00.686.45A4.492 4.492 0 0013 11c.88 0 1.556-.22 2.023-.454a3.512 3.512 0 00.686-.45l.045-.04.01-.01.006-.005.006-.006.002-.002.001-.002-.529-.531.53.53a.75.75 0 00.154-.838L13.823 4.5h.427a.75.75 0 000-1.5h-2.234a.25.25 0 01-.124-.033l-1.29-.736A1.75 1.75 0 009.735 2H8.75V.75zM1.695 9.227c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L3 6.327l-1.305 2.9zm10 0c.285.135.718.273 1.305.273s1.02-.138 1.305-.273L13 6.327l-1.305 2.9z"></path></svg>
               ${item.node.licenseInfo}
           </span>
           <span class="mr-1">Updated</span>
           <time>${item.node.updatedAt}</time>
         </div>
      </li>`
     let li = createNode("li");
     li.innerHTML = liMarkUp;
     append(ul, li);     
   });
 
   const { name, login, bio, avatarUrl } = result.data.repositoryOwner;
   const image = document.createElement("a");
   const n = document.createElement("h1");
   const p = document.createElement("p");
  
   image.classList.add("profile-img");
   p.classList.add("user-profile-bio");
  
   
  
   
   const imgMarkUp = `
   <img 
   class="avatar avatar-user width-full"
   src=${avatarUrl} width="260" height="260" />
   `
   image.innerHTML = imgMarkUp;
   profileImg.append(image);

   const nameMarkUp = `
   <span class="fullname">${name}</span>
   <span class="nickname">${login}</span>`
   n.innerHTML = nameMarkUp;
   profileImg.append(n);
   p.innerHTML = `${bio}`;
   profileImg.append(p);
   
   localStorage.setItem("githubData", JSON.stringify(result))
 })
 .catch(error => console.log(error));
}

//getData();

// load Data
const loadData = () => {
  const loadedData = JSON.parse(localStorage.getItem("githubData"));
  const arr = loadedData.data.repositoryOwner.repositories.edges;
  
  console.log("Arr",arr);
  arr.flatMap((item) => {
    console.log(item.node)
  })

}
  
document.addEventListener("DOMContentLoaded", function() {
  loadData();
})

