let text = document.getElementById("inputText");
let list = document.getElementById("attempts");
let error = document.getElementById("error");
let form = document.getElementById("form");

let palindromeChecker = (text) => {
  text = text.toLowerCase();
  text = text.replace(/\W/g, "");
  let i = 0;
  let j = text.length - 1;
  while (i < j) {
    if (text.charAt(i) != text.charAt(j)) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (text.value.trim()) {
      if (palindromeChecker(text.value.trim())) {
        let newItem = document.createElement("li");
        newItem.innerHTML = text.value;
        newItem.classList.add("is-palindrome");
        error.hidden = true;
        list.appendChild(newItem);
        form.reset();
        text.focus();
      } else {
        let newItem = document.createElement("li");
        newItem.innerHTML = text.value;
        newItem.classList.add("not-palindrome");
        error.hidden = true;
        list.appendChild(newItem);
        form.reset();
        text.focus();
      }
    } else {
      text.value = "";
      error.hidden = false;
      text.focus();
    }
  });
}
