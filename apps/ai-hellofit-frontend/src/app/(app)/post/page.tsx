import React from "react";
import PostList from "@/features/post/_components/list/PostList";
import { getPostsServerApi } from "@/features/post/_apis/postServer.api";

export const revalidate = 60;
export const dynamic = "force-static";

/**
 *@description 게시글 목록 페이지
 */
async function PostsPage() {
  const posts = await getPostsServerApi();
  return <PostList initialPosts={posts} />;
}

export default PostsPage;
