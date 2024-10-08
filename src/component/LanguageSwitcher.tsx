import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-background text-foreground">
      <div className="text-primary text-sm px-4 py-1 rounded-full border border-primary">
        We always provide the best service for you
      </div>
      <nav className="flex items-center space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="#pricing">Pricing</Link>
          </li>
          <li>
            <Link href="#faq">FAQ</Link>
          </li>
          <li>
            <Link
              href="#"
              className="bg-primary text-primary-foreground px-4 py-2 rounded">
              Login
            </Link>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
