const fileInput = document.querySelector(".file-input"),
  filterOptions = document.querySelectorAll(".filter button"),
  filterName = document.querySelector(".filter-info .name"),
  filterValue = document.querySelector(".filter-info .value"),
  filterSlider = document.querySelector(".slider input"),
  rotateOptions = document.querySelectorAll(".rotate button"),
  previewImg = document.querySelector(".preview-img img"),
  resetFilterBtn = document.querySelector(".reset-filter"),
  chooseImgBtn = document.querySelector(".choose-img"),
  saveImgBtn = document.querySelector(".save-img");
let brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
let rotate = 0;
let h = 1,
  v = 1;
let showres = () => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${h},${v}) `;

  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}


let accept = () => {
  let file = fileInput.files[0];
  if (!file) return
  previewImg.src = URL.createObjectURL(file);

  previewImg.addEventListener("load", () => {
    document.querySelector(".container").classList.remove('disable');
  })



}
filterOptions.forEach((op) => {
  op.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active")
    op.classList.add("active");
    filterName.innerText = op.innerText;

    if (op.id === "brightness") {
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`
      console.log(brightness)

    }
    else if (op.id === "saturation") {
      filterSlider.value = saturation

      filterValue.innerText = `${saturation}%`
    }
    else if (op.id === "inversion") {
      filterSlider.value = inversion;

      filterValue.innerText = `${inversion}%`
    } else {
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`



    }


  })
})
let update = () => {
  filterValue.innerText = `${filterSlider.value}%`;
  console.log(filterValue.innerText = `${filterSlider.value}%`)
  let sf = document.querySelector(".filter .active");
  if (sf.id === 'brightness') {
    brightness = filterSlider.value
  }
  else if (sf.id === "saturation") {
    saturation = filterSlider.value
  }
  else if (sf.id === "inversion") {
    inversion = filterSlider.value

  }
  else {
    grayscale = filterSlider.value;
  }


  showres()

}
rotateOptions.forEach((op) => {
  op.addEventListener("click", () => {
    if (op.id === "left") {
      rotate -= 90;
    }
    if (op.id === "right") {
      rotate += 90
    }
    if (op.id === "horizontal") {
      h = h === 1 ? -1 : 1;
    }
    if (op.id === "vertical") {
      v = v === 1 ? -1 : 1;
    }
    showres()

  })
})
let resfilbutton = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  filterOptions[0].click();
  h = 1;
  v = 1;
  showres();
}
let saveimg = () => {
  let canvas = document.createElement("canvas");
  let c = canvas.getContext("2d");
  canvas.width = previewImg.naturalWidth;
  canvas.height = previewImg.naturalHeight;
  c.translate(canvas.width / 2, canvas.height / 2)
  c.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  c.scale(h, v)
  c.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
  document.body.appendChild(canvas);
}
fileInput.addEventListener("change", accept)
filterSlider.addEventListener("input", update)
resetFilterBtn.addEventListener("click", resfilbutton)
saveImgBtn.addEventListener("click", saveimg);
chooseImgBtn.addEventListener("click", () => fileInput.click());
