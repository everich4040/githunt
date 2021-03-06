const fetchUSers = async (user = `https://api.github.com/users/everich4040`) => {
  let response = await fetch(`https://api.github.com/users/${user}`);
  let data = await response.json();
  return data;
};

const $ = (element) => document.querySelector(element);

const searchUserBtn = $(".search-btn");
const userInput = $(".search-input");
const userAvatar = $(".user-avatar img");
const twitterUrl = $(".social-media a");
// const followers = $("");
const repos = $(".git-repos");
const gitUsername = $(".git-username")
const following = $(".follows")
const followers = $(".followers .user")
const followUser =$(".follow a")
const loader = $(".loader-container");
const userInfo = $(".user-details")


userInfo.style.display = "none"
searchUserBtn.addEventListener("click", () => {
  
  if(userInput.value == ""){
    alert("Input a user")
    return;
  }
    loader.style.display = "flex";
    followers.innerHTML = ""
  console.log(userInput.value);

  fetchUSers(userInput.value)
    .then((data) => {
      if(!data.id){
        userInfo.innerHTML = "<h1 style='text-align:center;'>USER NOT FOUND</h1>";
        console.log("user not found")
        userInput.value = "";
    }else{
      console.log(data);
    }
      if(data){
        loader.style.display = "none";
        userInput.value = "";
        userInfo.style.display = "grid"

      }
       
      if (data.twitter_username) {
        twitterUrl.href = `www.twitter.com/${data.twitter_username}`;
        twitterUrl.textContent = `@${data.twitter_username}`;
      }else{
        twitterUrl.href = ``;
        twitterUrl.textContent = ``;
      }
      userAvatar.src = data.avatar_url;
      repos.textContent = data.public_repos;
      gitUsername.textContent = data.login;
      gitUsername.href = data.url;
      following.textContent = data.following
      followUser.href = `https://www.github.com/${data.login}`;

      if(data.followers){
         fetchFollowers(data.login).then(data =>{
           data.forEach(user =>{
            let newData = `<div class="followers-details">
            <div class="followers-name">
            <p>${user.login}</p>
        </div>
               <div class="followers-avatar">
                   <img src=${user.avatar_url} alt="">
               </div>
             
            </div>`
            var text =  create(newData);
            followers.appendChild(text)
           })
         })
      }else{
          followers.innerHTML = "<h1 class='center'> No followers found";
      }
    })
    .catch((err) => {
      console.log("error " + err);
      loader.style.display = "none";
      userInfo.innerHTML = "<h1 style='text-align:center;'>AN ERROR OCCURED</h1>";
      userInput.value = "";
    });
});

async function fetchFollowers(user) {
    let response = await fetch(`https://api.github.com/users/${user}/followers`);
    let data = await response.json();
    return data;
  };


// followers following public_repos url
function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}