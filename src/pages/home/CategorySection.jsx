import React from "react";
import { useSelector } from "react-redux";
import { Box, Flex, Text } from "@radix-ui/themes";

import CardUI from "../../components/CardUI";
import {
  getCategoryStatus,
  selectAllCategories,
} from "../../store/slices/productSlice";
import { Link } from "react-router-dom";
import AppSpinner from "../../components/AppSpinner";

const CategorySection = () => {
  const categoryStatus = useSelector(getCategoryStatus);
  const categories = useSelector(selectAllCategories);

  return (
    <Flex direction="column" gap="2">
      <Text align="center" size={"4"} weight="bold">
        Lists by categories
      </Text>

      {categoryStatus === "loading" ? (
        <AppSpinner />
      ) : (
        <Box>
          <Flex gap="4" className="overflow-x-scroll scrollbar ">
            {categories?.map((p) => (
              <Link
                to={`/categories/${p.id}`}
                key={p.id}
                className="cursor-pointer mb-3"
              >
                <CardUI
                  description={p.description}
                  imageUrl={p.image}
                  name={p.name}
                />
              </Link>
            ))}
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default CategorySection;
