import React from "react";
import styles from "./ImageUploadField.module.scss";
import { IconButton } from "@/shared/components";
import { usePostAwsS3PresignedApi } from "@/features/aws/_hooks/mutation";
import axios from "axios";
type Props = {
  value: { url: string; presignedGetUrl: string }[];
  onChange: (urls: {}[]) => void;
};

/**
 *@description 이미지 업로드 필드 + preview
 */
export function ImageUploadField({ value = [], onChange }: Props) {
  const postAwsS3Presigned = usePostAwsS3PresignedApi();

  const onImageUpload = async (files: FileList) => {
    const fileUrl = Array.from(files).map(async (file) => {
      // 1. 서버에 presigned url 요청
      const presignedResponse = await postAwsS3Presigned.mutateAsync({
        fileName: file.name,
        fileType: file.type,
      });

      // 2. 응답받은 presigned url로 s3에 업로드 요청
      await axios.put(presignedResponse.data.presignedPatchUrl, file, {
        headers: { "Content-Type": file.type },
        withCredentials: false,
      });

      return {
        url: presignedResponse.data.savedFileUrl,
        presignedGetUrl: presignedResponse.data.presignedGetUrl,
      };
    });

    const uploadedUrls = await Promise.all(fileUrl);
    onChange([...value, ...uploadedUrls]);
  };

  const onRemove = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  return (
    <div className={styles.image_upload}>
      {/* 업로드 버튼 */}
      <label htmlFor="images">이미지 업로드</label>
      <input
        id="images"
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => e.target.files && onImageUpload(e.target.files)}
      />

      {/* 미리보기 */}
      <div className={styles.preview_images_wrapper}>
        {value.map((url, idx) => (
          <div key={idx} className={styles.preview_item}>
            <img src={url.presignedGetUrl} alt={`preview-${idx}`} />
            <button type="button" className={styles.remove_btn} onClick={() => onRemove(idx)}>
              <IconButton iconName="Close" fill="#fff" disabled size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
