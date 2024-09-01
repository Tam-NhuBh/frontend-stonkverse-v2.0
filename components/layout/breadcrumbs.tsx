import React from "react";
import Breadcrumbs from "@marketsystems/nextjs13-appdir-breadcrumbs";

const BreadCrumbsComp = () => {
  return (
    // </section>
    // <Breadcrumbs omitRootLabel />
    //   <Breadcrumbs
    //   useDefaultStyle
    //   transformLabel={(title) => title + ">"}
    // />
    
    <div className="breadcrumbs-section bg-gray-50">
      {/* <Breadcrumbs useDefaultStyle={true} omitIndexList={[1]} /> */}
      <Breadcrumbs
      useDefaultStyle={true}
      replaceCharacterList={[{ from: ".", to: " " }]}
    />
    </div>

  );
};

export default BreadCrumbsComp;
