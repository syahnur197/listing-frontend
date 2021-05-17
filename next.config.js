const { AWS_CDN } = require("./lib/utils/config");

module.exports = {
  images: {
    domains: [AWS_CDN],
  },
};
