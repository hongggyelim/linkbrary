// tailwind 동적 스타일을 위한 함수
export const bindClass = (...cls: string[]) => {
  return cls.join(" ");
};
