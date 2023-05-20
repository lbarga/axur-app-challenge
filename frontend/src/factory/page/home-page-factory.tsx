import { AxrengServiceModel } from "@/model/axreng-service-model";
import { ExpressServiceModel } from "@/model/express-service-model";
import HomePage from "@/page/home-page";
import { axrengService } from "@/service/axreng.service";
import { expressService } from "@/service/express.service";

type MakeHomePageProps = {
  axrengServiceParam?: AxrengServiceModel;
  expressServiceParam?: ExpressServiceModel;
};

export const makeHomePage = ({
  axrengServiceParam = axrengService,
  expressServiceParam = expressService,
}: MakeHomePageProps = {}) => {
  return (
    <HomePage
      axrengService={axrengServiceParam}
      expressService={expressServiceParam}
    />
  );
};
