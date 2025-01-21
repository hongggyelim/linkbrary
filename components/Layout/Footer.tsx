import Link from "next/link";
import SocialLinks from "../SocialLinks";

const Footer = () => {
  return (
    <footer className="bg-black200 py-4 sm:px-8 md:px-[104px] lg:px-[104px] flex justify-center">
      <nav className="relative w-full lg:max-w-[1520px] md:max-w-[800px] sm:max-w-[326px] flex justify-between">
        <p className="text-gray700 sm:absolute sm:top-[60px] leading-[18.4px]">
          ©codeit - 2024
        </p>

        <ul className="flex gap-[30px] text-gray800 leading-[18.4px]">
          <li>
            <Link href={"/"}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={"/"}>FAQ</Link>
          </li>
        </ul>

        <SocialLinks />
      </nav>
    </footer>
  );
};

export default Footer;
