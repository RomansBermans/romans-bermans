import { feedPlugin } from "@11ty/eleventy-plugin-rss";

const site = {
  name: "Roman(s) Bermans",
  author: "Roman(s) Bermans",
  url: "https://romans.bermans.cc",
};

export default function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", site);

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/writing/**/images/**");

  eleventyConfig.addCollection("article", (api) =>
    api.getFilteredByGlob("src/writing/*/index.md").filter((p) => !p.data.draft),
  );

  eleventyConfig.addFilter("readableDate", (d) =>
    d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  );

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "article", limit: 0 },
    metadata: {
      language: "en",
      title: site.name,
      subtitle: "Writing",
      base: site.url + "/",
      author: { name: site.author },
    },
  });

  return {
    dir: { input: "src", output: "site", includes: "includes" },
    markdownTemplateEngine: false,
    templateFormats: ["md", "njk"],
  };
}
