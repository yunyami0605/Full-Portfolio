"use client";

import { ImageUrl } from "@/shared/types/base";
import { Center } from "@my/ui";
import Image from "next/image";
import { useState } from "react";
import styles from "./PostImage.module.scss";

type Props = {
  imageUrl: ImageUrl;
  alt?: string;
};

/**
 *@description 게시글 이미지
 */
export default function PostImage({ imageUrl, alt }: Props) {
  if (!imageUrl) return null;

  const [error, setError] = useState(false);

  console.log(error);

  return (
    <Center className={styles.image_wrapper}>
      <Image
        src={error ? "/images/ImagePostImageFallback.svg" : imageUrl}
        alt={`게시글 이미지 ${alt}`}
        fill
        onError={() => setError(true)}
      />
    </Center>
  );
}
