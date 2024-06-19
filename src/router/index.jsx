import React from "react";
import { createBrowserRouter as browserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../layout";
import {
  Login,
  OrderManagement,
  Reports,
  InvoiceManagement,
  ItemManagement,
  PurchaseManagement,
  StockManagement,
  Dashboard,
  Connector,
  EmailReports,
  Files,
  ItemMaster,
  OrgStructure,
  Routes,
  Taxes,
  Users,
  Zones,
} from "../pages";

import { Paths } from "../shared/constants";

const PrivateRoute = ({ children }) => {
  const { apiToken } = useSelector(({ auth }) => auth);

  return apiToken ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { apiToken } = useSelector(({ auth }) => auth);

  return !apiToken ? children : <Navigate to={Paths.dashboard} replace />;
};

const Router = () => {
  const router = browserRouter([
    {
      path: Paths.login,
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/",
      element: <Navigate to={Paths.dashboard} replace />,
    },
    {
      path: Paths.dashboard,
      element: (
        <PrivateRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: Paths.reports,
      element: (
        <PrivateRoute>
          <Layout>
            <Reports />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.sales.base + Paths.sales.invoice,
      element: (
        <PrivateRoute>
          <Layout>
            <InvoiceManagement />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.sales.base + Paths.sales.item,
      element: (
        <PrivateRoute>
          <Layout>
            <ItemManagement />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.sales.base + Paths.sales.order,
      element: (
        <PrivateRoute>
          <Layout>
            <OrderManagement />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.sales.base + Paths.sales.purchase,
      element: (
        <PrivateRoute>
          <Layout>
            <PurchaseManagement />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.sales.base + Paths.sales.stock,
      element: (
        <PrivateRoute>
          <Layout>
            <StockManagement />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.administration.base + Paths.administration.connector,
      element: (
        <PrivateRoute>
          <Layout>
            <Connector />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.administration.base + Paths.administration.emailReports,
      element: (
        <PrivateRoute>
          <Layout>
            <EmailReports />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.administration.base + Paths.administration.files,
      element: (
        <PrivateRoute>
          <Layout>
            <Files />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.administration.base + Paths.administration.itemMaster,
      element: (
        <PrivateRoute>
          <Layout>
            <ItemMaster />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.administration.base + Paths.administration.orgStructure,
      element: (
        <PrivateRoute>
          <Layout>
            <OrgStructure />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.administration.base + Paths.administration.routes,
      element: (
        <PrivateRoute>
          <Layout>
            <Routes />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.administration.base + Paths.administration.taxes,
      element: (
        <PrivateRoute>
          <Layout>
            <Taxes />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.administration.base + Paths.administration.users,
      element: (
        <PrivateRoute>
          <Layout>
            <Users />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "/" + Paths.administration.base + Paths.administration.zones,
      element: (
        <PrivateRoute>
          <Layout>
            <Zones />
          </Layout>
        </PrivateRoute>
      ),
    },
    {
      path: "*",
      element: <h1>No Page Found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
