import dnsep1 from "../../assets/img/project-dnsep/dnsep-1.webp";
import dnsep2 from "../../assets/img/project-dnsep/dnsep-2.webp";
import dnsep3 from "../../assets/img/project-dnsep/dnsep-3.webp";
import dnsep4 from "../../assets/img/project-dnsep/dnsep-4.webp";
import dnsep5 from "../../assets/img/project-dnsep/dnsep-5.webp";
import dnsep6 from "../../assets/img/project-dnsep/dnsep-6.webp";
import dnsep7 from "../../assets/img/project-dnsep/dnsep-7.webp";
import dnsep8 from "../../assets/img/project-dnsep/dnsep-8.webp";
import typpov1 from "../../assets/img/project-typpov/typpov1.webp";
import typpov2 from "../../assets/img/project-typpov/typpov2.webp";
import typpov3 from "../../assets/img/project-typpov/typpov8.webp";
import typpov4 from "../../assets/img/project-typpov/typpov4.webp";
import typpov5 from "../../assets/img/project-typpov/typpov5.webp";
import typpov6 from "../../assets/img/project-typpov/typpov7.webp";
import typpov7 from "../../assets/img/project-typpov/typpov3.webp";
import typpov8 from "../../assets/img/project-typpov/typpov6.webp";
import unexpected1 from "../../assets/img/project-unexpected/unexpected3.webp";
import unexpected2 from "../../assets/img/project-unexpected/unexpected2.webp";
import unexpected3 from "../../assets/img/project-unexpected/unexpected7.webp";
import unexpected4 from "../../assets/img/project-unexpected/unexpected4.webp";
import unexpected5 from "../../assets/img/project-unexpected/unexpected5.webp";
import unexpected6 from "../../assets/img/project-unexpected/unexpected8.webp";
import unexpected7 from "../../assets/img/project-unexpected/unexpected6.webp";
import unexpected8 from "../../assets/img/project-unexpected/unexpected1.webp";
import platformVideo from "../../assets/video/Platform.mp4";
import dnsepVideo from "../../assets/video/DNSEP.mp4";
import typpovVideo from "../../assets/video/Typpov-Low.mp4";
import unexpectedVideo from "../../assets/video/UnexpectedStudio.mp4";
import variousGameVideo from "../../assets/video/VariousGame.mp4";

const projectsData = [
  // {
  //     title: "Antoine Lichtenberg ",
  //     smalltext: "  Decorator",
  //     year: "2024",
  //     url: "./fake-project-archi.png",
  //     alt: "Antoine Lichtenberg",
  //     text:
  //         "I created a portfolio for Antoine Lichtenberg, a former architect who is now moving" +
  //         " into film decoration. I enjoyed continuing to explore GSAP and responding to a first concrete project," +
  //         " for a client who had a wish and desires that I had to follow. I'm very excited to be working for inspiring people. ",
  //     techno: "React, GSAP",
  //     client: "Antoine Lichtenberg Decorator",
  //     type: "website",
  // },
  // {
  //     title: "Booball ",
  //     smalltext: "  Small Game with a boo",
  //     year: "2024",
  //     url: "./fake-project-booball.png",
  //     alt: "Booball",
  //     text:
  //         "When I learnt about canvas elements in html, I made this little animation." +
  //         " Basically just a decorative element. Later, I had the idea of turning it into a simple, fun game.",
  //     techno: "Javascript POO, canvas html element",
  //     client: "Personnal",
  //     type: "game",
  // },
  {
    title: "DNSEP2021 ",
    smalltext: "  Website",
    year: "2024",
    url: dnsepVideo,
    alt: "DNSEP2021",
    text:
      " DNSEP 2021 is a website who summarize my practice in art school. " +
      "More precisely my exibition-diploma in June 2021." +
      " I had fun to use GSAP and have again a lot of idea for improve that. Currently stopped" +
      "for progress with other sites.",
    techno: "React, GSAP",
    client: "Personnal",
    type: "website",
    img1: dnsep1,
    img2: dnsep2,
    img3: dnsep3,
    img4: dnsep4,
    img5: dnsep5,
    img6: dnsep6,
    img7: dnsep7,
    img8: dnsep8,
  },
  {
    title: "Typpov ",
    smalltext: " Tool",
    year: "2024",
    url: typpovVideo,
    alt: "Typpov",
    text:
      " I had to do a project for my degree at Ri7. I was engulfed in a multitude of folders where I stored" +
      " all my typefaces. But it was a bloody mess. So I had the idea of developing a tool to classify fonts. And" +
      " also to test them from different angles. You can create an account, log in and upload your favourite" +
      " fonts. I still have many ideas for features to develop, but for the moment I'm concentrating on my projects in Three.js. ",
    techno: "Figma, React, GSAP, Node.js, MySQL, Prisma, JWT",
    client: "School Project",
    type: "website",
    img1: typpov1,
    img2: typpov2,
    img3: typpov3,
    img4: typpov4,
    img5: typpov5,
    img6: typpov6,
    img7: typpov7,
    img8: typpov8,
  },

  {
    title: "Platform Game ",
    smalltext: "  Game",
    year: "2023",
    url: platformVideo,
    alt: "Platform Game",
    text: "While learning OOP in JS, I created a little platform game. I learned a lot thanks to Frank Laboratory on youtube. ",
    techno: "Javascript POO, canvas html element",
    client: "Personnal Prototype",
    type: "game",
  },
  {
    title: "UNEXPECTED Studio ",
    smalltext: "  Design",
    year: "2023",
    url: unexpectedVideo,
    alt: "UNEXPECTEDStudio",
    text:
      "I produced a proposal for the redesign of the Unexpected Studio website. I followed their graphic guidelines" +
      " to come up with something that suited their world and the market. I loved working on a real project.  ",
    techno: "Figma, Adobe Illustrator, Adobe Photoshop",
    client: "PROPOSITION FOR UNEXPECTEDStudio ",
    type: "website",
    img1: unexpected1,
    img2: unexpected2,
    img3: unexpected3,
    img4: unexpected4,
    img5: unexpected5,
    img6: unexpected6,
    img7: unexpected7,
    img8: unexpected8,
  },
  {
    title: "4 Games ",
    smalltext: "  Game",
    year: "2023",
    url: variousGameVideo,
    alt: "Various Games",
    text:
      "A series of little games that helped me learn the basics of Javascript at the Ri7 school." +
      " The maze is coded in PHP, I couldn't stand the constant refreshes so I used SQL queries. Without realising it, I had just" +
      " created my first API. Although it was pointless, it was a great learning experience. ",
    techno: "Javascript, PHP",
    client: "School Project",
    type: "game",
  },
];

export default projectsData;
