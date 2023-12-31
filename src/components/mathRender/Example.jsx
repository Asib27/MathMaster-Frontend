"use client";

import { useState } from "react";

import Latex from "./Latex";

import { RxCross2 } from "react-icons/rx";
import { FiCheck } from "react-icons/fi";
import ProblemContainer from "./ProblemContainer";

const Example = ({
  type = "mcq",
  question,
  options = [],
  correct,
  explanation,
  hint,
}) => {
  const [selected, setSelected] = useState(-1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getState = () => {
    if (isSubmitted) {
      if (correct === selected) return "correct";
      else return "incorrect";
    } else {
      if (selected === -1) return "not selected";
      else return "selected";
    }
  };

  const getBg = (state, i) => {
    if (state === "correct" && i == selected) return " bg-green-50 ";
    else if (state === "incorrect" && i === selected) return " bg-red-50 ";
    else if (state === "incorrect" && i !== selected && i === correct)
      return " bg-green-50 ";
    else if (state === "selected" && i === selected)
      return " bg-blue-gray-100 ";
    else return " bg-blue-gray-50 ";
  };

  const handleSelect = (i) => {
    if (!isSubmitted) {
      setSelected(i);
    }
  };

  const handleSubmission = () => {
    if (!isSubmitted && selected !== -1) setIsSubmitted(true);
  };

  const getRadio = (state, i) => {
    if (state === "correct" && i == selected)
      return " bg-green-500 border-2 border-green-500 ";
    else if (state === "incorrect" && i === selected)
      return " bg-red-500 border-2 border-red-500 ";
    else if (state === "incorrect" && i === correct)
      return " bg-green-500 border-2 border-green-500 ";
    else if (state === "selected" && i === selected)
      return " bg-blue-gray-500 border-2 border-blue-gray-500 ";
    else return " border-2 border-blue-gray-400 ";
  };

  return (
    <ProblemContainer
      hint={hint}
      explanation={explanation}
      handleSubmission={handleSubmission}
    >
      
        <Latex>{question}</Latex>

        {type === "mcq" && (
          <>
            {options.map((option, i) => (
              <div
                className={
                  "flex my-2 px-4 py-1 rounded-md items-center justifuy-between " +
                  getBg(getState(), i)
                }
                key={i}
                onClick={() => handleSelect(i)}
              >
                <label
                  htmlFor={i}
                  data-ripple-dark="false"
                  className="flex items-center justify-left gap-x-3 flex-1 cursor-pointer"
                >
                  <div
                    className={
                      "w-5 h-5 rounded-full " + getRadio(getState(), i)
                    }
                  />
                  <Latex>{option}</Latex>
                </label>
                {i === correct && isSubmitted && (
                  <div className={"text-green-500"}>
                    <FiCheck />
                  </div>
                )}
                {i !== correct && selected === i && isSubmitted && (
                  <div className={"text-red-500"}>
                    <RxCross2 />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      
    </ProblemContainer>
  );
};

export default Example;
