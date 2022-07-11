import React, { FunctionComponent, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import PageLayout from "../components/Layout";

type NotFoundPagePropsInterface = {};

export const NotFoundPage: FunctionComponent<NotFoundPagePropsInterface> = (): ReactElement => {

    const history = useHistory();

    return (
        <PageLayout>
            <h3>
                404: Page not found
            </h3>
            <button className="btn primary" onClick={() => { history.push("/home") }}>Go back to home</button>
        </PageLayout>
    );
};
