import React from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import styles from "./tutorial.module.css"

function TutorialPage(props) {
  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className="text-2xl text-center">{props.tutorial.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: props.tutorial.content }}
          className={styles.content}
        ></div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const fs = require("fs");
  const matter = require("gray-matter");

  const slug = context.params.slug;
  const path = `${process.cwd()}/contents/${slug}.md`;

  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  const { data, content } = matter(rawContent);

  let result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .process(content);
  
  result = result.toString().replace(/\<!-- OPEN -->/g, "<section>")
  result = result.toString().replace(/\<!-- CLOSE -->/g, "</section>")

  return {
    props: {
      tutorial: {
        ...data,
        content: result.toString(),
      },
    },
  };
}

export async function getStaticPaths(context) {
  const fs = require("fs");

  const path = `${process.cwd()}/contents`;
  const files = fs.readdirSync(path, "utf-8");

  const markdownFileNames = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => fn.replace(".md", ""));

  return {
    paths: markdownFileNames.map((fileName) => {
      return {
        params: {
          slug: fileName,
        },
      };
    }),
    fallback: false,
  };
}

export default TutorialPage;