import { useRouter } from "next/router";
import Markdown from "react-markdown";
import { getAllBlogPosts, getPageContentBySlug } from "../../lib/markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";

export async function getStaticProps({ params }) {
  const { slug } = params;
  const page = getPageContentBySlug(slug, [
    "title",
    "image",
    "slug",
    "content",
    "date",
  ]);
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
  const posts = getAllBlogPosts(["slug"]);
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

export default function BlogPage({ page }) {
  const router = new useRouter();
  return router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>{page.title}</h1>
      <div>
        <div>
          <Markdown
            children={page.content}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    children={String(children).replace(/\n$/, "")}
                    style={dark}
                    language={match[1]}
                    PreTag="div"
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
      </div>
    </div>
  );
}
