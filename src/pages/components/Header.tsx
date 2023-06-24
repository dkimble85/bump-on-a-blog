import Link from "next/link";

export const Header = ({ className }: { className: string }) => {
  return (
    <header className={className}>
      <div className="ml-2 p-3">
        <Link href="/">Home</Link>
      </div>
      {/* <div className="p-3">Post Archive</div> */}
    </header>
  );
};
