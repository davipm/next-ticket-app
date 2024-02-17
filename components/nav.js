import Link from "next/link";
import { faHome, faTicket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Nav() {
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon
            icon={faHome}
            className="text-default-text text-xl"
          />
        </Link>
        <Link href="/create-ticket">
          <FontAwesomeIcon
            icon={faTicket}
            className="text-default-text text-xl"
          />
        </Link>
      </div>

      <div>
        <p className="text-default-text">davi.p.m94@gmail.com</p>
      </div>
    </nav>
  );
}
