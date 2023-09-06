import SearchBar from "../searchBar";
import React, { useState } from "react";

export default function SearchInventoy({ searchContent, setSearchContent, colorPalette }) {
  // const [searchContent, setSearchContent] = useState("");

  const handleSubmit = (e) => {
    // TODO
  };

  return (
    <SearchBar
      placeHolder="Search Inventory"
      searchContent={searchContent}
      setSearchContent={setSearchContent}
      handleSubmit={handleSubmit}
      colorPalette={colorPalette}
    />
  );
}
