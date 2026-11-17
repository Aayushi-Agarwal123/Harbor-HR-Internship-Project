interface IconProps {
  name: string;
}

const paths: Record<string, string> = {
  admin: "M12 2l7 4v6c0 5-3.2 8.4-7 10-3.8-1.6-7-5-7-10V6l7-4z",
  pim: "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm8 1a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM3 19c.4-2.6 2.6-4 5-4s4.6 1.4 5 4H3zm9 .2c.3-1.2 1.2-2.2 2.4-2.8 1.4-.3 3-.2 4.6.8V19H12v.2z",
  leave: "M7 3h2v2h6V3h2v2h2v16H5V5h2V3zm0 6v10h10V9H7z",
  time: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm1 4h-2v5l4 2 1-1.7-3-1.5V8z",
  recruitment: "M4 6h16v12H4V6zm2 2v8h12V8H6zm2 2h5v2H8v-2z",
  "my-info": "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8c.6-3 3.2-5 7-5s6.4 2 7 5H5z",
  performance: "M4 16l4-5 3 3 5-7 4 2v7H4z",
  dashboard: "M4 4h7v7H4V4zm9 0h7v4h-7V4zM4 13h7v7H4v-7zm9 3h7v4h-7v-4z",
  directory: "M5 4h6v6H5V4zm8 0h6v6h-6V4zM5 14h6v6H5v-6zm8 0h6v6h-6v-6z",
  maintenance: "M14 4l2 2-2.2 2.2 3 3L19 9l2 2-6 6-2-2 2.2-2.2-3-3L10 12l-2-2 6-6z",
  claim: "M6 3h12v18l-6-3-6 3V3zm2 2v12.2l4-2 4 2V5H8z",
  buzz: "M5 6h14v9H8l-3 3V6zm2 2v6h10V8H7z",
  search: "M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm6.2 8.8l3.5 3.5-1.4 1.4-3.5-3.5 1.4-1.4z",
  plus: "M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6V5z",
  help: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zm0 13a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zm0-9a3 3 0 0 0-3 3h2a1 1 0 1 1 1.7.7c-.5.5-1.2.8-1.5 1.4-.2.4-.2.8-.2 1.2h2c0-.2 0-.4.1-.6.2-.4.6-.7 1.1-1.1A3 3 0 0 0 12 7z",
  mark: "M12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
};

export function Icon({ name }: IconProps) {
  const path = paths[name] ?? paths.mark;
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  );
}
