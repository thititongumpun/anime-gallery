interface Props {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}
export default function IconButton({ children, className, onClick }: Props) {
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
