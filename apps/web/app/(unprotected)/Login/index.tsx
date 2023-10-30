"use client";

import { useState } from "react";
import styles from "./index.module.scss";

const Login = () => {
    const [stage, setStage] = useState(1);
    
    return (
        <div className={styles.container}>
            <img src="/intro.png" className={styles.container__image} />
            <img src="/currency.png" className={styles.containerhack__image} style={stage >= 2 ? {transform: 'translate(-100%)'} : {}} />
            <img src="/intro.png" className={styles.containerhack__image} style={stage >= 3 ? {transform: 'translate(-100%)'} : {}} />
            <div className={styles.container__login}>
                <div className={styles.container__login__dots}>
                    <div className={styles.container__login__dots__dot} style={stage == 1 ? {width: '32px', borderRadius: '50px', backgroundColor: '#D486B8'} : {}}></div>
                    <div className={styles.container__login__dots__dot} style={stage == 2 ? {width: '32px', borderRadius: '50px', backgroundColor: '#5BBB5F'} : {}}></div>
                    <div className={styles.container__login__dots__dot} style={stage == 3 ? {width: '32px', borderRadius: '50px', backgroundColor: '#348CB4'} : {}}></div>
                </div>
                <div style={{minHeight: 'calc(100vh - 250px)', display: 'flex', flexFlow: 'column'}}>
                <h1 className={styles.container__login__heading}>Welcome to nuxEland!</h1>
                <span className={styles.container__login__what}>WHAT IS NUXELAND?</span>
                <span className={styles.container__login__desc}>
                    nuxEland is your very own fantasy world. Limited by your own creativity, you are free to write your own story!
                    <br />
                    <div style={{ height: '12px' }}></div>
                    That being said, as a human, you may encounter some challenges on your journey, but worry not, as this app will help you all the way through!
                </span>

                <span className={styles.container__login__tut}>This tutorial will give you a brief overview of nuxEland and how this app can help you navigate safely.</span>
                <button
                    className={styles.container__login__button}
                    style={{ color: '#561845', backgroundColor: '#D486B8' }}
                    onClick={() => {setStage(2)}}
                >
                    Continue
                    <svg
                        style={{ marginLeft: "auto", position: "absolute", right: "18px" }}
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_33_309)">
                            <path
                                d="M7.05188 2.25234C6.86067 2.35629 6.70019 2.51429 6.5881 2.70895C6.47601 2.90361 6.41668 3.12737 6.41663 3.35557L6.41604 4.95835H2.33329C2.02387 4.95835 1.72713 5.08895 1.50833 5.32142C1.28954 5.55389 1.16663 5.86918 1.16663 6.19794V8.6771L1.16954 8.77007C1.19162 9.08192 1.32382 9.37338 1.53964 9.58603C1.75546 9.79867 2.03896 9.91679 2.33329 9.91669L6.41604 9.91607L6.41663 11.5195C6.41668 11.7646 6.48513 12.0042 6.61332 12.208C6.74152 12.4118 6.92371 12.5706 7.13686 12.6644C7.35001 12.7582 7.58455 12.7828 7.81083 12.735C8.03711 12.6872 8.24497 12.5692 8.40813 12.3959L12.25 8.3139C12.4687 8.08145 12.5915 7.76621 12.5915 7.43752C12.5915 7.10883 12.4687 6.79359 12.25 6.56113L8.40813 2.47919C8.24497 2.30573 8.03706 2.18758 7.8107 2.1397C7.58434 2.09182 7.3497 2.11635 7.13646 2.2102L7.05188 2.25234Z"
                                fill={'#561845'}
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_33_309">
                                <rect width="14" height="14.875" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                </div>
                <div className={styles.containerhack__div} style={stage >= 2 ? {transform: 'translate(-100vw)'} : {}}>
                <h1 className={styles.container__login__heading} style={{color: '#5BBB5F'}}>Currency</h1>
                <span className={styles.container__login__what}>NUXECOINS</span>
                <span className={styles.container__login__desc}>
                nuxEland uses its very own currency, nuxECoins.
                    <br />
                    <div style={{ height: '12px' }}></div>
                    These rare tokens, previously unobtainable on Earth, can now be exchanged for USD or any other currency through the nuxEland app.
                    <br />
                    <div style={{ height: '12px' }}></div>

                    No more cleaning giants’ toes to earn some money!
                </span>

                
                <button
                    className={styles.container__login__button}
                    style={{ color: '#359939', backgroundColor: 'rgba(53, 153, 57, 0.25)' }}
                    onClick={() => {setStage(stage + 1)}}
                >
                    Continue
                    <svg
                        style={{ marginLeft: "auto", position: "absolute", right: "18px" }}
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_33_309)">
                            <path
                                d="M7.05188 2.25234C6.86067 2.35629 6.70019 2.51429 6.5881 2.70895C6.47601 2.90361 6.41668 3.12737 6.41663 3.35557L6.41604 4.95835H2.33329C2.02387 4.95835 1.72713 5.08895 1.50833 5.32142C1.28954 5.55389 1.16663 5.86918 1.16663 6.19794V8.6771L1.16954 8.77007C1.19162 9.08192 1.32382 9.37338 1.53964 9.58603C1.75546 9.79867 2.03896 9.91679 2.33329 9.91669L6.41604 9.91607L6.41663 11.5195C6.41668 11.7646 6.48513 12.0042 6.61332 12.208C6.74152 12.4118 6.92371 12.5706 7.13686 12.6644C7.35001 12.7582 7.58455 12.7828 7.81083 12.735C8.03711 12.6872 8.24497 12.5692 8.40813 12.3959L12.25 8.3139C12.4687 8.08145 12.5915 7.76621 12.5915 7.43752C12.5915 7.10883 12.4687 6.79359 12.25 6.56113L8.40813 2.47919C8.24497 2.30573 8.03706 2.18758 7.8107 2.1397C7.58434 2.09182 7.3497 2.11635 7.13646 2.2102L7.05188 2.25234Z"
                                fill={'#359939'}
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_33_309">
                                <rect width="14" height="14.875" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                </div>
                <div className={styles.containerhack__div} style={stage >= 3 ? {transform: 'translate(-100vw)'} : {}}>
                <h1 className={styles.container__login__heading} style={{color: '#348CB4'}}>Translate</h1>
                <span className={styles.container__login__what}>TRANSLATE DEEZ NUTS</span>
                <span className={styles.container__login__desc}>
               I use deez nuts to provide the best nutting experience deez nuts have everi imagined.
                    <br />
                    <div style={{ height: '12px' }}></div>
                    These rare tokens, previously unobtainable on Earth, can now be exchanged for USD or any other currency through the nuxEland app.
                    <br />
                    <div style={{ height: '12px' }}></div>

                    No more cleaning giants{"’"} toes to earn some money!
                </span>

                <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`} style={{marginTop: 'auto'}}>
                <button
                    className={styles.container__login__button}
                    style={{ color: '#348CB4', backgroundColor: 'rgba(52, 140, 180, 0.20)' }}
                    onClick={() => {setStage(stage + 1)}}
                >
                    Continue
                    <svg
                        style={{ marginLeft: "auto", position: "absolute", right: "18px" }}
                        width="14"
                        height="15"
                        viewBox="0 0 14 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_33_309)">
                            <path
                                d="M7.05188 2.25234C6.86067 2.35629 6.70019 2.51429 6.5881 2.70895C6.47601 2.90361 6.41668 3.12737 6.41663 3.35557L6.41604 4.95835H2.33329C2.02387 4.95835 1.72713 5.08895 1.50833 5.32142C1.28954 5.55389 1.16663 5.86918 1.16663 6.19794V8.6771L1.16954 8.77007C1.19162 9.08192 1.32382 9.37338 1.53964 9.58603C1.75546 9.79867 2.03896 9.91679 2.33329 9.91669L6.41604 9.91607L6.41663 11.5195C6.41668 11.7646 6.48513 12.0042 6.61332 12.208C6.74152 12.4118 6.92371 12.5706 7.13686 12.6644C7.35001 12.7582 7.58455 12.7828 7.81083 12.735C8.03711 12.6872 8.24497 12.5692 8.40813 12.3959L12.25 8.3139C12.4687 8.08145 12.5915 7.76621 12.5915 7.43752C12.5915 7.10883 12.4687 6.79359 12.25 6.56113L8.40813 2.47919C8.24497 2.30573 8.03706 2.18758 7.8107 2.1397C7.58434 2.09182 7.3497 2.11635 7.13646 2.2102L7.05188 2.25234Z"
                                fill={'#348CB4'}
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_33_309">
                                <rect width="14" height="14.875" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                </a>
                </div>
            </div>
        </div>
    )
}

export default Login;