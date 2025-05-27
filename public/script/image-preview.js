const imagePakerElement = document.querySelector("#image-uploud-control input");
const imagePreviwElement = document.querySelector("#image-uploud-control img");

function updateImagePreview() {
  const file = imagePakerElement.file;
  if (!file || file.lenght == 0) {
    imagePakerElement.style.display = "none";
    return;
  }
  const pakedFile = file[0];
  imagePreviwElement.src = URL.createObjectURL(pakedFile);

  imagePakerElement.style.display = "block";
}

imagePakerElement.addEventListener("change", updateImagePreview);
