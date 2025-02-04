import Controller from "@/components/button/Controller";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="w-full lg:max-w-[1060px] md:max-w-[704px] sm:max-w-[325px] mx-auto">
      {children}
      <Controller />
    </div>
  );
};

export default Container;
