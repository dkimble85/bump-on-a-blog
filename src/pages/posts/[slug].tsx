import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { type GetStaticPaths, type GetStaticProps } from "next";
import {
  type BlogPostFrontmatter,
  findAllPostSlugs,
  loadMdxFromSlug,
} from "../../utils";
import Link from "next/link";

type BlogPostProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: BlogPostFrontmatter;
};
export default function BlogPost({ source, frontMatter }: BlogPostProps) {
  console.log(frontMatter);
  return (
    <div className="p-4">
      <div className="m-4">
        <div className="prose prose-invert h-full w-full p-5 ">
          <h1 className="text-2xl font-bold">{frontMatter.title}</h1>
          <h2 className="text-xl">{frontMatter.description}</h2>
          <div className="mt-3">
            <MDXRemote {...source} />
          </div>
        </div>
        <div className="ml-4">
          <button className="rounded-md bg-orange-400 pb-1 pl-3 pr-3 pt-1">
            <Link href="/">Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, data } = await loadMdxFromSlug(params?.slug as string);
  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await findAllPostSlugs();
  console.log(slugs);
  return {
    paths: slugs.map((slug) => {
      return { params: { slug } };
    }),
    fallback: false, // false or 'blocking'
  };
};
