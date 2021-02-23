import React from "react";
import Market from "../../components/Market/Market";
import { app } from "../../base";
import withFirebasePagination from "firebase-react-paginated";

export default withFirebasePagination(app)({
  path: "/phones",
  orderBy: "date",
  length: 4,
})(Market);
