import React from "react";
import { Flex, Text } from "@radix-ui/themes";
import {
  MdCopyright,
  MdEmail,
  MdFacebook,
  MdLocationOn,
  MdPhone,
} from "react-icons/md";
import { LuInstagram, LuTwitter, LuYoutube } from "react-icons/lu";
import { BiLogoTelegram, BiLogoTiktok } from "react-icons/bi";
import moment from "moment";

function Footer(props) {
  return (
    <div id="footer---container">
      <div className="app---footer">
        <div className="footer---bottom first">
          <Text size="6" weight="bold" color="red">
            e-Store
          </Text>
          <p className="mt-2">
            Discover a world of products that redefine style and convenience.{" "}
            Explore our carefully curated selection of Products. From the latest
            trends to timeless classics, we bring you pieces that are not just
            items but expressions of your personality. Every product in our
            store is crafted with precision and care. We partner with trusted
            brands and artisans to ensure that you receive only the best.
            Durability, functionality, and aesthetic appeal are at the heart of
            what we offer.
          </p>
        </div>
        <div className="footer---bottom second">
          <h6>QUICK LINKS</h6>
          <div className="quick---link">
            <a href="/">Home</a>
            <a href="/coursesPage">Courses</a>
            <a href="/aboutUsPage">About Us</a>
            <a href="/">Contact Us</a>
            <a href="/">Locations</a>
          </div>
        </div>
        <div className="footer---bottom third">
          <h6>CONTACT INFO</h6>
          <div className="contact---link">
            <a href="#">
              <Flex align="center" gap="1">
                <MdEmail />
                <span>info@learningacademy.com</span>
              </Flex>
            </a>
            <a href="#">
              <Flex align="center" gap="1">
                <MdPhone />
                <span>+234 803 0724 271</span>
              </Flex>
            </a>
            <a href="#">
              <Flex align="center" gap="1">
                <MdLocationOn />
                <span>#77 Akaralepo Street Main Ward Nigeria</span>
              </Flex>
            </a>

            <Flex className="social---media--logo">
              <a href="#">
                <MdFacebook size="25" />
              </a>
              <a href="">
                <LuInstagram size="25" />
              </a>
              <a href="#">
                <LuTwitter size="25" />
              </a>
              <a href="#">
                <LuYoutube size="25" />
              </a>
              <a href="#">
                <BiLogoTiktok size="25" />
              </a>
              <a href="#">
                <BiLogoTelegram size="25" />
              </a>
            </Flex>
          </div>
        </div>
      </div>

      <div className="footer---base">
        <p>
          Copyright{" "}
          {
            <span className="inline-block ">
              <MdCopyright />
            </span>
          }{" "}
          | <span> {moment().format("YYYY")} </span> All Rights Reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
