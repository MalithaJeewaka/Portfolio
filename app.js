const tl1 = gsap.timeline({
  defaults: { duration: 0.7, ease: "Power2.easeOut" },
});

tl1.fromTo(".me", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 });
tl1.fromTo(".head1", { y: "100%" }, { y: 0 }, "<140%");
tl1.fromTo(".head2", { y: "-100%" }, { y: 0 }, "< 10%");
tl1.fromTo(".logo, .nav-links, .menu", { opacity: 0 }, { opacity: 1 });
tl1.fromTo(".scroll-down", { opacity: 0 }, { opacity: 1 });
tl1.fromTo(
  ".mouse",
  { y: 0 },
  { y: 5, repeat: -1, yoyo: true, repeatDelay: 0.1 }
);

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".about",
    start: "top 50%",
    end: "bottom 50%",
    toggleActions: "play reverse play reverse",
    // markers: { startColor: "blue", endColor: "blue" },
  },
});

tl2
  .from(".about-title", { opacity: 0, x: -100, duration: 1 })
  .from(".about-description", { opacity: 0, x: 100, duration: 0.75 }, "<");

//skills section ///////////////////////////
const tlSkills = gsap.timeline({
  scrollTrigger: {
    trigger: ".skill-section",
    start: "-20% 50%",
    end: "40% 40%",
    scrub: true,
    // markers: { startColor: "white", endColor: "white" },
  },
});

tlSkills.from(".card", { opacity: 0, y: 100, stagger: 0.5, duration: 1 });
///
const tlSkill = gsap.timeline({
  scrollTrigger: {
    trigger: ".logos",
    start: "-10% 50%",
    end: "60% 50%",
    // markers: true,
  },
});

tlSkill.to(".skills", {
  textShadow: "1px 1px 10px",
  color: "white",
  zIndex: 2,
});

/////////////////////////////////

//loading screen
document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector(".loading-screen ").style.visibility = "visible";
  } else {
    document.querySelector(".loading-screen ").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

////form section//////////////////////////////////////////////////////////////////////////////
const containers = document.querySelectorAll(".input-container");
const form = document.querySelector("form");
const tl = gsap.timeline({ defaults: { duration: 1 } });

//line
const start =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";

const end =
  "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

//elastic effect
containers.forEach((container) => {
  const input = container.querySelector(".input");
  const line = container.querySelector(".elastic-line");
  const placeHolder = container.querySelector(".placeholder");

  input.addEventListener("focus", () => {
    // check to see if there any text in the input
    if (!input.value) {
      tl.fromTo(
        line,
        { attr: { d: start } },
        { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
      );
      tl.to(
        line,
        { attr: { d: start }, ease: "elastic.out(2.5, 0.5)" },
        "<50%"
      );
      //placeholder shift
      tl.to(
        placeHolder,
        {
          top: -15,
          left: 0,
          scale: 0.7,
          duration: 0.5,
          ease: "Power2.easeOut",
        },
        "<%15"
      );
    }
  });
});

//revertback if its not focused
form.addEventListener("click", () => {
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeHolder = container.querySelector(".placeholder");

    if (document.activeElement !== input) {
      if (!input.value) {
        gsap.to(placeHolder, {
          top: 0,
          left: 0,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        });
      }
    }

    // we will do our validation
    //name validation
    input.addEventListener("input", (e) => {
      if (e.target.type === "text") {
        let inputText = e.target.value;
        if (inputText.length > 2) {
          //colorize
          colorize("#6391E8", line, placeHolder);
        } else {
          colorize("#FE8C99", line, placeHolder);
        }
      }
      //email validation
      if (e.target.type === "email") {
        let valid = validateEmail(e.target.value);
        if (valid) {
          //colorize
          colorize("#6391E8", line, placeHolder);
        } else {
          colorize("#FE8C99", line, placeHolder);
        }
      }

      //validate phone
      if (e.target.type === "tel") {
        let valid = validatePhone(e.target.value);
        if (valid) {
          //colorize
          colorize("#6391E8", line, placeHolder);
        } else {
          colorize("#FE8C99", line, placeHolder);
        }
      }
    });
  });
});

//checking email validation
function validateEmail(email) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

