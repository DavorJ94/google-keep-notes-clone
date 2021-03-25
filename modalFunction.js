import IdGenerator from "./idGenerator.js";

const modal = document.getElementById("myModal");
const titleInput = document.querySelector(".titleInputModal");
const textInput = document.querySelector(".noteInputModal");

export default function modalFunction(id) {
  modal.style.display = "block";
  titleInput.value = "";
  textInput.value = "";
  modal.setAttribute("data-currentNote", `${id}`);
  const clickedNoteTitle = document.querySelector(`#title-${id}`).innerText;
  const clickedNoteText = document.querySelector(`#text-${id}`).innerText;
  if (clickedNoteTitle !== "(no title)") titleInput.value = clickedNoteTitle;
  if (clickedNoteText !== "(no description)") textInput.value = clickedNoteText;
}

export function saveToLocalStorageModal(e) {
  e.preventDefault();
  const currentId = document
    .querySelector("#myModal")
    .getAttribute("data-currentNote");
  if (!titleInput.value && !textInput.value)
    return alert("Fill out title or text form.");
  const localStorageItem = JSON.parse(localStorage.getItem(currentId));
  const id = IdGenerator(localStorageItem);
  localStorage.setItem(
    id,
    JSON.stringify({
      ...localStorageItem,
      titleInput: titleInput.value,
      noteInput: textInput.value,
    })
  );
  const clickedNoteTitle = document.querySelector(`#title-${currentId}`);
  const clickedNoteText = document.querySelector(`#text-${currentId}`);
  if (titleInput.value) {
    clickedNoteTitle.innerText = titleInput.value;
    clickedNoteTitle.style.fontSize = "";
    clickedNoteTitle.style.fontStyle = "";
  } else {
    clickedNoteTitle.innerText = "(no title)";
    clickedNoteTitle.style.fontSize = "10px";
    clickedNoteTitle.style.fontStyle = "italic";
  }

  if (textInput.value) {
    clickedNoteText.innerText = textInput.value;
    clickedNoteText.style.fontSize = "";
    clickedNoteText.style.fontStyle = "";
  } else {
    clickedNoteText.innerText = "(no description)";
    clickedNoteText.style.fontSize = "10px";
    clickedNoteText.style.fontStyle = "italic";
  }

  titleInput.value = "";
  textInput.value = "";
  modal.style.display = "none";
}
