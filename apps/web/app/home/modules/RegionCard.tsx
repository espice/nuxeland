"use client";

import { useState } from "react";
import styles from "./RegionCard.module.scss";
import classNames from "classnames";
const cx = classNames.bind(styles);

export default function RegionCard({ region }: { region: any }) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

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
          <g clip-path="url(#clip0_32_61)">
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
    </div>
  );
}
