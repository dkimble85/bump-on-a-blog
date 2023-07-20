import Head from "next/head";
import { type GetStaticProps } from "next";
import {
  type BlogPostFrontmatter,
  findAllPostSlugs,
  loadMdxFromSlug,
} from "../utils";
import Link from "next/link";
type HomeProps = {
  posts: { slug: string; data: BlogPostFrontmatter }[];
};

function PostListItem({ slug, data }: HomeProps["posts"][number]) {
  const { title, description } = data;
  return (
    <Link href={`/posts/${slug}`}>
      <div className="card rounded-md border border-black p-5">
        <div className="text-2xl font-bold">{title}</div>
        <div>{description}</div>
      </div>
    </Link>
  );
}
export default function Home({ posts }: HomeProps) {
  console.log(posts);
  posts.sort((a, b) => {
    return (
      new Date(b.data.publishedAt).getDate() -
      new Date(a.data.publishedAt).getDate()
    );
  });
  return (
    <div className="min-h-screen w-full">
      <Head>
        <title>Bump on a Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-2 mt-2 p-6">
        Welcome to the Bump on a Blog. The goal of this blog was to push me to
        learn new tech while dabbling a little in journaling. I suspect topics
        will range from sports, video games, personal experiences, and maybe
        even some cooking recipes.
      </div>
      <div className="ml-8 mr-8 grid grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostListItem key={post.data.title} {...post} />
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // MDX text - can be from a local file, database, anywhere
  const allSlugs = await findAllPostSlugs();
  const allSources = await Promise.all(
    allSlugs.map(async (slug) => {
      const source = await loadMdxFromSlug(slug as string);
      return { slug, source };
    })
  );

  //We only want the slug and the frontmatter
  const posts = allSources.map(({ slug, source }) => {
    return { slug, data: source.data };
  });

  return {
    props: {
      posts,
    },
  };
};
