// Site configuration - equivalent to Jekyll's _config.yml
export const siteConfig = {
  title: "Siddhartha Pratap Singh",
  name: "Siddhartha Pratap Singh",
  role: "Game and Graphics Programmer",
  email: "sidps1112@gmail.com",
  description:
    "Portfolio website showcasing game development and graphics programming projects",
  baseUrl: "",
  url: "https://sps1112.github.io",
  githubUsername: "sps1112",

  // Asset paths
  assets: {
    // Profile images
    profileImg: "/assets/profile3.jpg",
    profileImgAlt: "/assets/profile2.jpg",

    // Banner images
    bannerImg: "/assets/banner2.png",
    bannerImgAlt: "/assets/banner.png",
    errorBanner: "/assets/error-banner.jpg",

    // Documents
    resume: "/assets/SiddharthaPratapSingh_Resume.pdf",

    // Company logos
    logos: {
      sharechat: "/assets/logos/sharechat.png",
      gamedev: "/assets/logos/gamedev.png",
      cs: "/assets/logos/cs.png",
    },

    // SVG icons
    icons: {
      github: "/assets/svg/github.svg",
      home: "/assets/svg/home.svg",
      itch: "/assets/svg/itch.svg",
      linkedin: "/assets/svg/linkedin.svg",
      mail: "/assets/svg/mail.svg",
      menu: "/assets/svg/menu.svg",
    },
  },

  // Legacy paths for backward compatibility
  bannerImg: "/assets/banner2.png",
  profileImg: "/assets/profile3.jpg",

  // Social links with proper icons
  socialLinks: [
    {
      name: "Email",
      url: "mailto:sidps1112@gmail.com",
      icon: "/assets/svg/mail.svg",
      username: "sidps1112@gmail.com",
    },
    {
      name: "GitHub",
      url: "https://github.com/sps1112",
      icon: "/assets/svg/github.svg",
      username: "@sps1112",
    },
    {
      name: "Itch.io",
      url: "https://kingcrimson1112.itch.io/",
      icon: "/assets/svg/itch.svg",
      username: "kingcrimson1112",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/sidps1112/",
      icon: "/assets/svg/linkedin.svg",
      username: "sidps1112",
    },
  ],

  // Personal details
  workStatus: "Ex-Group Leader, Studio Centauri, IIT Kanpur",
  likes:
    "Rock Music, Movies, Anime/Manga, Quizzing, and basically anything pop culture.",
  games:
    "Fallout: New Vegas, Disco Elysium, Castlevania: Symphony of the Night, Mass Effect 2, Final Fantasy IX, Stardew Valley and Civilization V.",
  quote:
    '"In the darkest times, hope is something you give yourself. That is the meaning of inner strength" - Iroh',
};

export default siteConfig;
