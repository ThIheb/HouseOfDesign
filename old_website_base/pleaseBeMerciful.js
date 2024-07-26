function Fu() {
    document.getElementById("demo").innerHTML = "Bitch";
  }

  var transformed = false;

  function toggleTransform() {
    var textElement = document.getElementById("text");
    var words = textElement.textContent.split(" ");
    var newText = "";
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      if (word.length > 3) {
        if (transformed) {
          // Toggle back to plain text
          newText += word;
        } else {
          // Apply transformation
          newText += "<span class='bold'>" + word.substr(0, 3) + "</span>" + word.substr(3);
        }
      } else {
        newText += word;
      }
      newText += " ";
    }
    textElement.innerHTML = newText;
    transformed = !transformed; // Toggle state
  }
  