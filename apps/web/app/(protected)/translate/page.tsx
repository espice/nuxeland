"use client";

import PageStyles from "@/styles/shared/page/index.module.scss";
import styles from "./index.module.scss";
import MicIcon from "@/public/mic.svg";
import StopIcon from "@/public/stop.svg";
import Selector from "@/components/Select";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { languages } from "@/utils/languages";

export default function TranslatePage() {
  const [languageFrom, setLanguageFrom] = useState<any>(languages[0]);
  const [languageTo, setLanguageTo] = useState<any>(languages[3]);
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [toTranslate, setToTranslate] = useState("");
  const [synth, setSynth] = useState<SpeechSynthesis>();
  const [translating, setTranslating] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechRecog, setSpeechRecog] = useState<any>();
  const fromTextRef = useRef<HTMLTextAreaElement>(null);
  const fromLangRef = useRef<any>(null);
  const toLangRef = useRef<any>(null);

  const fromRef = useRef(languageFrom);
  const toRef = useRef(languageTo);

  const setTo = (data: any) => {
    toRef.current = data;
    setLanguageTo(data);
  };

  const setFrom = (data: any) => {
    fromRef.current = data;
    setLanguageFrom(data);
  };

  useEffect(() => {
    const SpeechRecognition =
      // @ts-ignore
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    setSpeechRecog(recognition);
  }, []);

  useEffect(() => {
    let speechTimer: any;
    let speechTimeout = 4000;

    let transcript = "";

    const languages = {
      en: "en-US",
      de: "de-DE",
      es: "es-ES",
      fr: "fr-FR",
    };

    if (listening && !!speechRecog) {
      // @ts-ignore
      speechRecog.lang = languages[languageFrom.value];
      speechRecog.interimResults = true;
      speechRecog.continuous = true;
      speechRecog.maxAlternatives = 0;

      speechRecog.onresult = (event: any) => {
        setFromText(event.results[event.results.length - 1][0].transcript);
        transcript = event.results[event.results.length - 1][0].transcript;
        clearTimeout(speechTimer);
        speechTimer = setTimeout(() => {
          setListening(false);
        }, speechTimeout);
      };

      speechRecog.onspeechend = (event: any) => {
        console.log("speech end");
        console.log(transcript);
        translate(transcript);
        setTranslating(false);
      };

      speechRecog.start();
    } else if (!!speechRecog) {
      speechRecog.stop();
    }
  }, [listening]);

  useEffect(() => {
    if (window) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  const speak = (text: string, lang: "en" | "es" | "de" | "fr") => {
    const languages = {
      en: "en-US",
      de: "de-DE",
      es: "es-ES",
      fr: "fr-FR",
    };

    const language = languages[lang];

    console.log("speaking");
    if (!synth) {
      console.log("nooooo");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    let voice = synth.getVoices()[0];

    synth.getVoices().forEach((v) => {
      if (v.lang === language) voice = v;
    });

    utterance.voice = voice;

    console.log(synth.getVoices());
    synth.speak(utterance);
  };

  useEffect(() => {
    let typingTimer: any; //timer identifier
    let doneTypingInterval = 1200; //time in ms (1.2 seconds)
    const type = () => {
      // setToTranslate("");
      clearTimeout(typingTimer);
      if (
        fromTextRef.current?.value !== "" ||
        fromTextRef.current?.value.trim() !== ""
      ) {
        typingTimer = setTimeout(() => {
          console.log("timeout");
          translate(fromTextRef.current!.value);
        }, doneTypingInterval);
      } else {
        setToTranslate("");
      }
    };
    if (!!fromTextRef.current) {
      fromTextRef.current.addEventListener("keyup", type);
    }

    return () => {
      fromTextRef.current?.removeEventListener("keyup", type);
    };
  }, [fromTextRef.current]);

  const translate = async (input: string) => {
    let languageFrom = fromRef.current;
    let languageTo = toRef.current;
    console.log("translating");
    console.log(languageFrom, languageTo, "kyu");
    console.log(input, translating);
    if (translating) {
      return;
    }

    if (input.trim().length < 1) {
      setTranslating(false);
      setToText("");
      return;
    }

    setTranslating(true);
    setToText("");

    console.log(languageFrom.value, "from", languageTo.value, "to");

    let res = await axios.post(
      "https://translate.terraprint.co/translate",
      {
        q: input + ".",
        source: languageFrom.value,
        target: languageTo.value,
        format: "text",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res.data);

    setToText(res.data.translatedText);
    setTranslating(false);
  };

  useEffect(() => {
    console.log("sf");
    if (!languageFrom || !languageTo) return;
    console.log(languageFrom, languageTo, "hello");
    if (languageFrom === languageTo) {
      console.log("equal");
      let arrWithoutFrom = languages.filter(
        (lang) => lang.value !== languageFrom.value
      );
      setTo(arrWithoutFrom[0]);
    }
    console.log(languageFrom, languageTo, "helloooo");
  }, [languageFrom, languageTo]);

  if (languageFrom && languageTo)
    return (
      <div className={PageStyles.main}>
        <div className={PageStyles.main__title} style={{ color: "#348CB4" }}>
          Translate
        </div>

        <div className={PageStyles.main__section}>
          <div className={PageStyles.main__section__content}>
            <div className={styles.yash__container}>
              <Selector
                options={languages}
                value={languageFrom}
                setValue={(value: any) => {
                  setFrom(value);
                  setFromText("");
                  setToText("");
                }}
                defaultValue={languages[0]}
                ref={fromLangRef}
              />
              <div
                className={styles.yash__container__switcher}
                onClick={() => {
                  let temp = languageFrom;
                  console.log(languageFrom, "jai hanuman");
                  setFrom(languageTo);
                  setTo(temp);
                  setFromText("");
                  setToText("");
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_63_4)">
                    <path
                      d="M13.3334 2.5L16.6667 5.83333L13.3334 9.16667"
                      stroke="#348CB4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M8.33337 5.83337H16.6667"
                      stroke="#348CB4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.66671 10.8334L3.33337 14.1667L6.66671 17.5"
                      stroke="#348CB4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.33337 14.1666H10.8334"
                      stroke="#348CB4"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_63_4">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <Selector
                options={languages}
                value={languageTo}
                ref={toLangRef}
                setValue={(value: any) => {
                  console.log(value, "bhai sahab");
                  setTo(value);
                  setFromText("");
                  setToText("");
                }}
                defaultValue={languages[1]}
              />
            </div>
          </div>

          <div className={PageStyles.main__section__content}>
            <div className={styles.languageContainer}>
              <div className={styles.languageContainer__title}>
                {languageFrom.label.toUpperCase()}
              </div>

              <textarea
                ref={fromTextRef}
                className={styles.languageContainer__input}
                placeholder="Type here..."
                value={fromText}
                onChange={(e) => {
                  console.log(e.target.value);
                  setFromText(e.target.value);
                }}
              ></textarea>

              <div className={styles.languageContainer__separator} />

              <div className={styles.languageContainer__icons}>
                <div className={styles.languageContainer__icons__icon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_81_11)">
                      <path
                        d="M6.66663 8.33335C6.66663 7.89133 6.84222 7.4674 7.15478 7.15484C7.46734 6.84228 7.89127 6.66669 8.33329 6.66669H15C15.442 6.66669 15.8659 6.84228 16.1785 7.15484C16.491 7.4674 16.6666 7.89133 16.6666 8.33335V15C16.6666 15.442 16.491 15.866 16.1785 16.1785C15.8659 16.4911 15.442 16.6667 15 16.6667H8.33329C7.89127 16.6667 7.46734 16.4911 7.15478 16.1785C6.84222 15.866 6.66663 15.442 6.66663 15V8.33335Z"
                        stroke="#7A7A7A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.3334 6.66665V4.99998C13.3334 4.55795 13.1578 4.13403 12.8452 3.82147C12.5327 3.50891 12.1087 3.33331 11.6667 3.33331H5.00004C4.55801 3.33331 4.13409 3.50891 3.82153 3.82147C3.50897 4.13403 3.33337 4.55795 3.33337 4.99998V11.6666C3.33337 12.1087 3.50897 12.5326 3.82153 12.8452C4.13409 13.1577 4.55801 13.3333 5.00004 13.3333H6.66671"
                        stroke="#7A7A7A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_81_11">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div
                  className={styles.languageContainer__icons__icon}
                  onClick={() => {
                    speak(fromText, languageFrom.value);
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_81_7)">
                      <path
                        d="M12.5 6.66669C13.0175 7.0548 13.4375 7.55807 13.7268 8.13663C14.0161 8.71519 14.1667 9.35317 14.1667 10C14.1667 10.6469 14.0161 11.2848 13.7268 11.8634C13.4375 12.442 13.0175 12.9452 12.5 13.3334"
                        stroke="#7A7A7A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5 12.5H3.33333C3.11232 12.5 2.90036 12.4122 2.74408 12.2559C2.5878 12.0996 2.5 11.8877 2.5 11.6667V8.33333C2.5 8.11232 2.5878 7.90036 2.74408 7.74408C2.90036 7.5878 3.11232 7.5 3.33333 7.5H5L7.91667 3.75C7.9895 3.60852 8.11054 3.49777 8.25791 3.43774C8.40528 3.37772 8.56925 3.37238 8.72021 3.4227C8.87117 3.47302 8.99915 3.57567 9.08103 3.71211C9.16291 3.84856 9.19328 4.00978 9.16667 4.16666V15.8333C9.19328 15.9902 9.16291 16.1514 9.08103 16.2879C8.99915 16.4243 8.87117 16.527 8.72021 16.5773C8.56925 16.6276 8.40528 16.6223 8.25791 16.5623C8.11054 16.5022 7.9895 16.3915 7.91667 16.25L5 12.5Z"
                        stroke="#7A7A7A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_81_7">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            <div className={styles.languageContainer}>
              <div className={styles.languageContainer__title}>
                {languageTo.label.toUpperCase()}
              </div>

              <textarea
                className={styles.languageContainer__input}
                placeholder={translating ? "Translating..." : "Translated text"}
                disabled
                value={translating ? "Translating..." : toText}
              ></textarea>

              <div className={styles.languageContainer__separator} />

              <div className={styles.languageContainer__icons}>
                <div className={styles.languageContainer__icons__icon}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_81_11)">
                      <path
                        d="M6.66663 8.33335C6.66663 7.89133 6.84222 7.4674 7.15478 7.15484C7.46734 6.84228 7.89127 6.66669 8.33329 6.66669H15C15.442 6.66669 15.8659 6.84228 16.1785 7.15484C16.491 7.4674 16.6666 7.89133 16.6666 8.33335V15C16.6666 15.442 16.491 15.866 16.1785 16.1785C15.8659 16.4911 15.442 16.6667 15 16.6667H8.33329C7.89127 16.6667 7.46734 16.4911 7.15478 16.1785C6.84222 15.866 6.66663 15.442 6.66663 15V8.33335Z"
                        stroke="#7A7A7A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.3334 6.66665V4.99998C13.3334 4.55795 13.1578 4.13403 12.8452 3.82147C12.5327 3.50891 12.1087 3.33331 11.6667 3.33331H5.00004C4.55801 3.33331 4.13409 3.50891 3.82153 3.82147C3.50897 4.13403 3.33337 4.55795 3.33337 4.99998V11.6666C3.33337 12.1087 3.50897 12.5326 3.82153 12.8452C4.13409 13.1577 4.55801 13.3333 5.00004 13.3333H6.66671"
                        stroke="#7A7A7A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_81_11">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div className={styles.languageContainer__icons__icon}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      speak(toText, languageTo.value);
                    }}
                  >
                    <g clip-path="url(#clip0_81_7)">
                      <path
                        d="M12.5 6.66669C13.0175 7.0548 13.4375 7.55807 13.7268 8.13663C14.0161 8.71519 14.1667 9.35317 14.1667 10C14.1667 10.6469 14.0161 11.2848 13.7268 11.8634C13.4375 12.442 13.0175 12.9452 12.5 13.3334"
                        stroke="#7A7A7A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5 12.5H3.33333C3.11232 12.5 2.90036 12.4122 2.74408 12.2559C2.5878 12.0996 2.5 11.8877 2.5 11.6667V8.33333C2.5 8.11232 2.5878 7.90036 2.74408 7.74408C2.90036 7.5878 3.11232 7.5 3.33333 7.5H5L7.91667 3.75C7.9895 3.60852 8.11054 3.49777 8.25791 3.43774C8.40528 3.37772 8.56925 3.37238 8.72021 3.4227C8.87117 3.47302 8.99915 3.57567 9.08103 3.71211C9.16291 3.84856 9.19328 4.00978 9.16667 4.16666V15.8333C9.19328 15.9902 9.16291 16.1514 9.08103 16.2879C8.99915 16.4243 8.87117 16.527 8.72021 16.5773C8.56925 16.6276 8.40528 16.6223 8.25791 16.5623C8.11054 16.5022 7.9895 16.3915 7.91667 16.25L5 12.5Z"
                        stroke="#7A7A7A"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_81_7">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className={styles.mic_button}
          onClick={() => {
            setListening(!listening);
          }}
        >
          {listening ? <StopIcon /> : <MicIcon />}
        </button>
      </div>
    );
}
