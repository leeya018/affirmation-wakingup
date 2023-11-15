import React, { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import Image from "next/image";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { LiaStopCircle } from "react-icons/lia";
import useSound from "hooks/useSound";
import Timer from "./Timer";
import SuccessModal from "./modal/message/success";
import { addPracticeApi } from "api";
import SuccessButton from "ui/button/modal/success";
import { modalStore } from "mobx/modalStore";
import { modals } from "@/util";
const timeLimAudio = 1800;

const EModalType = {
  success: "success",
  basic: "basic",
  none: "none",
};

export default function RightNav({ affirmations }) {
  const { stopSound, playSound, sound } = useSound("./Teeth_suggestion.mp3");
  const [timeAudio, setTimeAudio] = useState(0);
  const [currModal, setCurrModal] = useState(EModalType.none);

  useEffect(() => {
    if (timeAudio >= timeLimAudio) {
      stopSound();
    }
  }, [timeAudio]);

  const playSuggestion = () => {
    playSound();
    setTimeAudio(1);
  };
  // console.log(affirmations.length - (affirmations.length % 10) || 10);
  return (
    <div className="  w-[45vw] rounded-xl h-[85vh] flex flex-col items-center gap-4">
      <SuccessButton
        onClick={async () => {
          modalStore.openModal(modals.success_message);
        }}
      >
        Done
      </SuccessButton>
      {
        <SuccessModal
          isVisble={EModalType.success === currModal}
          message={"You finish the voice"}
          onClick={() => addPracticeApi({ voice: 0, type: 1 })}
        />
      }
      <div className="p-6 bg-white w-full rounded-xl h-[10rem] flex items-center justify-around text-lg font-bold">
        <div className="flex justify-center items-center gap-2">
          <BiTime size={30} onClick={playSuggestion} />
          <Timer
            time={timeAudio}
            setTime={setTimeAudio}
            stop={timeAudio >= timeLimAudio}
          />
        </div>
        <div>affirmation name</div>
        {sound.playing() ? (
          <LiaStopCircle
            size={30}
            className="cursor-pointer text-[#CFCFD0]"
            onClick={stopSound}
          />
        ) : (
          <AiOutlinePlayCircle
            size={30}
            onClick={playSuggestion}
            className="cursor-pointer text-[#7ED5FE]"
          />
        )}
      </div>

      <div className="p-6 bg-white w-full rounded-xl h-full flex justify-center items-center">
        <Image
          alt="profile image"
          width={500}
          height={500}
          className={`rounded-lg opacity-${
            affirmations.length - (affirmations.length % 10) || 10
          } 
     
           `}
          src={"/smile.png"}
        />
      </div>
    </div>
  );
}
