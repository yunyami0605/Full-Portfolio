import styles from "./PostForm.module.scss";
import React, { useEffect } from "react";
import { ActiveButton, LabeledInput } from "@/shared/components";
import { Column } from "@my/ui";
import { LabeledTextarea } from "@/shared/components/input/LabeledTextarea";
import { ErrorLabel } from "@/shared/components/label/ErrorLabel";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostBody, UpdatePostBody } from "../../_types/body";
import { createPostSchema, updatePostSchema } from "../../_schemas/post.schemas";
import { PostItem } from "../../_types/data";
import { ImageUploadField } from "@/features/aws/_components/ImageUploadField";

type Props = {
  onSubmit: SubmitHandler<CreatePostBody | UpdatePostBody>;
  serverError: { title: string; content: string; common: string };
  isPending: boolean;
  formType: "등록" | "수정";
  defaultForm?: PostItem;
};

/**
 *@description 게시글 폼
 */
function PostForm({ onSubmit, serverError, isPending, formType, defaultForm }: Props) {
  const initForm: CreatePostBody = {
    title: "",
    content: "",
    images: [],
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid },
    control,
  } = useForm({
    resolver: zodResolver(formType === "수정" ? updatePostSchema : createPostSchema),
    mode: "onSubmit",
    defaultValues: initForm,
  });

  useEffect(() => {
    if (defaultForm) {
      reset({
        title: defaultForm.title,
        content: defaultForm.content,
        images: defaultForm.images,
      });
    }
  }, [defaultForm, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Column className={styles.form_wrapper}>
        <LabeledInput
          id={"title"}
          label="제목"
          placeholder="제목"
          required
          error={serverError["title"]}
          {...register("title")}
        />
        <LabeledTextarea
          id={"content"}
          label="내용"
          placeholder="내용"
          required
          error={serverError["content"]}
          {...register("content")}
        />

        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ImageUploadField value={field.value ?? []} onChange={field.onChange} />
          )}
        />

        <Column className={styles.button_wrapper} align="center">
          <ErrorLabel>{serverError["common"]}</ErrorLabel>

          <ActiveButton
            name={isPending ? `${formType}중` : formType}
            type={"submit"}
            activeType={isValid ? "positive" : "disabled"}
          />
        </Column>
      </Column>
    </form>
  );
}

export default PostForm;
