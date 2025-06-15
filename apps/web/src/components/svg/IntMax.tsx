import { useId } from "react";

export const IntMax = ({ className }: { className?: string }) => {
  const id = useId();
  const gradient1Id = `paint0_radial_${id}`;
  const gradient2Id = `paint1_radial_${id}`;

  return (
    <svg
      className={className}
      width="65px"
      height="64px"
      viewBox="0 0 65 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M34.1876 51.6956C32.389 51.5988 30.6575 51.2502 29.0244 50.6862C21.5111 48.0889 16.1034 40.8996 16.1034 32.4322C16.1034 22.7134 23.2234 14.6744 32.4873 13.3358C32.9765 13.2656 33.4705 13.2148 33.9693 13.1809C36.1133 12.0335 38.4682 11.2371 40.9647 10.8765C41.9695 10.7336 42.9959 10.6513 44.0414 10.6513C44.0726 10.6513 44.1062 10.6513 44.1374 10.6513C42.4371 8.02254 41.7968 4.90718 42.31 2C40.274 5.57044 36.2715 7.99833 31.6624 7.99833C27.0532 7.99833 23.0507 5.57286 21.0123 2.00242C21.7245 6.0594 20.2041 10.5182 16.6741 13.5077C13.1465 16.4972 8.53249 17.2355 4.6979 15.8218C7.82745 18.4676 9.49893 22.8683 8.70036 27.4457C7.90179 32.0256 4.83699 35.5815 1 36.9879C5.0792 36.9854 9.16799 39.2729 11.4702 43.296C13.7724 47.324 13.6908 52.0369 11.6476 55.6025C14.77 52.9519 19.3552 52.0515 23.6838 53.6442C28.0124 55.2346 30.9525 58.8994 31.6576 62.9564C32.3626 58.9019 35.3003 55.237 39.6265 53.6467C38.7536 53.4627 37.8999 53.2255 37.0701 52.9374C36.0749 52.5937 35.1132 52.1749 34.19 51.6932L34.1876 51.6956Z"
        fill={`url(#${gradient1Id})`}
      />
      <path
        d="M44.032 13.1372C43.1039 13.1372 42.1926 13.2098 41.3005 13.3357C40.7321 13.418 40.1734 13.5245 39.6242 13.6576C31.1924 15.6668 24.9189 23.3087 24.9189 32.4321C24.9189 40.897 30.3243 48.0888 37.84 50.6861C38.4252 50.8894 39.0247 51.0589 39.6338 51.2065C41.0463 51.5454 42.5187 51.727 44.0344 51.727C54.5909 51.727 63.1498 43.0877 63.1498 32.4321C63.1498 21.7765 54.5909 13.1372 44.0344 13.1372H44.032Z"
        fill={`url(#${gradient2Id})`}
      />
      <g style={{ mixBlendMode: "screen", opacity: 0.4 }}>
        <ellipse
          cx="7.0096"
          cy="3.22701"
          rx="7.0096"
          ry="3.22701"
          transform="matrix(0.794041 -0.607864 0.600694 0.799479 27.8589 23.1089)"
          fill="#CDF7FF"
        />
      </g>
      <defs>
        <radialGradient
          id={gradient1Id}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(10.1053 8.42105) rotate(56.1649) scale(61.5038 62.2776)"
        >
          <stop stopColor="#11E8BB" />
          <stop offset="0.3377" stopColor="#15D7F4" />
          <stop offset="0.657" stopColor="#3975FF" />
          <stop offset="0.8013" stopColor="#713CF3" />
          <stop offset="0.8813" stopColor="#9926FA" />
          <stop offset="0.9473" stopColor="#A90EFD" />
          <stop offset="1" stopColor="#D52BFF" />
        </radialGradient>
        <radialGradient
          id={gradient2Id}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20.2106 6.73698) rotate(48.8141) scale(53.7102 40.3113)"
        >
          <stop stopColor="#0FFFDF" />
          <stop offset="0.3377" stopColor="#15D7F4" />
          <stop offset="0.657" stopColor="#3975FF" />
          <stop offset="0.8013" stopColor="#713CF3" />
          <stop offset="0.8813" stopColor="#9926FA" />
          <stop offset="0.9473" stopColor="#A90EFD" />
          <stop offset="1" stopColor="#D52BFF" />
        </radialGradient>
      </defs>
    </svg>
  );
};
