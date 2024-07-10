/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: false,
    skipTrailingSlashRedirect: true,
    experimental: {
        optimizePackageImports: [
            "tailwindcss", "react-icons/bi", "react-icons/fa", "react-icons/md", "react-icons/fa6"
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "**"
            }
        ]
    }
}

export default nextConfig
