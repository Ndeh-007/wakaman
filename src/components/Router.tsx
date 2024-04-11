import React from "react";
import {IonRouterOutlet} from "@ionic/react";
import {Redirect, Route} from "react-router-dom";
import Home from "../pages/Home";
import Edit from "../pages/Edit";
const Router: React.FC = () => {
    return (
        <IonRouterOutlet>
            <Route path={"/home"}>
                <Home></Home>
            </Route>
            <Route exact path="/">
                <Redirect to="/home"/>
            </Route>
            <Route path={"/edit"}>
                <Edit></Edit>
            </Route>
        </IonRouterOutlet>)
}

export default Router;