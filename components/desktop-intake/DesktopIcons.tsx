import React from "react";

// Cute Desktop Yellow Folder matching user's reference image
export function DesktopFolderIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Folder Back Tab */}
      <path
        d="M2 8C2 5.79086 3.79086 4 6 4H18L22 9H42C44.2091 9 46 10.7909 46 13V34C46 36.2091 44.2091 38 42 38H6C3.79086 38 2 36.2091 2 34V8Z"
        fill="#F5D98B"
        stroke="#2A3320"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Blue Inner Sheet Tab (like in user reference image) */}
      <rect
        x="8"
        y="12"
        width="16"
        height="6"
        rx="1.5"
        fill="#5E8DA5"
        stroke="#2A3320"
        strokeWidth="1.5"
      />
      {/* Folder Front Flap */}
      <path
        d="M2 15C2 13.3431 3.34315 12 5 12H43C44.6569 12 46 13.3431 46 15L43.5 35C43.3 36.7 41.9 38 40.2 38H7.8C6.1 38 4.7 36.7 4.5 35L2 15Z"
        fill="#FBE7A8"
        stroke="#2A3320"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Dark Olive [h] Profile Icon squircle with dashed border (as in reference image)
export function DesktopProfileBadge({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center bg-[#4F5B43] rounded-2xl border-[2.5px] border-[#2A3320] shadow-[2px_2px_0px_#2A3320] ${className}`}
    >
      <div className="absolute inset-1 rounded-xl border border-dashed border-[#F4EFE6]/60 pointer-events-none" />
      <span className="font-bold text-[#F4EFE6] text-xl font-mono leading-none lowercase">
        h
      </span>
    </div>
  );
}

// Retro OS App Dock Icons (LinkedIn, GitHub, Behance, Dribbble) matching user's ribbon dock
export function DockIcon({
  type,
  onClick,
  href,
}: {
  type: "linkedin" | "github" | "behance" | "dribbble" | "whatsapp" | "email";
  onClick?: () => void;
  href?: string;
}) {
  const configs = {
    linkedin: {
      bg: "bg-[#2D7CB8]",
      label: "in",
      border: "border-[#1B4B6E]",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    github: {
      bg: "bg-[#24292E]",
      label: "git",
      border: "border-[#14171A]",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    behance: {
      bg: "bg-[#0057FF]",
      label: "Bē",
      border: "border-[#003CB0]",
      icon: (
        <span className="font-bold text-white text-base font-sans tracking-tight">
          Bē
        </span>
      ),
    },
    dribbble: {
      bg: "bg-[#EA4C89]",
      label: "ball",
      border: "border-[#A82B5A]",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm7.848 5.764a10.377 10.377 0 012.392 6.136c-.347-.075-3.324-.717-6.52-.303-.06-.14-.123-.28-.188-.418-1.077-2.28-2.383-4.329-3.79-5.992 3.48.065 6.425 2.146 8.106 5.577zM12 1.67c2.613 0 5.008.974 6.837 2.585-1.576 3.092-4.298 5.044-7.514 4.98-.382-.75-.788-1.516-1.22-2.29A20.35 20.35 0 0012 1.67zM8.344 7.643c.433.774.839 1.54 1.22 2.29-4.227 1.233-8.31.956-8.775.923C1.65 6.326 4.7 2.766 8.344 7.643zm-6.66 4.78c.45.03 4.294.28 8.44-1.01.272.55.525 1.11.758 1.68-3.418 1.01-6.73 3.82-8.358 7.37A10.384 10.384 0 011.684 12.423zm10.316 9.907c-2.48 0-4.757-.874-6.55-2.336 1.488-3.344 4.542-5.96 7.74-6.93 1.026 2.656 1.536 5.334 1.614 6.87a10.377 10.377 0 01-2.804 2.396zm4.35-3.43c-.092-1.396-.56-3.87-1.515-6.38 2.977-.428 5.7.13 6.02.202a10.428 10.428 0 01-4.505 6.178z" />
        </svg>
      ),
    },
    whatsapp: {
      bg: "bg-[#25D366]",
      label: "wa",
      border: "border-[#128C7E]",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M12.031 0C5.394 0 .017 5.376.017 12.013c0 2.122.554 4.192 1.606 6.015L0 24l6.155-1.614c1.761.96 3.747 1.467 5.867 1.467 6.637 0 12.015-5.378 12.015-12.015S18.668 0 12.031 0zm0 21.986c-1.8 0-3.568-.484-5.111-1.399l-.367-.218-3.797.996 1.013-3.7-.239-.38a9.945 9.945 0 01-1.528-5.272c0-5.508 4.482-9.99 9.993-9.99 5.511 0 9.993 4.482 9.993 9.99 0 5.508-4.482 9.973-9.954 9.973zm5.474-7.484c-.3-.15-1.774-.875-2.049-.975-.275-.1-.475-.15-.675.15s-.775.975-.95 1.175-.35.225-.65.075c-.3-.15-1.267-.467-2.413-1.488-.892-.796-1.494-1.779-1.669-2.079-.175-.3-.019-.462.131-.611.135-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.585-.492-.505-.675-.514-.175-.009-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.115 3.23 5.124 4.53.716.31 1.275.495 1.71.634.719.229 1.374.197 1.892.12.577-.086 1.774-.725 2.024-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z" />
        </svg>
      ),
    },
    email: {
      bg: "bg-[#F3A775]",
      label: "mail",
      border: "border-[#BD6E3C]",
      icon: (
        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
  }[type];

  const content = (
    <div
      className={`
        w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${configs.bg} ${configs.border}
        border-[2.5px] shadow-[2px_3px_0px_#28331E] flex items-center justify-center
        transition-transform duration-100 hover:scale-105 active:scale-95 cursor-pointer
      `}
    >
      {configs.icon}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <button type="button" onClick={onClick}>{content}</button>;
}
