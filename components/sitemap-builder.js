import React from "react";
import fs from "fs";

// const SiteMapBuilder = () => {};

const SiteMapBuilder = ({ res }) => {
    const baseUrl = {
        development: "http://localhost:3000",
        production: "https://lltoys.ru",
    }[process.env.NODE_ENV];

    const staticPages = [
                "App.js",
                "About.js",
                "Delivery.js",
                "HitProducts",
                "ProductScreen",
                "CartScreen",
                "SiteMapBuilder.js",
            ]
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath}`;
        });
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${staticPages
            .map((url) => {
                return `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `;
            })
            .join("")}  
        </urlset>
        `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
    return {
        props: {},
    };
};

export default SiteMapBuilder;