const API_URL = "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";

let currentSlideIndex = 0;
let slider;
let container;
let productDivs;

const getData = async function () {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    parsedObject = data;

    productDivs = parsedObject.map(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("productDiv");
      productDiv.innerHTML = `
      <img src="${product.img}" alt ="${product.name}" />
      <h3>${product.name}</h3>      
      `;
      slider.appendChild(productDiv);
      return productDiv;
    });

    showSlides(currentSlideIndex);

  } catch (error) {
    console.error("Hata", error);
  }
}
function plusSlides(n) {
  showSlides(currentSlideIndex + n);
}


function showSlides(n) {
  let i;
  const totalSlides = productDivs.length;
  currentSlideIndex = n;

  if (currentSlideIndex >= totalSlides) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = totalSlides - 1;
  }

  for (i = 0; i < totalSlides; i++) {
    productDivs[i].style.display = "none";
  }

  let displayCount = 5; 
  for (i = 0; i < displayCount; i++) {
    let displayIndex = (currentSlideIndex + i) % totalSlides;
    productDivs[displayIndex].style.display = "block";
  }
  
}


function addStyles() {
  const styles = `
    * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
    }

    .container {
        position: relative;
        width: 80%;
        margin: 50px auto;
      }
      
      .slider {
        display: flex;
        transition: transform 0.5s ease-in-out;
        overflow: hidden;
      }
      
      .productDiv {
        overflow: hidden;
        width: 20%;
        text-align: center;
      }

      img{width: 100%;
        object-fit: cover;}
      
      button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 24px;
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px;
        cursor: pointer;
      }
      
      #prev {
        left: 0;
      }
      
      #next {
        right: 0;
      }
    `;

  const styleEl = document.createElement("style");
  styleEl.type = "text/css";
  styleEl.appendChild(document.createTextNode(styles));
  document.head.appendChild(styleEl);
}

container = document.createElement("div");
container.classList.add("container");
slider = document.createElement("div");
slider.classList.add("slider");

const prevButton = document.createElement("button");
prevButton.id = "prev";
prevButton.innerText = "<";
prevButton.onclick = function () { plusSlides(-1); };

const nextButton = document.createElement("button");
nextButton.id = "next";
nextButton.innerText = ">";
nextButton.onclick = function () { plusSlides(1); };

container.appendChild(slider)
container.appendChild(prevButton)
container.appendChild(nextButton)
document.body.appendChild(container);

addStyles();
getData();
