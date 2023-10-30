"use client"

import PageStyles from "@/styles/shared/page/index.module.scss";
import styles from "./index.module.scss";
import Select from "react-select";
import Selector from "@/components/Select";
import {useState} from "react"

import { languages } from "@/utils/languages";

export default function TranslatePage() {
  const [languageFrom, setLanguageFrom] = useState("sw");
  const [languageTo, setLanguageTo] = useState("en")

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
              setValue={(value:any)=>{
                console.log(value.value, languageTo)
                if(value.value == languageTo){
                  let arr = languages.filter(item => item !== value)
                  
                  console.log(arr)
                  setLanguageTo(arr[0].value)
                  
                }

                setLanguageFrom(value.value)
              }}
              
            />
            <div className={styles.yash__container__switcher} onClick={()=>{
              let temp = languageFrom;
              setLanguageFrom(languageTo);
              setLanguageTo(temp);
            }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_63_4)">
<path d="M13.3334 2.5L16.6667 5.83333L13.3334 9.16667" stroke="#348CB4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.33337 5.83337H16.6667" stroke="#348CB4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.66671 10.8334L3.33337 14.1667L6.66671 17.5" stroke="#348CB4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.33337 14.1666H10.8334" stroke="#348CB4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_63_4">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

            </div>
            <Selector
              options={languages}
              value={languageTo}
              setValue={(value:any)=>{
                console.log(value)
                if(value.value==languageFrom){
                  let arr = languages.filter(item => item !== value)
                  console.log(arr)
                  setLanguageFrom(arr[0].value)
                }

                setLanguageTo(value.value)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
