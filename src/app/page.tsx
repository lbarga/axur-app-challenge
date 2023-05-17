"use client";
import { useRouter } from "next/navigation";
import {
  HomePageContainer,
  HomePageLogo,
  HomePageSearchButton,
  HomePageSearchContainer,
  HomePageSearchContent,
  HomePageSearchInput,
} from "./page-styles";

export default function HomePage() {
  const router = useRouter();

  return (
    <HomePageContainer>
      <HomePageLogo
        src="/axur-logo.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <HomePageSearchContent>
        <HomePageSearchContainer>
          <HomePageSearchInput type="text" placeholder="keyword" />
          <HomePageSearchButton onClick={() => {}}>
            <i className="fa fa-search" aria-hidden="true"></i>
          </HomePageSearchButton>
        </HomePageSearchContainer>
      </HomePageSearchContent>
    </HomePageContainer>
  );
}
