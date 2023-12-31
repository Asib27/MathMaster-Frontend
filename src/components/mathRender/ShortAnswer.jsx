"use client";

import ProblemContainer from "./ProblemContainer";
import { useState } from "react";

import { Input } from "@material-tailwind/react";

import { RxCross2 } from "react-icons/rx";
import { FiCheck } from "react-icons/fi";
import Latex from "./Latex";

const ShortAnswer = ({
  question,
  correct,
  explanation,
  hint,
  inputType = "text",
}) => {
  const [isCorrect, setIsCorrect] = useState(-1);
  const [answer, setAnswer] = useState();

  const handleSubmission = () => {
    if (!answer) return;

    console.log(answer);

    if (answer == correct) setIsCorrect(1);
    else setIsCorrect(0);
  };

  return (
    <ProblemContainer
      hint={hint}
      explanation={explanation}
      handleSubmission={handleSubmission}
    >
      {question}

      <div className="w-60 mt-8 flex items-center gap-x-2">
        <Input
          label="Answer"
          type={inputType || "number"}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        {isCorrect === 1 && (
          <div
            className={
              "text-green-500 p-3 flex items-center justify-center rounded-md shadow bg-green-50"
            }
          >
            <FiCheck />
          </div>
        )}
        {isCorrect === 0 && (
          <div
            className={
              "text-red-500 p-3 flex items-center justify-center rounded-md shadow bg-red-50"
            }
          >
            <RxCross2 />
          </div>
        )}
      </div>

      {isCorrect === 0 && (
        <div className="flex items-center">
          <p>Correct:&nbsp; </p> <Latex>{correct}</Latex>
        </div>
      )}
    </ProblemContainer>
  );
};

export default ShortAnswer;
