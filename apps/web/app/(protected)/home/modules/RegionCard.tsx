"use client";

import { useRef, useState } from "react";
import styles from "./RegionCard.module.scss";
import classNames from "classnames";
import useOnClickOutside, { Popup } from "@/components/Popup";
const cx = classNames.bind(styles);

export default function RegionCard({ region }: { region: any }) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const regionPopupRef = useRef(null);
  const [regionPopupOpen, setRegionPopupOpen] = useState(false);
  useOnClickOutside(regionPopupRef, () => {setRegionPopupOpen(false)})
  return (
    <div
      className={cx({
        [styles.card]: true,
        [styles.card__hover]: hover,
        [styles.card__focus]: focus,
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseDown={() => setFocus(true)}
      onMouseUp={() => setFocus(false)}
      style={{
        backgroundColor: region.background,
        color: region.primary,
      }}
      onClick={() => {setRegionPopupOpen(true), console.log(regionPopupOpen)}}
    >
      <div className={styles.card__name}>{region.name}</div>
      <div className={styles.card__arrow}>
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_32_61)">
            <path
              d="M7.05194 2.42264C6.86073 2.53445 6.70025 2.7044 6.58816 2.91378C6.47608 3.12317 6.41674 3.36385 6.41669 3.60931L6.4161 5.33331H2.33335C2.02393 5.33331 1.72719 5.47378 1.5084 5.72383C1.2896 5.97388 1.16669 6.31302 1.16669 6.66664V9.3333L1.1696 9.4333C1.19168 9.76874 1.32388 10.0822 1.5397 10.311C1.75552 10.5397 2.03902 10.6667 2.33335 10.6666L6.4161 10.666L6.41669 12.3906C6.41674 12.6543 6.48519 12.912 6.61338 13.1312C6.74158 13.3505 6.92377 13.5213 7.13692 13.6222C7.35007 13.7231 7.58461 13.7495 7.81089 13.6981C8.03717 13.6467 8.24503 13.5197 8.40819 13.3333L12.25 8.94264C12.4687 8.6926 12.5916 8.35352 12.5916 7.99997C12.5916 7.64642 12.4687 7.30734 12.25 7.05731L8.40819 2.66664C8.24503 2.48006 8.03712 2.35298 7.81076 2.30148C7.5844 2.24998 7.34976 2.27637 7.13652 2.37731L7.05194 2.42264Z"
              fill={region.primary}
            />
          </g>
          <defs>
            <clipPath id="clip0_32_61">
              <rect width="14" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <Popup ref={regionPopupRef} popupState={regionPopupOpen}>
          <div className={styles.popup}>
            <h1 className={styles.popup__heading} style={{color: region.primary}}>{region.name}</h1>
            <p className={styles.popup__desc}>The Tundra is an icey wasteland, with nearly no vegetation and life. Temperatures reach all time lows daily as the night is unsurvive-able for most.</p>
            <div className={styles.popup__stats}>
              <div className={styles.popup__stats__stat}>
                <span className={styles.popup__stats__stat__heading}>LANGUAGE</span>
                <span className={styles.popup__stats__stat__value}>-</span>
              </div>
              <div className={styles.popup__stats__stat}>
                <span className={styles.popup__stats__stat__heading}>TEMPERATURE</span>
                <span className={styles.popup__stats__stat__value}>-40°C to 10°C</span>
              </div>
            </div>
          </div>
          <div className={styles.popup__stats}>
            <div className={styles.popup__stats__stat}>
                <span className={styles.popup__stats__stat__heading}>CIVILIZATION</span>
                <span className={styles.popup__stats__stat__value}>None </span>
            </div>
          </div>
          <div className={styles.tips}>
            <div className={styles.tips__heading}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_34_322)">
            <path d="M4 20H8L18.5 9.5C18.7626 9.23735 18.971 8.92555 19.1131 8.58239C19.2553 8.23923 19.3284 7.87143 19.3284 7.5C19.3284 7.12856 19.2553 6.76077 19.1131 6.4176C18.971 6.07444 18.7626 5.76264 18.5 5.5C18.2374 5.23735 17.9256 5.02901 17.5824 4.88687C17.2392 4.74473 16.8714 4.67157 16.5 4.67157C16.1286 4.67157 15.7608 4.74473 15.4176 4.88687C15.0744 5.02901 14.7626 5.23735 14.5 5.5L4 16V20Z" stroke={region.primary}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.5 6.5L17.5 10.5" stroke={region.primary}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 16V19" stroke={region.primary} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 22V22.01" stroke={region.primary}  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <defs>
            <clipPath id="clip0_34_322">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            <h1 className={styles.tips__heading__heading} style={{color: region.primary}}>Veronica's Tips</h1>
            </div>
            <ul className={styles.tips__tips}>
              <li>lorem ipsum dolor set amet</li>
              <li>lorem ipsum dolor set amet</li>
              <li>lorem ipsum dolor set amet</li>
              <li>lorem ipsum dolor set amet</li>
            </ul>
          </div>
          <button className={styles.popup__button} style={{color: region.primary, backgroundColor: region.background}}>
            How to Reach
            <svg style={{marginLeft: 'auto', position: 'absolute', right: '18px',}} width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_33_309)">
                <path d="M7.05188 2.25234C6.86067 2.35629 6.70019 2.51429 6.5881 2.70895C6.47601 2.90361 6.41668 3.12737 6.41663 3.35557L6.41604 4.95835H2.33329C2.02387 4.95835 1.72713 5.08895 1.50833 5.32142C1.28954 5.55389 1.16663 5.86918 1.16663 6.19794V8.6771L1.16954 8.77007C1.19162 9.08192 1.32382 9.37338 1.53964 9.58603C1.75546 9.79867 2.03896 9.91679 2.33329 9.91669L6.41604 9.91607L6.41663 11.5195C6.41668 11.7646 6.48513 12.0042 6.61332 12.208C6.74152 12.4118 6.92371 12.5706 7.13686 12.6644C7.35001 12.7582 7.58455 12.7828 7.81083 12.735C8.03711 12.6872 8.24497 12.5692 8.40813 12.3959L12.25 8.3139C12.4687 8.08145 12.5915 7.76621 12.5915 7.43752C12.5915 7.10883 12.4687 6.79359 12.25 6.56113L8.40813 2.47919C8.24497 2.30573 8.03706 2.18758 7.8107 2.1397C7.58434 2.09182 7.3497 2.11635 7.13646 2.2102L7.05188 2.25234Z" fill={region.primary}/>
              </g>
              <defs>
                <clipPath id="clip0_33_309">
                  <rect width="14" height="14.875" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </button>
      </Popup>
    </div>
  );
}
