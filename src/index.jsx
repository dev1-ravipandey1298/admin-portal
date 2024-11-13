import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./components/LoginPage";
import Maker from "./components/Maker";
import Checker from "./components/Checker";
import PendingRequestTable from "./components/PendingRequestTable";
import ShowAllCheckerTable from "./components/ShowAllCheckerTable";
import DraftTable from "./components/DraftTable";
import ShowAllMakerTable from "./components/ShowAllMakerTable";
import CUGManagementPage from "./components/CUGManagementPage";
import CreateTemplateForm from "./components/CreateTemplateForm";
import DraftTemplateForm from "./components/DraftTemplateForm";
import CheckerTempateForm from "./components/CheckerTempateForm";
import ActionTemplatesTable from "./components/ActionTemplatesTable";
import {COMMON_ROUTE, CHILD_PATH } from "./constants/routeConstant";
import ActionTemplateForm from "./components/ActionTemplateForm";
import SearchScreenTemplateForm from "./components/SearchScreenTemplateForm";


const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path={COMMON_ROUTE} element={<Layout />}>
			{/* <Route path="form" element={<FormComponent3 />} /> */}
			<Route path={CHILD_PATH.login} element={<LoginPage />} />
			<Route path={CHILD_PATH.maker} element={<Maker />} />
			<Route path={CHILD_PATH.checker} element={<Checker />} />
			<Route path={CHILD_PATH.cugUser} element={<CUGManagementPage />} />
			<Route path={CHILD_PATH.checkerPendingRequest} element={<PendingRequestTable />} />
			<Route path={CHILD_PATH.checkerShowAll} element={<ShowAllCheckerTable />} />
			<Route path={CHILD_PATH.checkerReviewTemplate} element={<CheckerTempateForm />} />
			<Route path={CHILD_PATH.makerCreateTemplate} element={<CreateTemplateForm />} />
			<Route path={CHILD_PATH.makerDraftTemplate} element={<DraftTemplateForm />} />
			<Route path={CHILD_PATH.makerActionTemplate} element={<ActionTemplateForm />} />
			<Route path={CHILD_PATH.makerDrafts} element={<DraftTable />} />
			<Route path={CHILD_PATH.makerShowAll} element={<ShowAllMakerTable />} />
			<Route path={CHILD_PATH.makerActionTemplatesTable} element={<ActionTemplatesTable />} />
			<Route path={CHILD_PATH.makerSearchScreenTemplateForm} element={<SearchScreenTemplateForm />} />
			<Route path={CHILD_PATH.checkerSearchScreenTemplateForm} element={<SearchScreenTemplateForm />} />
		</Route>
	)
)


ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
