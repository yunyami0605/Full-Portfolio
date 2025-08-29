/**
 *@description 게시글 폼 테스트
 */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PostForm from "../_components/form/PostForm";
import { CreatePostBody } from "../_types/body";
import { TestSetupWithQueryClient } from "@/shared/test/TestSetupWithQueryClient";

describe("PostForm test", () => {
  it("제목과 내용을 입력하고 제출하면 onSubmit이 호출된다", async () => {
    const mockOnSubmit = vi.fn();

    render(
      <TestSetupWithQueryClient
        ui={
          <PostForm
            onSubmit={mockOnSubmit}
            serverError={{
              title: "",
              content: "",
              common: "",
            }}
            isPending={false}
            formType="등록"
          />
        }
      />,
    );

    // 제목, 내용 입력
    fireEvent.change(screen.getByLabelText(/제목/), {
      target: { value: "테스트 제목" },
    });
    fireEvent.change(screen.getByLabelText(/내용/), {
      target: { value: "테스트 내용" },
    });

    // 제출 버튼 클릭
    fireEvent.click(screen.getByRole("button", { name: "등록" }));

    // onSubmit이 올바른 값으로 호출되었는지 검증
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining<CreatePostBody>({
          title: "테스트 제목",
          content: "테스트 내용",
          images: [],
        }),
        expect.anything(), // react-hook-form이 두 번째 인자로 event를 넘겨줌
      );
    });
  });
});
