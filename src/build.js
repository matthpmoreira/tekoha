import fs from "fs";
import path from "path";
import mustache from "mustache";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const dirs = {
    templates: path.join(process.cwd(), "src", "templates"),
    content: path.join(process.cwd(), "src", "content"),
    static: path.join(process.cwd(), "src", "static"),
    dist: path.join(process.cwd(), "dist"),
};

// Ensure dist directory exists
if (!fs.existsSync(dirs.dist)) {
    fs.mkdirSync(dirs.dist, { recursive: true });
}

// Compile Markdown articles
const md = new MarkdownIt();

const content = fs.readdirSync(dirs.content, "utf8").map(file => {
    const filePath = path.join(dirs.content, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const parsed = matter(fileContent);
    const compiled = md.render(parsed.content);

    return { title: parsed.data.title, article: compiled };
});

// Generate HTML files from templates
for (const file of fs.readdirSync(dirs.templates)) {
    const pageName = path.basename(file, ".mustache");
    const templatePath = path.join(dirs.templates, file);
    const templateContent = fs.readFileSync(templatePath, "utf8");
    const result = mustache.render(templateContent, { content });

    fs.writeFileSync(path.join(dirs.dist, pageName + ".html"), result);
}

// Copy static assets
fs.cpSync(dirs.static, dirs.dist, { recursive: true });
