const lcwData = fetch("https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json");

const likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];


lcwData.then(response => {
    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }
    return response.json();
}).then(parsedObject => {

    const content = document.createElement("div");
    content.classList.add("content");

    const inner = document.createElement("div");
    inner.classList.add("inner");

    parsedObject.forEach(product => {
        const productId = product.id;
        const productImg = product.img;
        const productName = product.name;
        const productSlug = product.url;
        const productPrice = product.price;

        const maxProductNameLength = 28;
        const truncatedProductName = productName.length > maxProductNameLength ? productName.slice(0, maxProductNameLength) + "..." : productName;

        const box = document.createElement("div");
        box.classList.add("box");
        box.setAttribute("data-id", productId)
        box.innerHTML = `
            <svg id="custom-svg-${productId}"
                class="svgElement"
                fill=currentColor
                clip-rule="evenodd" 
                fill-rule="evenodd" 
                stroke-linejoin="round"
                stroke-miterlimit="2" 
                viewBox="0 0 24 24"
             >
                <path d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z" fill-rule="nonzero"/>
                </svg>
            </svg>
            <img src='${productImg}' class="productImg" alt='${productName}'/>
            <a href="${productSlug}">${truncatedProductName}</a>
            <p>${productPrice} TL</p>
        `;

        // Tıklama işlemi
        box.addEventListener('click', function () {
            handleSliderClick(productId, likedProducts);
        });


        inner.appendChild(box);
    });

    content.appendChild(inner);
    document.body.appendChild(content);

    //svg aksiyon işlemleri
    const svgSec = JSON.parse(localStorage.getItem("likedProducts"));
    if (svgSec && svgSec.length > 0) {
        svgSec.forEach(item => {
            const svgid = item.productId;
            const svgcolor = item.color;
            const svgElement = document.getElementById(`custom-svg-${svgid}`);

            if (svgid) {
                svgElement.style.fill = svgcolor;
            }
        });
    }

    // Slider Contents CSS 
    function addStyles() {
        const styles = `
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        .content{
            width: 1150px;
            margin: 50px auto;
        }

        .inner{
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: max-content;
            flex-wrap: wrap;
            width: 100%;
            height: 273px;
            overflow: hidden;
        }

        .box{
            position: relative;
            width: 13%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100%
        }

        .productImg{
            object-fit: cover;
            width: 100%;
            height: auto;
        }

        a{
            text-decoration: none;
            font-size: 13px;
            color: #242222;
            font-weight: 500;
            margin: 10px 0px;
        }

        p{
            text-align: left;
            width: 100%;
            font-weight: 600;
        }

        svg{
            position: absolute;
            width: 30px;
            height: 30px;
            left: 0;
            top: 0;
            background: white;
            padding: 5px;
            border-radius: 5px;
            border: 1px solid gray;
            cursor: pointer;
            color: #a50000;
        }
        `;


        const styleElement = document.createElement("style");
        styleElement.type = "text/css";
        styleElement.appendChild(document.createTextNode(styles));
        document.head.appendChild(styleElement);
    }

    addStyles();

});



//favori aksiyon işlemleri
function handleSliderClick(productId, likedProducts) {
    const index = likedProducts.findIndex(item => item.productId === productId);

    if (index !== -1) {
        likedProducts.splice(index, 1);
        document.getElementById(`custom-svg-${productId}`).style.fill = '';
    } else {
        const colorCode = '#0060fb';

        likedProducts.push({ productId: productId, color: colorCode });
        document.getElementById(`custom-svg-${productId}`).style.fill = colorCode;
    }

    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
}
