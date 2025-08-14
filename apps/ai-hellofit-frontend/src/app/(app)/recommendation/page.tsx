import styles from "./Recommendation.module.scss";
import React from "react";
import ChoiceRecommendationCardButton from "@/features/recommendation/_components/ChoiceRecommendationCardButton";
import { Center, Text } from "@my/ui";
import { ActiveButton, Card, PageWrapper } from "@/shared/components";

function RecommendationPage() {
  const arr = Array.from({ length: 4 }, (_, i) => ({
    title: `test${i + 1}`,
    data: [1, 2, 3],
  }));

  return (
    <PageWrapper>
      <div className={styles.page_padding}>
        <Card className={styles.card_wrapper}>
          <Center className={styles.card_time}>
            <Text>아침</Text>
          </Center>

          {arr.map((item, i) => (
            <React.Fragment key={i}>
              <ChoiceRecommendationCardButton
                title={item.title}
                data={item.data}
                isChecked={i === 0}
              />
            </React.Fragment>
          ))}

          <ActiveButton name={"다음"} type={"button"} />
        </Card>
      </div>
    </PageWrapper>
  );
}

export default RecommendationPage;
