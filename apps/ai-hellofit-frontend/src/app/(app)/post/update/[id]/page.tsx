"use client";

import React, { useState } from "react";
import { PageWrapper } from "@/shared/components";
import { CreatePostBody, UpdatePostBody } from "@/features/post/_types/body";
import { useGetPostOneApi, usePatchPostApi } from "@/features/post/_hooks/query";
import { useParams, useRouter } from "next/navigation";
import { ErrorResponse } from "@/shared/types/api";
import { isAxiosError } from "@/libs/typeGuard";
import PostForm from "@/features/post/_components/form/PostForm";

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

  const getPostOneApi = useGetPostOneApi(params.id);

  const patchPostApi = usePatchPostApi(params.id);

  // 게시글 폼 수정 이벤트 핸들러
  const onSubmit = async (data: CreatePostBody | UpdatePostBody) => {
    const _data = data as UpdatePostBody;

    try {
      const res = await patchPostApi.mutateAsync(_data);

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
        defaultForm={getPostOneApi.data?.data}
        serverError={serverError}
        isPending={false}
        formType={"수정"}
        onSubmit={onSubmit}
      />
    </PageWrapper>
  );
}

export default UpdateRegisterPage;
