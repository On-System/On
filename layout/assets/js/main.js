function myFunction() {
    var node = document.createElement("LI");
    var textnode = document.createTextNode("Hi,Good evening");
    node.appendChild(textnode);
    node.classList.add("list-group-item");
    document.getElementById("chat").appendChild(node);
  }

  function my(){
    var node = document.createElement("LI");
    var textnode = document.createTextNode("Hi,Good night");
    node.appendChild(textnode);
    node.classList.add("list-group-item");
    document.getElementById("atendee").appendChild(node);
  }