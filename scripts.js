// grapql endpoint
const base_url = `https://cors-anywhere.herokuapp.com/https://api.github.com/graphql`;
// token
const accessToken = `80fef99add341acc6d138f8c30f105e28cd85477`;
// query
const query = `query {
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
      repositories(first: 20) {
        edges {
          node {
            name,
            url,
            description,
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
 .then(response => response.json())
 .then(data => console.log(data))
 .catch(error => console.log(error));
}

getData();


