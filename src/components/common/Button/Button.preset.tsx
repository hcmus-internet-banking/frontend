export const presets: {
  [key: string]: {
    classNames: string;
    shadow?: string;
  };
} = {
  filled: {
    classNames: "bg-blue-500 hover:bg-opacity-80",
    shadow: "shadow-md hover:shadow-lg hover:shadow-blue-600",
  },
  outlined: {
    classNames: "bg-transparent border border-blue-500 text-blue-500",
  },
};
