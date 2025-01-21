/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BodyMainTitle } from "../../components/uiparts/title/BodyMainTitle";
import { FC } from "react";
import { Unit } from "../../hooks/api/useUnits";
import { IconButton } from "../../components/uiparts/button/IconButton";
export const UnitMode: FC<{
  units: Unit[];
  onClickButton: (unitId: string) => void;
}> = ({ units, onClickButton }) => {
  const mainTitle = "単元を選択してください";
  return (
    <>
      <BodyMainTitle title={mainTitle} />
      <div css={buttonsWrapper}>
        {units.map((unit) => {
          return (
            <IconButton
              key={unit.id}
              label={unit.name}
              bgColor={"#c1c1c1"}
              onClick={() => onClickButton(unit.id)}
            />
          );
        })}
      </div>
    </>
  );
};

const buttonsWrapper = css`
  display: flex;
  justify-content: center;
  gap: 80px;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    gap: 40px;
    justify-content: center;
  }
  @media (max-width: 480px) {
    gap: 20px;
  }
`;
