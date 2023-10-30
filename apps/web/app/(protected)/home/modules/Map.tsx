"use client";

import { useRef, useState } from "react";
import { regions } from "@/utils/regions";
import styles from "./Map.module.scss";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import useOnClickOutside, { Popup } from "@/components/Popup";

const Map = () => {
    console.log(regions)
    const [region, setRegion] = useState(Object);
    const [regionPopupOpen, setRegionPopupOpen] = useState(false);
    const regionPopupRef = useRef(null);
    useOnClickOutside(regionPopupRef, () => {setRegionPopupOpen(false)})
    const [expand, setExpand] = useState(false);
    return (
        <div style={{overflow: 'hidden',}}>
        <div className={styles.map}>
            <div className={styles.map__image}>
                
            </div>
            <span className={styles.map__text}>Expand to know more about this region</span>
            <div className={styles.map__expand} style={{cursor: 'pointer'}} onClick={() => {setExpand(true)}}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.125 9.8175L8.1825 10.875L4.8075 14.25H7.5V15.75H2.25V10.5H3.75V13.1925L7.125 9.8175ZM8.1825 7.125L7.125 8.1825L3.75 4.8075V7.5H2.25V2.25H7.5V3.75H4.8075L8.1825 7.125ZM10.875 9.8175L14.25 13.1925V10.5H15.75V15.75H10.5V14.25H13.1925L9.8175 10.875L10.875 9.8175ZM9.8175 7.125L13.1925 3.75H10.5V2.25H15.75V7.5H14.25V4.8075L10.875 8.1825L9.8175 7.125Z" fill="#858585"/>
                </svg>
            </div>
           
        </div>
        {expand ? (
                <div style={{position: 'absolute', top: '0', left: '0', height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', overflow: 'hidden'}}>
                    <svg style={{position: 'absolute', zIndex: '1000', top: '26px', right: '26px', display: 'block', cursor: 'pointer', color: 'white'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z" clip-rule="evenodd" onClick={() => {setExpand(false)}}/></svg>
                    <div className={styles.overlay}></div>
                        <TransformWrapper limitToBounds={false}>
                            <TransformComponent wrapperStyle={{zIndex: '71', overflow: 'visible' }}>
                                <img src="/nuxeland.png" style={{width: '100vw', height: 'auto'}}></img>
                                <div style={{position: 'absolute', top: '25%', left: '10%'}} onClick={() => {setRegion(regions[0]), setRegionPopupOpen(true)}} className={styles.link}>{regions[0].name}</div>
                                <div style={{position: 'absolute', top: '40%', left: '28%'}} onClick={() => {setRegion(regions[1]), setRegionPopupOpen(true)}} className={styles.link}>{regions[1].name}</div>
                                <div style={{position: 'absolute', top: '20%', left: '48%'}} onClick={() => {setRegion(regions[2]), setRegionPopupOpen(true)}} className={styles.link}>{regions[2].name}</div>
                                <div style={{position: 'absolute', top: '28%', left: '85%'}} onClick={() => {setRegion(regions[3]), setRegionPopupOpen(true)}}  className={styles.link}>{regions[3].name}</div>
                                <div style={{position: 'absolute', top: '48%', left: '50%'}} onClick={() => {setRegion(regions[4]), setRegionPopupOpen(true)}} className={styles.link}>{regions[4].name}</div>
                                <div style={{position: 'absolute', top: '60%', left: '20%'}} onClick={() => {setRegion(regions[5]), setRegionPopupOpen(true)}} className={styles.link}>{regions[5].name}</div>
                            </TransformComponent>
                        </TransformWrapper>   
                </div>
            ) : ( 
                <div></div>
            )}
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
            <g clipPath="url(#clip0_34_322)">
            <path d="M4 20H8L18.5 9.5C18.7626 9.23735 18.971 8.92555 19.1131 8.58239C19.2553 8.23923 19.3284 7.87143 19.3284 7.5C19.3284 7.12856 19.2553 6.76077 19.1131 6.4176C18.971 6.07444 18.7626 5.76264 18.5 5.5C18.2374 5.23735 17.9256 5.02901 17.5824 4.88687C17.2392 4.74473 16.8714 4.67157 16.5 4.67157C16.1286 4.67157 15.7608 4.74473 15.4176 4.88687C15.0744 5.02901 14.7626 5.23735 14.5 5.5L4 16V20Z" stroke={region.primary}  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13.5 6.5L17.5 10.5" stroke={region.primary}  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 16V19" stroke={region.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 22V22.01" stroke={region.primary}  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
              <g clipPath="url(#clip0_33_309)">
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
    )
}

export default Map;