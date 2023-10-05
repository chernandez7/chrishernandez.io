import { NextRouter, useRouter } from "next/router";
import Markdown from "react-markdown";
import { getAllBlogPosts, getPageContentBySlug } from "../../lib/markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import inject from "@stylexjs/dev-runtime";
import stylex from "@stylexjs/stylex";

inject({
  // configuration options
  dev: true,
  test: false,
  classNamePrefix: "x-",
  definedStylexCSSVariables: {
    primary: {
      lightMode: "black",
      darkMode: "white",
    },
  },
});

const styles = stylex.create({
  base: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    scrollBehavior: "smooth",
  },
  title: {
    color: "white",
    margin: "16 0",
    fontFamily: "Fira Code Mono",
  },
  post: {
    backgroundColor: "#001000",
    border: "1px solid #ddd",
    marginBottom: "20px",
    padding: "20px",
    borderRadius: "5px",
    fontSize: 18,
    fontFamily: "Fira Code Mono",
  },
  footer: {
    backgroundColor: "#007BFF",
    color: "#fff",
    textAlign: "center",
    padding: "10px",
  },
});

interface BlogParams {
  params: {
    slug: string;
  };
}

export async function getStaticProps({ params }: BlogParams) {
  const { slug } = params;
  const page: {
    title?: string;
    content?: string;
  } = getPageContentBySlug(slug, ["title", "image", "slug", "content", "date"]);
  return {
    props: {
      page: {
        ...page,
        markdown: page.content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts: Array<{ slug?: string }> = getAllBlogPosts(["slug"]);
  const paths = posts.map(({ slug }) => ({
    params: {
      slug,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export default function BlogPage({
  page,
}: {
  page: {
    title: string;
    content: string;
  };
}) {
  const router = new (useRouter as any)();
  return router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <div className={stylex(styles.base)}>
      <h1 className={stylex(styles.title)}>{page.title}</h1>
      <div>
        <div className={stylex(styles.post)}>
          <Markdown
            children={page.content}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  // @ts-ignore-next-line
                  <SyntaxHighlighter
                    {...rest}
                    children={String(children).replace(/\n$/, "")}
                    style={nightOwl}
                    language={match[1]}
                    PreTag="div"
                    showLineNumbers
                    wrapLongLines
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
        <div className={stylex(styles.footer)}>
          <h1 className={stylex(styles.title)}>{page.title}</h1>
        </div>
      </div>
    </div>
  );
}
