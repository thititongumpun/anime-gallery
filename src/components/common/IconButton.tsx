interface Props {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
export default function IconButton({ children, className, onClick }: Props) {
  // const {
  //   children,
  //   // eslint-disable-next-line @typescript-eslint/no-empty-function
  //   onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     event;
  //   },
  //   className = "",
  // } = props;
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full p-2 hover:bg-gray-400 hover:bg-opacity-25 focus:border-none focus:outline-none ${
        className as string
      }`}
    >
      {children}
    </button>
  );
}
