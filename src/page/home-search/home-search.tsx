"use client";
import {
  HomePageSearchButton,
  HomePageSearchContainer,
  HomePageSearchInput,
  HomeSearchClearAllButton,
  HomeSearchContent,
  HomeSearchError,
} from "./home-search-styles";

type HomeSearchProps = {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearchClick: () => void;
  lessThan3Letters: boolean;
  onClearAllClick: () => void;
};

export default function HomeSearch({
  keyword,
  setKeyword,
  onSearchClick,
  lessThan3Letters,
  onClearAllClick,
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
        <HomePageSearchButton
          onClick={onSearchClick}
          data-testid="search-button"
        >
          <i className="fa fa-search" aria-hidden="true"></i>
        </HomePageSearchButton>
      </HomePageSearchContainer>
      <>
        {lessThan3Letters && (
          <HomeSearchError>
            *field 'keyword' is required (from 4 up to 32 chars)
          </HomeSearchError>
        )}
      </>
      <HomeSearchClearAllButton onClick={onClearAllClick}>
        clear all
      </HomeSearchClearAllButton>
    </HomeSearchContent>
  );
}
