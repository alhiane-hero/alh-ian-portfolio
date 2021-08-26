/* start our public functions */
function removeActive(elements) {
    for (element of elements) {
        element.classList.remove('active');
    }
}
/* end our public functions */

/* start toggle menu (nav) */
const menuLogoEl = document.getElementById('menu-logo');
const navbarEl = document.getElementById('navbar');
menuLogoEl.addEventListener('click', _ => navbarEl.classList.toggle('show'));
/* end toggle menu (nav) */

/* start auto typing (banner-info) */
const jobEl = document.getElementById('job');
let i = 0; j = 0;
let strings = [
'Javascript Developer',
'Front-end Developer',
'Back-end Developer',
'Full Stack Developer'
];
let interval = setInterval( _ => {
    if (i < strings[j].length) {
        jobEl.innerHTML += strings[j].charAt(i);
        i++;
    } else {
        jobEl.innerHTML = '';
        i = 0;
        if (j < strings.length - 1) j++;
        else j = 0;
    }
}, 150);
/* end auto typing (banner-info) */

/* start about me slider (about-me) */
const slideBtns = document.querySelector('.slide-btns').children;
const slideContainer = document.querySelector('.slide-container');
let increamentI = 0;
[...slideBtns].forEach(btn => {
    btn.addEventListener('click', _ => {
        removeActive(slideBtns);
        btn.classList.add('active');
        if (btn.classList.contains('left')) {
            slideContainer.style.marginLeft = '0%';
            increamentI = 0;
        } else if (btn.classList.contains('right')) {
            slideContainer.style.marginLeft = '-200%';
            increamentI = -1;
        } else {
            slideContainer.style.marginLeft = '-100%';
            increamentI = 1;
        }
    });
});
setInterval(_ => {
    increamentI++;
    if (increamentI > 2) increamentI = 0;
    slideContainer.style.marginLeft = `-${100 * increamentI}%`;
    removeActive(slideBtns);
    slideBtns[increamentI].classList.add('active');
}, 10000);
/* end about me slider (about-me) */

/* start my portfolio (portfolio) */
const prtRowEl = document.getElementById('prt-row');
const respTabsList = document.querySelectorAll('.resp-tabs-list li');
let dataList = [];
// fetch portfolio data:
getApiData();
function getApiData() {
    fetch('data.json')
    .then(resp => resp.json())
    .then(resData => {
        createPrtCards(resData.data);
        filterCards(resData.data)
    });
}
// create portfolio cards using api data:
function createPrtCards(cardData) {
    // clear container:
    prtRowEl.innerHTML = '';
    cardData.map(card => {
        let cardEl = document.createElement('div');
        cardEl.classList.add('card');
        let cardData = `<div class="card-head">
            <img class='img-fluid' src=${card.imgSrc} alt="${card.workName}">
            <div class="btns">
                <a href=${card.githubUrl} target="_blank" class="btn">Src Code</a>
                <a href=${card.demoUrl} target="_blank" class="btn">Live Demo</a>
            </div>
        </div>
        <div class="card-body">
            <h3 class="work-name">${card.workName}</h3>
            <ul class="stars" id="stars">
                <li><i class="fas fa-star"></i></li>
                <li><i class="fas fa-star"></i></li>
                <li><i class="fas fa-star"></i></li>
                <li><i class="fas fa-star"></i></li>
                <li><i class="fas fa-star"></i></li>
            </ul>
        </div>`;
        cardEl.innerHTML = cardData;
        let stars = cardEl.querySelectorAll('.card-body .stars li');
        for (let i = 0; i < card.numOfStars; i++) {
            stars[i].querySelector('i').style.color = '#29a78e';
        }
        prtRowEl.appendChild(cardEl);
    });
}
// filter portfolio cards:
function filterCards(cardData) {
    respTabsList.forEach(respTab => {
        respTab.addEventListener('click', _ => {
            removeActive(respTabsList);
            respTab.classList.add('active');
            if (respTab.classList.contains('all')) {
                dataList = [];
                cardData.forEach(card => dataList.push(card));
                createPrtCards(dataList);
            } else if (respTab.classList.contains('html_css')) {
                dataList = [];
                cardData.forEach(card => {
                    if (card.type === "html - css") {
                        dataList.push(card);
                        createPrtCards(dataList);
                    }
                });
            } else {
                dataList = [];
                cardData.forEach(card => {
                    if (card.type === "javascript") {
                        dataList.push(card);
                        createPrtCards(dataList);
                    }
                }); 
            }
        });
    });
}
/* end my portfolio (portfolio) */

/* start go to sections (navbar) */
const links = document.querySelectorAll('.links');
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        let secClass = link.getAttribute('data-sec');
        let sec = document.querySelector(`.${secClass}`);
        let value = sec.offsetTop;
        window.scrollTo(0, value);
    });
});
/* end go to sections (navbar) */

/* start scroll-to-top part */
const scrollToTopEl = document.getElementById('scroll-to-top');
window.addEventListener('scroll', _ => {
    if (window.scrollY > 0) {
        scrollToTopEl.classList.add('show');
    } else {
        scrollToTopEl.classList.remove('show');
    }
});
scrollToTopEl.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo(0, 0);
});
/* end scroll-to-top part */