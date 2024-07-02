import { Link } from "react-router-dom";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { HiCubeTransparent } from "react-icons/hi";
import { TbGridDots, TbLogin2, TbLogout2 } from "react-icons/tb";
import { FaBlog } from "react-icons/fa";
import { RiHome7Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";

const NavBar = () => {
  const user = useSelector(selectUser);

  const menuList = [
    { name: "Home", to: "/", icon: <RiHome7Line size={"20"} color="gray" /> },
    { name: "Blog", to: "/blog", icon: <FaBlog size={"20"} color="gray" /> },

    user.id
      ? {
          name: "Logout",
          to: "/auth/logout",
          icon: <TbLogout2 size={"20"} color="gray" />,
        }
      : {
          name: "Login",
          to: "/auth",
          icon: <TbLogin2 size={"20"} color="gray" />,
        },
  ];

  const toggleMenuListBox = () => {
    const menuListBox = document.getElementById("menu--list-box");

    menuListBox?.classList.contains("hidden")
      ? menuListBox.classList.remove("hidden")
      : menuListBox?.classList.add("hidden");

    menuListBox?.focus();
  };

  return (
    <Flex
      py={"3"}
      justify={"between"}
      align={"center"}
      className="border-b border-b-gray-600 mb-2 relative"
    >
      <Flex align="center">
        <a href="/">
          <HiCubeTransparent
            size={"50"}
            className="cursor-pointer"
            color="var(--accent-9)"
          />
        </a>

        <span
          className="text-2xl"
          style={{
            color: "var(--accent-9)",
            fontSize: "1.8rem",
            fontFamily: "Oleo Script ",
            textDecoration: "none",
          }}
        >
          BetCodes
        </span>
      </Flex>

      <Flex gap={"3"} align={"center"}>
        {user.id && <Text color="gray">{`Welcome ${user?.first_name}`}</Text>}
        <TbGridDots
          size={"30"}
          className="cursor-pointer"
          color="gray"
          // onClick={toggleMenuListBox}
        />
      </Flex>

      <Flex
        id="menu--list-box"
        justify={"between"}
        gap={"3"}
        width={"300px"}
        className="bg--darkT absolute right-0 top-14 z-10 py-4 px-3 rounded-xl overflow-y-scroll hidden"
      >
        <Flex gap={"3"} wrap={"wrap"}>
          {menuList.map((ml, i) => (
            <Link key={i} to={ml.to}>
              <Flex
                onClick={toggleMenuListBox}
                direction={"column"}
                align={"center"}
                gap={"2"}
                justify={"center"}
                className="bg-amber-950 bg-opacity-60 p-2 rounded-lg w-14 h-16 cursor-pointer hover:bg-amber-900 transition-all "
              >
                <Box className="ml-[-5px] ">{ml.icon}</Box>
                <Button type="button">
                  <Text as="p" className="text-stone-400 ">
                    {ml.name}
                  </Text>
                </Button>
              </Flex>
            </Link>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NavBar;
