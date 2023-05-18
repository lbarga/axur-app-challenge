"use client";
import { CONSTANT } from "@/constant/constant";
import {
  HomePageSearchButton,
  HomePageSearchContainer,
  HomePageSearchInput,
  HomeSearchContent,
} from "./home-search-styles";

const { CRAWLS } = CONSTANT.LOCAL_STORAGE;

type HomeSearchProps = {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearchClick: () => void;
};

export default function HomeSearch({
  keyword,
  setKeyword,
  onSearchClick,
}: HomeSearchProps) {
  return (
    <HomeSearchContent>
      <HomePageSearchContainer>
        <HomePageSearchInput
          type="text"
          placeholder="keyword"
          value={keyword}
          onChange={(event) => {
            setKeyword(event.target.value);
          }}
        />
        <HomePageSearchButton onClick={onSearchClick}>
          <i className="fa fa-search" aria-hidden="true"></i>
        </HomePageSearchButton>
      </HomePageSearchContainer>
    </HomeSearchContent>
  );
}
