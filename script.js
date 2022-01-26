"use strict";
const navButton = document.querySelector(".nav__element");
const line1 = document.querySelector(".line-1");
const line2 = document.querySelector(".line-2");
const line3 = document.querySelector(".line-3");
const navbar = document.querySelector(".navbar");
const closeNav = () => {
  navButton.classList.toggle("moveinX");
  line1.classList.toggle("opacity");
  line2.classList.toggle("rotate1");
  line3.classList.toggle("rotate3");
  navbar.classList.toggle("full");
};

navButton.addEventListener("click", function (e) {
  e.preventDefault();
  closeNav();
});

const click = document.querySelector(".clicking");
const section1 = document.querySelector(".section1");
click.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });
  section1.scrollIntoView({ behavior: "smooth" });
});

const navbarLink = document.querySelectorAll(".navbar__list--link");
navbarLink.forEach((nav) =>
  nav.addEventListener("click", function (e) {
    e.preventDefault();
    let destination = document.querySelector(this.hash);
    console.log(destination);
    destination.scrollIntoView({
      behavior: "smooth",
    });
    closeNav();
  })
);

const imgTargets = document.querySelectorAll("img[data-src]");
// console.log(imgTargets);
const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entries);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy");
    imgTargets.forEach((img) => {
      img.previousElementSibling.classList.add("animation");
      // console.log(img.previousElementSibling);
    });
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "120px",
});
imgTargets.forEach((img) => imgObserver.observe(img));

const slides = document.querySelectorAll(".slider");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
console.log(slides);
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
let cur = 0;
let max = slides.length - 1;
console.log(max);
prev.addEventListener("click", function (e) {
  e.preventDefault();
  if (cur < max) {
    cur += 1;
  } else {
    cur = 0;
  }
  console.log(cur);
  goToSlide(cur);
});
next.addEventListener("click", function (e) {
  e.preventDefault();
  if (cur === 0) {
    cur = max;
  } else {
    cur = cur - 1;
  }
  console.log(cur);
  goToSlide(cur);
});
const sectionabout = document.querySelector("#about__section");
const nav = document.querySelector(".nav");
const observatory = function (entries) {
  const [entry] = entries;
  console.log(entry);

  if (entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const observing = new IntersectionObserver(observatory, {
  root: null,
  threshold: [0, 0.1],
  // rootMargin: "100px",
});
// observing.observe(sectionabout);
