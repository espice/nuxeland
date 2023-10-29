"use client";

import { useState, useRef } from "react";
import Select from "react-select";

export default function Selector({
  value,
  setValue,
  options,
}: {
  value: any;
  setValue: any;
  options: any;
}) {
  const style = {
    control: (base: any, state: any) => ({
      ...base,
      letterSpacing: "-0.5px",
      paddingLeft: "-20px",
      borderRadius: "12px",
      fontWeight: "600",
      fontSize: "16px",
      FontFace: "Inter",
      marginLeft: "0",
      border: !state.isFocussed && "1.9px solid #e4e7eb",
      height: "56px",
      color: "#313131",
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
        cursor: "pointer",
      },
    }),
    menu: (base: any, state: any) => ({
      ...base,
      borderRadius: "0 0 12px 12px",
    }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      height: "fit-content",

      paddingTop: "4px",
      paddingLeft: "15px",
      paddingRight: "15px",
    }),
    indicatorSeparator: (provided: any, state: any) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      color: "#313131",
      marginRight: "15px",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      //marginTop: "-3px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: "#313131",
    }),
    option: (base: any, state: any) => ({
      ...base,
      paddingTop: "16px",
      paddingBottom: "16px",
      fontSize: "14px",
      fontWeight: "600",
      backgroundColor:
        state.data === state.selectProps.value ? "#348CB4" : "#ffffff",
      color: state.data === state.selectProps.value ? "#ffffff" : "#313131",
    }),
    menuList: (base: any, state: any) => ({
      ...base,
      paddingTop: "0",
      paddingBottom: "0",
    }),
  };
  return (
    <Select
      className="react-select-container"
      classNamePrefix="react-select"
      defaultValue={1}
      theme={(theme) => ({
        ...theme,
        borderRadius: 12,
        colors: {
          ...theme.colors,
          text: "#313131",
          primary25: "rgba(#082f69,0.2)",
          primary: "rgba(#082f69,0.2)",
          neutral50: "#313131",
          neutral80: "#313131",
          neutral90: "#313131",
        },
      })}
      options={options}
      styles={style}
      menuPosition={"fixed"}
      value={value}
    />
  );
}
