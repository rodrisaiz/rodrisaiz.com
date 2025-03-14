const words = ["Hello", "Hola", "Salut", "Kaixo", "Hallo", "你好", "Ciao ", "Hej ", "مرحبًا", "Hei ", "Olá ", "नमस्ते", "Aloha", ];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
    currentWord = words[i];
    if (isDeleting) {
        document.getElementById("typewriter").textContent = currentWord.substring(0, j - 25);
        j--;
        if (j == 0) {
            isDeleting = false;
            i++;
            if (i == words.length) {
                i = 0;

            }
        }
        type();
        
    } else {
        document.getElementById("typewriter").textContent = currentWord.substring(0, j + 25);
        j++;
        if (j == currentWord.length) {
            isDeleting = true;

        }
        setTimeout(type, 400);
    }

}

type();


/*test button */

document.querySelectorAll('.button').forEach(button => {

let duration = 3000,
svg = button.querySelector('svg'),
svgPath = new Proxy({
    y: null,
    smoothing: null
}, {
    set(target, key, value) {
        target[key] = value;
        if(target.y !== null && target.smoothing !== null) {
            svg.innerHTML = getPath(target.y, target.smoothing, null);
        }
        return true;
    },
    get(target, key) {
        return target[key];
    }
});

button.style.setProperty('--duration', duration);

svgPath.y = 20;
svgPath.smoothing = 0;

button.addEventListener('click', e => {

e.preventDefault();

if(!button.classList.contains('loading')) {

    button.classList.add('loading');

    const downloadLink = document.createElement('a');
    downloadLink.href = 'rodrisaizcv.pdf';
    downloadLink.download = 'rodrisaizcv.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    gsap.to(svgPath, {
        smoothing: .3,
        duration: duration * .065 / 1000
    });

    gsap.to(svgPath, {
        y: 12,
        duration: duration * .265 / 1000,
        delay: duration * .065 / 1000,
        ease: Elastic.easeOut.config(1.12, .4)
    });

    setTimeout(() => {
        svg.innerHTML = getPath(0, 0, [
            [3, 14],
            [8, 19],
            [21, 6]
        ]);
    }, duration / 2);

}

});

});

function getPoint(point, i, a, smoothing) {
let cp = (current, previous, next, reverse) => {
    let p = previous || current,
        n = next || current,
        o = {
            length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
            angle: Math.atan2(n[1] - p[1], n[0] - p[0])
        },
        angle = o.angle + (reverse ? Math.PI : 0),
        length = o.length * smoothing;
    return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
},
cps = cp(a[i - 1], a[i - 2], point, false),
cpe = cp(point, a[i - 1], a[i + 1], true);
return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
let points = pointsNew ? pointsNew : [
    [4, 12],
    [12, update],
    [20, 12]
],
d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
return `<path d="${d}" />`;
}

//Footer phrase
const today = new Date();

let year = today.getUTCFullYear();

console.log(year);

let menssage = `&#169; ${year} Rodri Saiz™. All rights reserved... the left's also. This page works without cookies. 🙃`;
document.getElementById("footerPhrase").innerHTML = menssage;

//PDF downloader

function downloadPDF(pdfURL, pdfFilename) {
    let enlace = document.createElement("a");
    enlace.href = pdfURL;
    enlace.download = pdfFilename;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}

document.getElementById("descargarPDF").addEventListener("click", function (event) {
    event.preventDefault(); // Evita que el enlace recargue la página
    downloadPDF("https://rodrisaiz.github.io/rodrisaiz.com/PDF/rodrisaizcv.pdf", "rodrisaizcv.pdf");
});

