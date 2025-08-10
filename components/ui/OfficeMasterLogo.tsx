
import React from 'react';

export const OfficeMasterLogo = ({ color1 = "#3B82F6", color2 = "#60A5FA" }: { color1?: string, color2?: string }) => (
    <svg width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4H34V12H14V4Z" fill={color1}/>
      <path d="M10 12H38V44H10V12Z" fill={color2}/>
      <path d="M18 20H30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 28H30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <path d="M18 36H24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
