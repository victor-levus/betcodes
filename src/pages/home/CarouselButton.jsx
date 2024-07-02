import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Flex, Text } from "@radix-ui/themes";
import moment from "moment";

const CarouselButton = ({ fixtureDate }) => {
  const [searchParams] = useSearchParams();
  const slideTo = searchParams.get("slideTo");
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line
  }, []);

  return (
    <Button
      key={fixtureDate.dateIndex}
      variant="ghost"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide-to={fixtureDate.dataBsSlideTo}
      aria-current={fixtureDate.arialCurrent}
      aria-label={fixtureDate.ariaLabel}
      onClick={() => navigate("?slideTo=" + fixtureDate.ariaLabel)}
    >
      <Flex direction="column" align={"center"}>
        <Text
          className={`f-date-- ${
            slideTo === fixtureDate.ariaLabel
              ? "active--btn"
              : !slideTo && fixtureDate.className
              ? "active--btn"
              : ""
          }`}
        >
          {moment().subtract(fixtureDate.dateIndex, "days").format("ddd") ===
          moment().format("ddd")
            ? "TODAY"
            : moment().subtract(fixtureDate.dateIndex, "days").format("ddd")}
        </Text>
        <Text
          className={`f-date-- day-month ${
            slideTo === fixtureDate.ariaLabel
              ? "active--btn"
              : !slideTo && fixtureDate.className
              ? "active--btn"
              : ""
          }`}
        >
          {moment().subtract(fixtureDate.dateIndex, "days").format("DD MMM")}
        </Text>
      </Flex>
    </Button>
  );
};

export default CarouselButton;
