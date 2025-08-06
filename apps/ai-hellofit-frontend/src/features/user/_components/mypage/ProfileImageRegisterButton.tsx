"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@my/ui";

/**
 *@description 내계정 프로필 이미지 수정버튼
 */
function ProfileImageRegisterButton() {
  return (
    <Button className="profile_image_register_button">
      <Image
        src="/images/ImageProfileImageRegister.png"
        alt="프로필 등록 버튼"
        width={72}
        height={72}
      />
    </Button>
  );
}

export default ProfileImageRegisterButton;
