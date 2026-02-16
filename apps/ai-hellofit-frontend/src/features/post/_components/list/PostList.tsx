"use client";

import styles from "./PostList.module.scss";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import { PageWrapper } from "@/shared/components";
import { Column } from "@my/ui";
import PostItemComponent from "@/features/post/_components/item/PostItem";
import { useGetPostsApi } from "@/features/post/_hooks/query";
import { useRouter } from "next/navigation";
import RegisterButton from "@/features/post/_components/buttons/RegisterButton";
import { Cursor } from "@/shared/types/api";
import { GetPostsResponse } from "../../_types/response";

// 기본 아이템 높이 (충분히 큰 값으로 설정하여 초기 렌더링 시 겹침 방지)
const DEFAULT_ITEM_HEIGHT = 600;

type Props = {
  initialPosts: Cursor<GetPostsResponse>;
};

/**
 *@description 게시글 목록 페이지 > 게시글 목록 (가상 스크롤)
 */
function PostList({ initialPosts }: Props) {
  const router = useRouter();
  const listRef = useRef<VariableSizeList>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [itemHeights, setItemHeights] = useState<Map<number, number>>(new Map());

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPostsApi(10, initialPosts);

  const fetchNextPageRef = useRef(fetchNextPage);
  const hasNextPageRef = useRef(hasNextPage);
  const isFetchingNextPageRef = useRef(isFetchingNextPage);

  fetchNextPageRef.current = fetchNextPage;
  hasNextPageRef.current = hasNextPage;
  isFetchingNextPageRef.current = isFetchingNextPage;

  const posts = data?.pages.flatMap((page) => page.items) ?? [];

  // ResizeObserver 인스턴스 관리
  const resizeObserversRef = useRef<Map<number, ResizeObserver>>(new Map());

  // 아이템 높이 측정 함수
  const measureItem = useCallback((index: number, element: HTMLDivElement | null) => {
    if (!element) {
      // ref가 해제될 때 처리
      itemRefs.current.delete(index);
      const observer = resizeObserversRef.current.get(index);
      if (observer) {
        observer.disconnect();
        resizeObserversRef.current.delete(index);
      }
      return;
    }

    itemRefs.current.set(index, element);

    // 높이 측정 함수
    const measureHeight = () => {
      // scrollHeight를 사용하여 더 정확한 높이 측정
      const height = Math.max(
        element.scrollHeight,
        element.getBoundingClientRect().height,
        element.offsetHeight,
      );

      if (height > 0) {
        setItemHeights((prev) => {
          const newMap = new Map(prev);
          const oldHeight = newMap.get(index);

          // 높이가 변경되었을 때만 업데이트
          if (oldHeight !== height && height > 0) {
            newMap.set(index, height);
            // 리스트 재계산 (즉시 실행)
            setTimeout(() => {
              listRef.current?.resetAfterIndex(index, false);
            }, 0);
            return newMap;
          }

          return prev;
        });
      }
    };

    // 즉시 측정 (여러 번 시도)
    measureHeight();

    // 다음 프레임에서도 측정 (레이아웃 완료 후)
    requestAnimationFrame(() => {
      measureHeight();
    });

    // 이미지 로딩 등을 고려하여 추가 측정
    const images = element.querySelectorAll("img");
    images.forEach((img) => {
      if (!img.complete) {
        img.onload = () => {
          measureHeight();
          // 이미지 로딩 후에도 한 번 더 확인
          setTimeout(measureHeight, 100);
        };
      } else {
        // 이미 로드된 이미지도 한 번 더 확인
        setTimeout(measureHeight, 0);
      }
    });

    // 기존 ResizeObserver가 있으면 제거
    const existingObserver = resizeObserversRef.current.get(index);
    if (existingObserver) {
      existingObserver.disconnect();
    }

    // ResizeObserver로 높이 변경 감지
    const resizeObserver = new ResizeObserver(() => {
      measureHeight();
    });
    resizeObserver.observe(element);
    resizeObserversRef.current.set(index, resizeObserver);
  }, []);

  // 각 아이템의 높이를 반환하는 함수
  const getItemSize = useCallback(
    (index: number) => {
      // 로딩 행
      if (index >= posts.length) {
        return 60;
      }

      // 캐시된 높이가 있으면 사용
      const cachedHeight = itemHeights.get(index);
      if (cachedHeight && cachedHeight > 0) {
        return cachedHeight;
      }

      // 없으면 기본 높이 사용 (초기 렌더링용)
      return DEFAULT_ITEM_HEIGHT;
    },
    [posts.length, itemHeights],
  );

  // posts가 변경되면 새로운 아이템의 높이를 초기화
  useEffect(() => {
    setItemHeights((prev) => {
      const newMap = new Map(prev);
      // 기존 posts.length보다 작아진 경우 (필터링 등) 캐시 정리
      posts.forEach((_, index) => {
        if (!newMap.has(index)) {
          // 새 아이템은 나중에 측정될 때까지 기본값 사용
        }
      });
      return newMap;
    });
  }, [posts.length]);

  // 게시글 페이지 이동
  const onMoveContent = useCallback(
    (id: string) => {
      router.push(`/post/${id}`);
    },
    [router],
  );

  const onItemsRendered = useCallback(
    ({ visibleStopIndex }: { visibleStopIndex: number }) => {
      // 마지막에서 3개 전에 미리 가져오기 (사용자가 로딩 화면을 보지 않도록)
      const threshold = Math.max(0, posts.length - 3);
      if (
        visibleStopIndex >= threshold &&
        hasNextPageRef.current &&
        !isFetchingNextPageRef.current
      ) {
        fetchNextPageRef.current();
      }
    },
    [posts.length],
  );

  // posts를 ref로 관리하여 Row 재생성 방지
  const postsRef = useRef(posts);
  postsRef.current = posts;

  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const currentPosts = postsRef.current;
      
      if (index >= currentPosts.length) {
        // 다음 페이지가 없으면 로딩 행을 표시하지 않음
        if (!hasNextPageRef.current) return null;

        return (
          <div
            style={{
              ...(style as React.CSSProperties),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isFetchingNextPageRef.current ? "로딩 중..." : null}
          </div>
        );
      }

      const item = currentPosts[index];
      return (
        <div
          ref={(el) => {
            if (el) {
              measureItem(index, el);
            }
          }}
          style={style as React.CSSProperties}
        >
          <PostItemComponent key={item.id} onClick={onMoveContent} {...item} />
        </div>
      );
    },
    [onMoveContent, measureItem],
  );

  return (
    <PageWrapper withHeader={false}>
      <Column className={styles.posts_container}>
        <VariableSizeList
          ref={listRef}
          height={typeof window !== "undefined" ? window.innerHeight - 100 : 700}
          itemCount={posts.length + (hasNextPage ? 1 : 0)}
          itemSize={getItemSize}
          width="100%"
          onItemsRendered={onItemsRendered}
          overscanCount={2}
          estimatedItemSize={DEFAULT_ITEM_HEIGHT}
        >
          {Row}
        </VariableSizeList>
      </Column>

      <RegisterButton />
    </PageWrapper>
  );
}

export default PostList;
