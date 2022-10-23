const sizes = {
  mobile_S: "23.75em", // 375px
  mobile_M: "26.25em", // 420px
  mobile_L: "37.5em", // 600px
  tablet: "56.25em", // 900px
  laptop: "75em", // 1200px
  laptop_L: "90em", // 1440px;
  desktop: "112.5em", // 1800px
};

const devices = {
  mobile_S: `only screen and (max-width: ${sizes.mobile_S})`,
  mobile_M: `only screen and (max-width: ${sizes.mobile_M})`,
  mobile_L: `only screen and (max-width: ${sizes.mobile_L})`,
  tablet: `only screen and (max-width: ${sizes.tablet})`,
  laptop: `only screen and (max-width: ${sizes.laptop})`,
  laptop_L: `only screen and (max-width: ${sizes.laptop_L})`,
  desktop: `only screen and (min-width: ${sizes.desktop})`,
};

export default devices;
