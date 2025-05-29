"use client";

import { cn, configureAssistant } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "@/constants/soundwaves.json";
import Call from "./icons/Call";
import Wave from "./icons/Wave";
import MicOn from "./icons/MicOn";
import MicOff from "./icons/MicOff";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const NeuraComponent = ({
  subject,
  topic,
  voice,
  style,
}: NeuranoteComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);

    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.log(`ERR:${error}`);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handelConnect = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assisatantOverrides = {
      variableValues: {
        subject,
        topic,
        style,
      },
      clientMessages: ["transcript"],
      serverMessages: [],
    };
    //@ts-expect-error
    vapi.start(configureAssistant(voice, style), assisatantOverrides);
  };

  const handelDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);

    vapi.stop();
  };

  return (
    <section className="flex items-center justify-start gap-4 max-xl:flex-col transition-all duration-300">
      <section className="relative group note-section">
        <div className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div
        className={cn(
          "absolute inset-0",
          "[background-size:5px_5px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )}
      />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(circle_at_bottom_right,transparent_60%,black_80%)] dark:bg-black"></div>
        </div>

        <div className="note-avatar bg-gradient-to-br from-white to-[#000000] animate-pulse border shadow-2xl">
          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              callStatus === CallStatus.FINISHED ||
                callStatus === CallStatus.INACTIVE
                ? "opacity-100"
                : "opacity-0",
              callStatus === CallStatus.CONNECTING &&
                "opacity-100 animate-pulse"
            )}
          ></div>
          <div
            className={cn(
              "absolute transition-opacity duration-1000",
              callStatus === CallStatus.ACTIVE ? "opacity-100" : "opacity-0"
            )}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={soundwaves}
              autoplay={false}
              className="note-lottie"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-34 mt-4">
          <div className="relative">
            <button
              className="flex items-center justify-center p-2 w-14 h-14 rounded-full bg-primary cursor-pointer shadow-2xl z-20"
              onClick={toggleMicrophone}
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              {isMuted ? (
                <MicOff className="text-mic" />
              ) : (
                <MicOn className="text-mic" />
              )}
            </button>
            <p className="absolute z-20 top-16 left-1 font-bold">
              {isMuted ? "OffMic" : "OnMic"}
            </p>
          </div>

          <div className="relative">
            <button
              className={cn(
                "flex items-center justify-center p-2 w-14 h-14 rounded-full cursor-pointer shadow-2xl z-20",
                callStatus === CallStatus.ACTIVE ? "bg-red-500 " : "bg-primary",
                callStatus === CallStatus.CONNECTING && "animate-pulse"
              )}
              onClick={
                callStatus === CallStatus.ACTIVE
                  ? handelDisconnect
                  : handelConnect
              }
            >
              {callStatus === CallStatus.ACTIVE ? (
                <Call />
              ) : callStatus === CallStatus.CONNECTING ? (
                <div className="flex items-center justify-center space-x-1">
                  <span className="w-1 h-1 bg-background rounded-full animate-ping"></span>
                  <span className="w-1 h-1 bg-background rounded-full animate-ping delay-150"></span>
                  <span className="w-1 h-1 bg-background rounded-full animate-ping delay-300"></span>
                </div>
              ) : (
                <Wave className="text-background" />
              )}
            </button>
            <p className="absolute z-20 top-16 left-3 font-bold">
              {callStatus === CallStatus.ACTIVE ? "End" : "Start"}
            </p>
          </div>
        </div>
      </section>

      <section className="relative transcript message-section h-[68vh]">
        <div className="transcript-fade" />
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) => {
            if (message.role === "assistant") {
              return (
                <p
                  key={index}
                  className="text-[18px] max-sm:text-sm border-2 border-white bg-[#f4f1f8] shadow-md rounded-md p-1"
                >
                  <span className="font-semibold">Neura:</span>{" "}
                  {message.content}
                </p>
              );
            } else {
              return (
                <p
                  key={index}
                  className="text-[18px] max-sm:text-sm border-2 border-white bg-[#f4f1f8] shadow-md rounded-md p-1"
                >
                  <span className="font-semibold">You:</span> {message.content}
                </p>
              );
            }
          })}
        </div>
      </section>
    </section>
  );
};

export default NeuraComponent;
