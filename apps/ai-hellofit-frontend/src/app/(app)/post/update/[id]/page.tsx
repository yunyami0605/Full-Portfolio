"use client";

import React, { useState } from "react";
import { PageWrapper } from "@/shared/components";
import { useGetPostFormDataApi, usePatchPostApi } from "@/features/post/_hooks/query";
import { useParams, useRouter } from "next/navigation";
import { ErrorResponse } from "@/shared/types/api";
import { isAxiosError } from "@/libs/typeGuard";
import PostForm from "@/features/post/_components/form/PostForm";
import { CreatePostForm, UpdatePostForm } from "@/features/post/_types/data";

/**
 *@description 게시글 수정 페이지
 */
function UpdateRegisterPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const initServerError = {
    title: "",
    content: "",
    common: "",
  };

  const [serverError, setServerError] = useState(initServerError);

  const getPostFormDataApi = useGetPostFormDataApi(params.id);

  const patchPostApi = usePatchPostApi(params.id);

  // 게시글 폼 수정 이벤트 핸들러
  const onSubmit = async (data: CreatePostForm | UpdatePostForm) => {
    const _data = data as UpdatePostForm;

    try {
      const formData = {
        ..._data,
        imageKeys: (_data.imageKeys ?? []).map((item) => item.objectKey),
      };

      const res = await patchPostApi.mutateAsync(formData);

      if (res.status === 200) {
        router.back();
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
      <PostForm
        defaultForm={getPostFormDataApi.data?.data}
        serverError={serverError}
        isPending={false}
        formType={"수정"}
        onSubmit={onSubmit}
      />
    </PageWrapper>
  );
}

export default UpdateRegisterPage;
