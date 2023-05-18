/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [{
            source: '/api/:path*',
            destination: 'https://stake.socialbureau.io/:path*',
        }, ]
    },
}

module.exports = nextConfig