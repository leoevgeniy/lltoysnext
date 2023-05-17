/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    swcMinify: true,
    optimizeFonts: true,
    images: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [10, 16, 32, 48, 64, 70, 96, 128, 256, 384],
        unoptimized : true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'feed.p5s.ru',
                port: '',
                pathname: '/images/**'
            }
        ],
        minimumCacheTTL: 15000000
    },

    experimental: {
        largePageDataBytes: 128 * 3000,
        forceSwcTransforms: true,
        scrollRestoration: true
    }
}
// module.exports = {
//
// }

// module.exports = {
//     images: {
//         domains: ['https://feed.p5s.ru']
//     }
// }
module.exports = nextConfig
