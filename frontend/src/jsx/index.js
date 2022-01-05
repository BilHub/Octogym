import React, { useState } from "react";

/// React router dom
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
/// Css
import "./index.css";
import "./chart.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

/// App

// import Calendar from "./components/AppsMenu/Calendar/Calendar";

import ClientList from "./components/clients/ClientList";
import EditClient from "./components/clients/ClientEdit";
import ClientDetail from "./components/clients/ClientDetail";
import ClientCreate from "./components/clients/ClientCreate";
import Clients from "./components/clients/Clients";
import PresenceList from "./components/presence/PresenceList";
// import PresenceDetail from "./components/presence/PresenceDetail";
// import PresenceEdit from "./components/presence/PresenceEdit";

// import SalleCreate from "./components/salle/SalleCreate";
import Salle from "./components/salle/Salle";
import PlanningList from "./components/planning/PlanningList";
import PlaningCreate from "./components/planning/PlanningCreate";
import PlaningEdit from "./components/planning/PlanningEdit";
import Calendar from "./components/planning/Calendar";

import TransactionsList from "./components/transactions/TransactionsList";
import TransactionDetail from "./components/transactions/TransactionDetail";
// Personnels Imports
import PersonnelList from "./components/personnels/PersonnelList";
import PersonnelDetail from "./components/personnels/PersonnelDetail";
import PersonnelEdit from "./components/personnels/PersonnelEdit";
import PersonnelCreate from "./components/personnels/PersonnelCreate";

// Coachs Imports
import CoachList from "./components/coachs/CoachList";

import CoachDetail from "./components/coachs/CoachDetail";
import CoachEdit from "./components/coachs/CoachEdit";
import CoachCreate from "./components/coachs/CoachCreate";

import Customers from "./components/AppsMenu/Shop/Customers/Customers";
import Invoice from "./components/AppsMenu/Shop/Invoice/Invoice";

//// PaiementCreate
import PaiementCreate from "./components/transactions/PaiementCreate";
import AutreCreate from "./components/transactions/AutreCreate";
import AssuranceCreate from "./components/transactions/AssuranceCreate";
import RemCreate from "./components/transactions/RemCreate";
import RemCoachCreate from "./components/transactions/RemCoachCreate";
/// Abonnements
import AbonnementList from "./components/abonnement/AbonnementList";
import AbonnementEdit from "./components/abonnement/AbonnementEdit";
import AbonnementCreate from "./components/abonnement/AbonnementCreate";

/// Table
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Form
import Element from "./components/Forms/Element/Element";
import Wizard from "./components/Forms/Wizard/Wizard";
import SummerNote from "./components/Forms/Summernote/SummerNote";
import Pickers from "./components/Forms/Pickers/Pickers";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";

import Tresorie from "./components/tresorie/Tresorie";

/// Dashboard
import Home from "./components/Dashboard/Home";
import Wallet from "./components/Dashboard/Wallet";
import CoinDetails from "./components/Dashboard/CoinDetails";
import Portofolio from "./components/Dashboard/Portofolio";
import Transactions from "./components/Dashboard/Transactions";
import MarketCapital from "./components/Dashboard/MarketCapital";
import Configuration from "./components/configuration/Configuration";
import PrivateRoute from "./context/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
const Markup = () => {
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("login");

  const [activeEvent, setActiveEvent] = useState(!path);

  const routes = [
    /// Dashboard
    // { url: "", component: Home },
    // { url: "login", component: Login },
    { url: "my-wallet", component: Wallet },
    { url: "coin-details", component: CoinDetails },
    { url: "portfolio", component: Portofolio },
    { url: "market-capital", component: MarketCapital },

    /// Apps
    // { url: "app-profile", component: AppProfile },

    // { url: "app-calender", component: Calendar },
    // { url: "post-details", component: PostDetails },

    /// Widget
    // { url: "widget-basic", component: Widget },
    /// CONFIGURATION
    { url: "configuration", component: Configuration },

    { url: "ecom-invoice", component: Invoice },

    // trésorie
    { url: "tresorie", component: Tresorie },
    // Transactions
    { url: "transaction", component: CoinDetails },
    // clients
    // { url: "clients", component: ClientList },
    { url: "client", component: ClientList },
    { url: "presences", component: PresenceList },
    // { url: "presence/detail/:id", component: PresenceDetail },
    // { url: "presence/edit/:id", component: PresenceEdit },

    { url: "client/create", component: ClientCreate },
    { url: "client/:id", component: ClientDetail },
    { url: "client/edit/:id", component: EditClient },
    // { url: "create/abonnee/new", component: Clients },
    // { url: "create/abonnee/new", component: Clients },

    // { url: "hashtag", component: EditProfile },

    // { url: "create/salle", component: SalleCreate },
    { url: "salle", component: Salle },
    { url: "planning", component: PlanningList },
    { url: "planning/create", component: PlaningCreate },
    { url: "planning/edit/:id", component: PlaningEdit },
    { url: "planning/calendar", component: Calendar },
    { url: "creneaux", component: Calendar },

    // { urlPlaningEdit: "create/planning", component: PlaningCreate },   PlaningEdit

    // Personnels URLS
    { url: "personnel", component: PersonnelList },
    { url: "personnel/create", component: PersonnelCreate },
    { url: "personnel/edit/:id", component: PersonnelEdit },
    { url: "personnel/:id", component: PersonnelDetail },

    // Coachs URLS
    { url: "coach", component: CoachList },
    { url: "coach/create", component: CoachCreate },
    { url: "coach/:id", component: CoachDetail },
    { url: "coach/edit/:id", component: CoachEdit },

    /// Transactions CREATION
    { url: "paiements/create", component: PaiementCreate },
    { url: "autre/create", component: AutreCreate },
    { url: "assurance/create", component: AssuranceCreate },
    { url: "remuneration/coach/create", component: RemCoachCreate },
    { url: "remuneration/create", component: RemCreate },

    /// Transactions
    { url: "transactions", component: TransactionsList },
    // { url: "transactions/create", component: TransactionCreate },
    // { url: "transactions/edit/:id", component: TransactionEdit },
    { url: "transactions/:id", component: TransactionDetail },
    // Abonnements

    { url: "abonnements", component: AbonnementList },
    { url: "abonnements/edit/:id", component: AbonnementEdit },
    { url: "abonnements/create", component: AbonnementCreate },
    // { url: "coachs-personnels", component: Customers },
    { url: "form-wizard", component: Wizard },
    // { url: "form-wizard", component: Wizard },
    { url: "form-editor-summernote", component: SummerNote },
    { url: "form-pickers", component: Pickers },

    /// table
    { url: "table-datatable-basic", component: DataTable },
    { url: "table-bootstrap-basic", component: BootstrapTable },

    /// pages
    { url: "register", component: Registration },
    { url: "page-lock-screen", component: LockScreen },
    { url: "login", component: Login },
    { url: "page-forgot-password", component: ForgotPassword },
    { url: "page-error-400", component: Error400 },
    { url: "page-error-403", component: Error403 },
    { url: "page-error-404", component: Error404 },
    { url: "page-error-500", component: Error500 },
    { url: "page-error-503", component: Error503 },
  ];

  return (
    <Router basename="/">
      <AuthProvider>
        {/* <Redirect from='/' to='/login' /> */}
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show menu-toggle" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                <PrivateRoute component={Home} path="/" exact />
                <Route component={Login} path="/login" />

                {routes.map((data, i) => (
                  <Route
                    key={i}
                    exact
                    path={`/${data.url}`}
                    component={data.component}
                  />
                ))}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
      </AuthProvider>
    </Router>
  );
};

export default Markup;
