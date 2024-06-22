/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: '/farmhash\.node$/',
        use: 'node-loader',
      });
  
      return config;
    },
  //   webpack: (config) => {
  //     config.module.rules.push({
  //       type: "webassembly/async"
  //     })
  //     return config;
  //   }
  };

export default nextConfig;
