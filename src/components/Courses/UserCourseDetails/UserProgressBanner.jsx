import React from "react";
import bg from "../../../assets/images/bannerBg.png";

// Static progress bar component (no animations)
const UserProgressBanner = ({
  progress, // Static progress value (in percentage)
  radius = 20, // Default radius
  strokeWidth = 6, // Default stroke width
  width = 50, // Default width of SVG
  height = 50, // Default height of SVG
  backgroundColor = "#e0e0e0", // Background circle color
  progressColor = "#87ceeb", // Progress circle color
  label = "Continue your lessons", // Default label
  subLabel = "Complete your course and get Certified", // Default sub-label
  labelSize = "sm", // Label size
}) => {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="bg-black px-4 md:px-5 py-3 md:py-6 rounded-lg mt-4 text-white bg-opacity-80 flex justify-between items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div>
        <p className={`text-${labelSize} font-semibold`}>{label}</p>
        <p className="text-xs mt-1">{subLabel}</p>
      </div>

      <svg
        width={width}
        height={height}
        className="relative"
        style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke={progress >= 1 && progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
        <g transform={`rotate(90, ${width / 2}, ${height / 2})`}>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy="0.3em"
            fill="white"
            fontSize={width / 5}>
            {progress}%
          </text>
        </g>
      </svg>
    </div>
  );
};

export default UserProgressBanner;
