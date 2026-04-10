let fotosProducto = []; // Se cargará desde el JSON o el array inicial

// Array por defecto (mientras se carga el JSON si es necesario)
const defaultImages = [
    { url: "1.jpeg" }, { url: "2.PNG" }, { url: "3.jpeg" }, { url: "3.PNG" },
    { url: "4.PNG" }, { url: "5.jpeg" }, { url: "6.PNG" }, { url: "7.jpeg" },
    { url: "8.PNG" }, { url: "9.jpeg" }, { url: "10.PNG" }, { url: "11.jpeg" },
    { url: "12.PNG" }, { url: "13.jpeg" }, { url: "14.PNG" }, { url: "15.jpeg" },
    { url: "16.PNG" }, { url: "17.jpeg" }, { url: "18.PNG" }, { url: "19.jpeg" },
    { url: "20.PNG" }, { url: "21.jpeg" }, { url: "22.PNG" }, { url: "23.PNG" },
    { url: "24.PNG" }, { url: "25.PNG" }, { url: "26.PNG" }, { url: "27.PNG" },
    { url: "28.PNG" }, { url: "29.PNG" }, { url: "30.PNG" }, { url: "31.PNG" },
    { url: "32.PNG" }, { url: "33.PNG" }, { url: "34.PNG" }, { url: "35.PNG" },
    { url: "36.PNG" }, { url: "37.PNG" }, { url: "39.PNG" }, { url: "40.PNG" },
    { url: "41.PNG" }, { url: "42.PNG" }, { url: "43.PNG" }, { url: "44.PNG" },
    { url: "46.PNG" }, { url: "47.PNG" }, { url: "48.PNG" }, { url: "49.PNG" },
    { url: "50.PNG" }, { url: "51.PNG" }, { url: "52.PNG" }, { url: "53.PNG" },
    { url: "54.PNG" }, { url: "55.PNG" }, { url: "56.PNG" }, { url: "57.PNG" },
    { url: "58.PNG" }, { url: "59.PNG" }, { url: "60.PNG" }, { url: "61.PNG" },
    { url: "62.PNG" }, { url: "63.PNG" }, { url: "64.PNG" }, { url: "65.PNG" },
    { url: "66.PNG" }, { url: "67.PNG" }, { url: "68.PNG" }, { url: "69.PNG" },
    { url: "70.PNG" }, { url: "71.PNG" }, { url: "72.PNG" }, { url: "73.PNG" },
    { url: "74.PNG" }, { url: "75.PNG" }, { url: "76.PNG" }, { url: "77.PNG" },
    { url: "78.PNG" }, { url: "79.jpeg" }
];

fotosProducto = defaultImages;

let currentIndex = 0;
let isDragging = false;
let startX;
let currentRotation = 0;

const mainImg = document.getElementById('main-img');
const thumbContainer = document.getElementById('thumbs');
const viewer = document.getElementById('viewer');
const currentNumTxt = document.getElementById('current-num');
const totalNumTxt = document.getElementById('total-num');
const imgSearch = document.getElementById('imgSearch');

function init() {
    totalNumTxt.innerText = fotosProducto.length;
    thumbContainer.innerHTML = fotosProducto.map((foto, index) => `
        <img src="${foto.url}" 
             class="thumb ${index === 0 ? 'active' : ''}" 
             onclick="seleccionarImagen(${index})"
             onerror="this.src='https://via.placeholder.com/65/e2e8f0/64748b?text=${index + 1}'">
    `).join('');
    cargarImagen(0);
}

function cargarImagen(index) {
    if (index < 0 || index >= fotosProducto.length) return;
    currentIndex = index;
    mainImg.src = fotosProducto[index].url;
    currentNumTxt.innerText = index + 1;
    currentRotation = 0;
    mainImg.style.transform = `rotateY(0deg)`;

    const thumbs = document.querySelectorAll('.thumb');
    thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
    if(thumbs[index]) thumbs[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function buscarImagen() {
    const val = parseInt(imgSearch.value);
    if(!isNaN(val)) {
        cargarImagen(val - 1);
        imgSearch.value = '';
    }
}

imgSearch.addEventListener('keypress', (e) => { if(e.key === 'Enter') buscarImagen(); });

function cambiarImagen(direccion) {
    currentIndex = (currentIndex + direccion + fotosProducto.length) % fotosProducto.length;
    cargarImagen(currentIndex);
}

function seleccionarImagen(index) { cargarImagen(index); }

function cargarNuevaLista() {
    try {
        const nuevaData = JSON.parse(document.getElementById('jsonInput').value);
        if (Array.isArray(nuevaData)) {
            fotosProducto = nuevaData;
            init();
            bootstrap.Modal.getInstance(document.getElementById('modalNuevaLista')).hide();
        }
    } catch (e) { document.getElementById('errorMsg').classList.remove('d-none'); }
}

// Rotación 360
const startAction = (e) => { isDragging = true; startX = e.pageX || e.touches[0].pageX; };
const moveAction = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    currentRotation += (x - startX) * 0.7;
    mainImg.style.transform = `rotateY(${currentRotation}deg)`;
    startX = x;
};
const stopAction = () => isDragging = false;

viewer.addEventListener('mousedown', startAction);
window.addEventListener('mousemove', moveAction);
window.addEventListener('mouseup', stopAction);
viewer.addEventListener('touchstart', startAction, {passive: true});
viewer.addEventListener('touchmove', moveAction, {passive: true});
viewer.addEventListener('touchend', stopAction);

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', init);