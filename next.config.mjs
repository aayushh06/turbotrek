/** @type {import('next').NextConfig} */
import webpack from "webpack";

const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^isomorphic-form-data$/,
        `${config.context}/form-data-mock.js`
      )
    );
    config.resolve.fallback = {
      ...config.resolve.fallback,  
      fs: false, // the solution
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  }
};

export default nextConfig;
