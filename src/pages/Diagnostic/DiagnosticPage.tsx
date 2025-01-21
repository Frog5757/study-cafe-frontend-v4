/** @jsxImportSource @emotion/react */
import { FC, useState } from "react";
import { Header } from "../../components/layouts/Header";
import { PageTitle } from "../../components/uiparts/title/PageTitle";
import { BodyLayout } from "../../components/layouts/BodyLayout";
import { useSubjects } from "../../hooks/api/useSubjects";
import { useQuestions } from "../../hooks/api/useQuestion";
import { useUnits } from "../../hooks/api/useUnits";
import { UnitMode } from "./UnitMode";
import { QuestionMode } from "./QuestionMode";
import { SubjectMode } from "./SubjectMode";

export const DiagnosticPage: FC = () => {
  const { isLoading: isLoadingSubjects, subjects } = useSubjects();
  const { isLoading: isLoadingUnits, units } = useUnits();
  const { isLoading: isLoadingQuestions, questions } = useQuestions();
  const isLoading = isLoadingSubjects || isLoadingUnits || isLoadingQuestions;
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(
    null
  );
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<
    "subject" | "unit" | "questions"
  >("subject");

  const unitsPerSelectedSubject = units.filter(
    (unit) => unit.subjectId === selectedSubjectId
  );
  const quetionsPerSelectedUnit = questions.filter(
    (question) => question.unitId === selectedUnitId
  );

  return (
    <>
      <Header />
      <PageTitle title="診断テスト" dec="苦手な単元の原因を診断できます" />
      <BodyLayout>
        {isLoading && <>取得中</>}
        {!isLoading && selectedMode === "subject" && (
          <SubjectMode
            subjects={subjects}
            onClickButton={(subjectId) => {
              setSelectedSubjectId(subjectId);
              setSelectedMode("unit");
            }}
          />
        )}
        {!isLoading && selectedMode === "unit" && (
          <UnitMode
            units={unitsPerSelectedSubject}
            onClickButton={(unitId) => {
              setSelectedUnitId(unitId);
              setSelectedMode("questions");
            }}
          />
        )}
        {!isLoading && selectedMode === "questions" && (
          <QuestionMode questions={quetionsPerSelectedUnit} />
        )}
      </BodyLayout>
    </>
  );
};
