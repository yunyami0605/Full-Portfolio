"use client";

import React, { useState } from "react";
import { PageWrapper } from "@/shared/components";
import { useCreatePostApi } from "@/features/post/_hooks/query";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/shared/types/api";
import { isAxiosError } from "@/libs/typeGuard";
import PostForm from "@/features/post/_components/form/PostForm";
import { CreatePostForm, UpdatePostForm } from "@/features/post/_types/data";

/**
 *@description 게시글 등록 페이지
 */
function PostRegisterPage() {
  const router = useRouter();
  const initServerError = {
    title: "",
    content: "",
    common: "",
  };

  const [serverError, setServerError] = useState(initServerError);

  const createPostApi = useCreatePostApi();

  // 게시글 폼 등록 이벤트 핸들러
  const onSubmit = async (data: CreatePostForm | UpdatePostForm) => {
    const _data = data as CreatePostForm;

    try {
      const formData = {
        ..._data,
        imageKeys: _data.imageKeys.map((item) => item.objectKey),
      };
      const res = await createPostApi.mutateAsync(formData);

      if (res.status === 201) {
        router.replace(`/post/${res.data.id}`);
      }
    } catch (error: unknown) {
      if (isAxiosError<ErrorResponse>(error)) {
        const errData = error.response?.data;
        console.log(errData);

        const message = errData?.message ?? "";
        const field = error?.response?.data.field;

        if (field) {
          setServerError({ ...initServerError, [field]: message });
        } else {
          setServerError({ ...initServerError, common: message });
        }
      } else {
        setServerError({ ...initServerError, common: "잘못된 접근입니다." });
      }
    }
  };

  return (
    <PageWrapper withHeader={false}>
      <PostForm serverError={serverError} isPending={false} formType={"등록"} onSubmit={onSubmit} />
    </PageWrapper>
  );
}

export default PostRegisterPage;
