/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    optimizeFonts: true,
    images: {
        unoptimized : true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'feed.p5s.ru',
                port: '',
                pathname: '/images/**',
            },
        ],
        minimumCacheTTL: 15000000,
    },
}
module.exports = {
    experimental: {
        forceSwcTransforms: true,
        scrollRestoration: true,
    },
}

// module.exports = {
//     images: {
//         domains: ['https://feed.p5s.ru']
//     }
// }
module.exports = nextConfig