//colorize function
function colorize(color, line, placeHolder) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(placeHolder, { color: color, duration: 0.75 });
}

//animating character
gsap.set("#eye", { transformOrigin: "center" });
gsap.fromTo(
  "#eye",
  { scale: 1 },
  {
    scale: 0.3,
    repeat: -1,
    yoyo: true,
    repeatDelay: 0.5,
    ease: "Power2.easeOut",
  }
);
gsap.fromTo(
  "#eyebrow",
  { y: 0 },
  { y: -1, yoyo: true, repeat: -1, repeatDelay: 0.5, ease: "Power2.easeOut" }
);

//submit button
const button = document.querySelector(".button");
const tl3 = gsap.timeline({
  defaults: {
    duration: 0.75,
    ease: "Power2.easeOut",
  },
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  tl3.to(".contact-left, .contact-right", {
    opacity: 0,
    y: 30,
    pointerEvents: "none",
  });
  tl3.to("form", { scale: 0.8 }, "<");
  tl3.fromTo(".submitted", { opacity: 0, y: 30 }, { opacity: 1, y: 0 });

  //hand wave
  gsap.set("#hand", { transformOrigin: "left" });
  gsap.fromTo(
    "#hand",
    { rotation: 0, y: 0 },
    { rotation: -10, y: 2, ease: "elastic(3,0.3", duration: 2, delay: 1 }
  );
});

////// projects section
const container = document.querySelector(".container");
const sections = gsap.utils.toArray(".projects");
console.log(sections);

let scrollTween = gsap.timeline({
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    end: "+=3000",
  },
});

scrollTween.to(sections, {
  xPercent: -100 * (sections.length - 1),
});

const tlProject = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    start: "0% 50%",
    end: "300% 50%",
    toggleActions: "play pause play reverse",
    // markers: { startColor: "blue", endColor: "blue" },
  },
});

tlProject
  .fromTo(".project-title", { opacity: 0, x: -100 }, { opacity: 1, x: 0 })
  .fromTo(".projects", { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "<");

///////// form section intro ani //////////////
const tlFormIntro = gsap.timeline({
  scrollTrigger: {
    trigger: ".body",
    start: "0% 50%",
    end: "300% 50%",
    toggleActions: "play pause play reverse",
    // markers: { startColor: "blue", endColor: "blue" },
  },
});

tlFormIntro
  .fromTo(".contact-title", { opacity: 0, x: -100 }, { opacity: 1, x: 0 })
  .fromTo("form", { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "<");

///////////////////////

// const lenis = new Lenis({
//   duration: 0,
//   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   smoothWheel: true,
// });

// function raf(time) {
//   lenis.raf(time);
//   requestAnimationFrame(raf);
// }

// requestAnimationFrame(raf);
///////1st page pin
const tlheroSlide = gsap.timeline({
  scrollTrigger: {
    trigger: ".first-page",
    start: "0%",
    end: "100%",
    pin: true,
    pinSpacing: false,
    // markers: { startColor: "white", endColor: "white" },
    scrub: true,
  },
});

// tlheroSlide.to(".first-page", { scale: 0.7 });

// burger nav //////
const burger = document.querySelector(".menu");
const menu = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

burger.addEventListener("click", () => {
  if (burger.classList.contains("opened")) {
    menu.classList.add("navactive");
  } else {
    menu.classList.remove("navactive");
  }
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("navactive");
    burger.classList.remove("opened");
    let ariaExpanded = burger.getAttribute("aria-expanded");

    if (ariaExpanded === "true") {
      burger.setAttribute("aria-expanded", "false");
    } else {
      burger.setAttribute("aria-expanded", "true");
    }
  });
});

///////make the page unscrollable when burger menu is open//////////////

function toggleMobileMenu() {
  const body = document.querySelector("body");
  const menuButton = document.querySelector(".menu");

  menuButton.addEventListener("click", function () {
    body.classList.toggle("menu-open");

    if (body.classList.contains("menu-open")) {
      // Add class to make the page unscrollable
      body.style.overflow = "hidden";
    } else {
      // Remove class to allow scrolling
      body.style.overflow = "auto";
    }
  });
}

window.addEventListener("load", toggleMobileMenu);
