const imagePakerElement = document.querySelector("#image-uploud-control input");
const imagePreviwElement = document.querySelector("#image-uploud-control img");

function updateImagePreview() {
  const file = imagePakerElement.files;
  console.log("file",file)
  if (!file || file.lenght == 0) {
    imagePakerElement.style.display = "none";
    return;
  }
  const pakedFile = file[0];
  console.log(pakedFile)
  imagePreviwElement.src = URL.createObjectURL(pakedFile);

  imagePreviwElement.style.display = "block";
}

imagePakerElement.addEventListener("change", updateImagePreview);
