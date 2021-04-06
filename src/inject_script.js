url = window.location.href

chrome.runtime.sendMessage({greeting: url}, function(response) {
});

var test = fetch('http://prod.narval-security.com:6001/parse', {
     method: 'post',
     body: JSON.stringify(url)
   }).then(function(response) {
    console.log(response)   // affiche le contenu de la requête envoyé par le serveur
     return response.json();
   }).then(function(data) {
      console.log(data)
      chrome.storage.local.set({"rate": data},function (){
      });
      console.log("rate update")
      chrome.runtime.sendMessage({greeting: "refresh"});
      if (data >= 75) {
        chrome.runtime.sendMessage({greeting: "popup"})
      }
      return (data)
   })