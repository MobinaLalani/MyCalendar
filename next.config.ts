import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack(config) {
    const rules = config.module?.rules as RuleSetRule[];

const fileLoaderRule = rules.find(
  (rule) =>
    typeof rule === "object" &&
    rule !== null &&
    (rule as RuleSetRule).test instanceof RegExp 
     ) as RuleSetRule;

    if (!fileLoaderRule) {
      throw new Error("SVG rule not found");
    }

    // SVG as URL (?url)
    rules.push({
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/,
    });

    // SVG as React component (SVGR)
    rules.push({
      test: /\.svg$/i,
      issuer: fileLoaderRule.issuer,
      resourceQuery: {
        not: [/url/],
      },
      use: ["@svgr/webpack"],
    } as RuleSetRule);

    // remove svg from default file loader
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
