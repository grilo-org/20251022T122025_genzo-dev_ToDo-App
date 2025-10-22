type MainContainerProps = {
  children: React.ReactNode;
};

export function MainContainer({ children }: MainContainerProps) {
  return <div className="flex flex-1 pb-10 px-5 lg:px-38">{children}</div>;
}
