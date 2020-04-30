// document.getElementById("groupPassLabel").style.visibility = "hidden";
// document.getElementById("groupPass").style.visibility = "hidden";
// document.getElementById("labelLink").style.visibility = "hidden";
// document.getElementById("link").style.visibility = "hidden";
// document.getElementById("groupPassLabel2").style.visibility = "hidden";
// document.getElementById("groupPass2").style.visibility = "hidden";
document.getElementById("error").style.visibility = "hidden";
function isYoutube(getURL)
{
  if(typeof getURL!=='string') return false;
  var newA = document.createElement('A');
  newA.href = getURL;
  var host = newA.hostname;
  var srch = newA.search;
  var path = newA.pathname;
  
  if(host.search(/youtube\.com|youtu\.be/)===-1) return false;
  if(host.search(/youtu\.be/)!==-1) return path.slice(1);
  if(path.search(/embed/)!==-1) return /embed\/([A-z0-9]+)(\&|$)/.exec(path)[1];
  var getId = /v=([A-z0-9]+)(\&|$)/.exec(srch);
  if(host.search(/youtube\.com/)!==-1) return !getId ? '':getId[1];
  
}

function CheckPassword(inputtxt) 
{ 
  var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if(inputtxt.match(decimal)) 
  { 
    return true;
  }
  else
  { 
    return false;
  }
} 

// document.getElementById("create").addEventListener('click', function() {
//   document.getElementById("groupPassLabel").style.visibility = "visible";
// document.getElementById("groupPass").style.visibility = "visible";
// document.getElementById("labelLink").style.visibility = "visible";
// document.getElementById("link").style.visibility = "visible";
let linksList = [];
document.getElementById("another").addEventListener('click', function(){
  let newLink = String(document.getElementById("link").value);
  if (isYoutube(newLink) !== false && isYoutube(link) !== ""){
    document.getElementById("error").style.visibility = "hidden";
    linksList.push(String(document.getElementById("link").value));
    document.getElementById("link").value = "";
  }
  else{
    document.getElementById("error").style.visibility = "visible";
  }
  
});
document.getElementById("submit1").addEventListener('click', async function()  {
  let lastLink = String(document.getElementById("link").value);
  if (isYoutube(lastLink) !== false && isYoutube(lastLink) !== ""){
    linksList.push(String(document.getElementById("link").value));
    let pass = String(document.getElementById("groupPass").value);
    if(CheckPassword(pass)){
      let idsList = [];
      for (const link of linksList){
        idsList.push(isYoutube(link));
      }
      console.log(idsList);
      db.collection("groups").add({
            videoIds: idsList,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          groupPass: pass
        }).then(function(docRef) {
          localStorage.setItem("idsList", JSON.stringify(idsList));
          localStorage.setItem("idsList2", JSON.stringify([""]));
          console.log(docRef.id);
          console.log(typeof docRef.id);
          localStorage.setItem("groupID", docRef.id);
          window.location.href = './video.html';
      });
    }
    else{
      alert("password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.");
    }
  }
    else{
    document.getElementById("error").style.visibility = "visible";
  }
});
// });

// document.getElementById("join").addEventListener('click', function() {
//   document.getElementById("groupPassLabel2").style.visibility = "visible";
// document.getElementById("groupPass2").style.visibility = "visible";
document.getElementById("submit2").addEventListener('click', function() {
  let pass2 = String(document.getElementById("groupPass2").value);
  let promise2 = new Promise((resolve, reject) => {
  db.collection('groups').where('groupPass', '==', pass2).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists){

         resolve(doc.data().videoIds);
        }
        else{
          console.log("uh oh");
          reject("It appears that there does not exist a group with the password you inputted. Try again!");
        }
      });
  });
});
  promise2.then((success) => {
    let idsList2 = success;
    localStorage.setItem("idsList2", JSON.stringify(idsList2));
    localStorage.setItem("idsList", JSON.stringify([""]));
    console.log(idsList2);
  });
  promise2.catch((error) => {
          console.log(error);
      });

  let promise3 = new Promise((resolve, reject) => {
  db.collection('groups').where('groupPass', '==', pass2).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists){
          resolve(doc.id);
        }
        else{
          console.log("uh oh");
          reject("It appears that there does not exist a group with the password you inputted. Try again!");
        }
      });
  });
});
  promise3.then((success) => {
    let groupID2 = success;
    console.log(groupID2);
    console.log(typeof groupID2);
    localStorage.setItem("groupID2", groupID2);
    window.location.href = './video.html';
  });
  promise3.catch((error) => {
          console.log(error);
      });

});
// });
