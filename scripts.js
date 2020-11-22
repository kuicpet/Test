// Dom Selectors
const profile = document.querySelector(".username");
const repo = document.querySelector(".repo");
const ul = document.querySelector(".repo-item");
const navToggle = document.querySelector(".nav_toggle");
const navWrapper = document.querySelector(".nav_wrapper");
const stickyNav = document.querySelector(".sticky");


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

// Stiky Nav
window.onscroll = function() {getSticky()};

let sticky = stickyNav.offsetTop;

function getSticky() {
  if (window.pageYOffset >= sticky) {
    stickyNav.classList.add("sticky_nav")
  } else {
    stickyNav.classList.remove("sticky_nav");
  }
}

// Create Element
function createNode(element) {
  return document.createElement(element);
};
function append(parent, el) {
  return parent.appendChild(el);
};


// grapql endpoint
const base_url = `https://cors-anywhere.herokuapp.com/https://api.github.com/graphql`;
// token
const accessToken = `9b1b7466b271b04a47d6969873606888291a9314`;
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
      twitterUsername
      following {
        totalCount
      }
      followers {
        totalCount
      }
      starredRepositories {
        totalCount
      }
      repositories(first: 20) {
        edges {
          node {
            name,
            url,
            description,
            licenseInfo {
              name
            }
            stargazerCount
            stargazers {
              totalCount
            }
            primaryLanguage {
              name,
              color
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
const getData = async () => {
  await fetch(
    `${base_url}`,
    {
      method: "POST",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({query})
    }
  ).then(response => {
    console.log("Response", response);
    return response.json();
  }).then(result => {
    console.log(result.data);
    const repos = result.data.repositoryOwner.repositories.edges;
    console.log("Repos", repos);
    // Save data in localStorage
    localStorage.setItem("githubData", JSON.stringify(result));
  })
}

getData();