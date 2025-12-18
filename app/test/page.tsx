// app/test/page.tsx
import { client } from '@/lib/sanity.client'
import Link from 'next/link'

// A query to get ALL posts (no $slug variable)
const allPostsQuery = `*[_type == "post"]{
  _id,
  title,
  "slug": slug.current 
}`

// This page doesn't receive 'params' with a slug
export default async function TestPage() {

export const metadata = {
  robots: { index: false, follow: false },
};

  
  // Fetch the query. Notice the 2nd argument (the params object) is removed.
  const posts = await client.fetch(allPostsQuery)

  return (
    <div>
      <h1>All Blog Posts</h1>
      <ul>
        {posts?.map((post: any) => (
          <li key={post._id}>
            {/* Link to the dynamic page (which you'll build in Solution 1) */}
            <Link href={`/test/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}