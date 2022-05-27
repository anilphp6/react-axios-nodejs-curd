/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import React from "react";

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

import { Navbar, Button, Dropdown, DropdownButton } from "react-bootstrap";

import { loginRequest } from "../services/authConfig";

const NavigationBar = () => {

    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginPopup(loginRequest)
            .catch((error) => console.log(error))
    }

    return (
        <>
            <AuthenticatedTemplate>
                <DropdownButton variant="warning" className="ml-auto" title="Sign Out">
                    <Dropdown.Item as="button" onClick={() => instance.logoutPopup({ postLogoutRedirectUri: "/", mainWindowRedirectUri: "/" })}>Sign out using Popup</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => instance.logoutRedirect({ postLogoutRedirectUri: "/" })}>Sign out using Redirect</Dropdown.Item>
                </DropdownButton>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <DropdownButton variant="secondary" className="ml-auto" title="Sign In">
                    <Dropdown.Item as="button" onClick={handleLogin}>Sign in using Popup</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => instance.loginRedirect(loginRequest)}>Sign in using Redirect</Dropdown.Item>
                </DropdownButton>
            </UnauthenticatedTemplate>
        </>
    );
};

export const PageLayout = (props: any) => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <a className="navbar-brand" href="/">Microsoft identity platform</a>
                <NavigationBar />
            </Navbar>
            <br />
            <h5>Welcome to the Microsoft Authentication Library For React Tutorial</h5>
            <br />
            {props.children}
            <br />
            <AuthenticatedTemplate>
                <footer>
                    How did we do?
                </footer>
            </AuthenticatedTemplate>
        </>
    );
};

export const IdTokenClaims = (props: any) => {
    return (
        <div id="token-div">
            <p><strong>Audience: </strong> {props.idTokenClaims.aud}</p>
            <p><strong>Issuer: </strong> {props.idTokenClaims.iss}</p>
            <p><strong>OID: </strong> {props.idTokenClaims.oid}</p>
            <p><strong>UPN: </strong> {props.idTokenClaims.preferred_username}</p>
        </div>
    );
}