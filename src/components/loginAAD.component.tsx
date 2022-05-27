import React, { useState } from "react";

import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";

import { PageLayout, IdTokenClaims } from "./ui";

import Button from "react-bootstrap/Button";

import { PublicClientApplication } from "@azure/msal-browser";

import { msalConfig } from "../services/authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

const IdTokenContent = () => {

  const { accounts } = useMsal();
  const [idTokenClaims, setIdTokenClaims] = useState<any>();

  function GetIdTokenClaims() {
    //accounts && accounts[0].idTokenClaims && setIdTokenClaims(accounts[0].idTokenClaims)
    accounts && accounts[0].idTokenClaims && setIdTokenClaims(accounts[0].idTokenClaims)
  }

  return (
    <>
      <h5 className="card-title">Welcome {accounts[0].name}</h5>
      {idTokenClaims ?
        <IdTokenClaims idTokenClaims={idTokenClaims} />
        :
        <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>
      }
    </>
  );
};


const MainContent = () => {
  return (
    <div className="App">
      <AuthenticatedTemplate>
        <IdTokenContent />
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        <h5 className="card-title">Please sign-in to see your profile information.</h5>
      </UnauthenticatedTemplate>
    </div>
  );
};


function AdloginWindow(msalInstance: any) {
  return (
    <MsalProvider instance={msalInstance.msalInstance}>
      <PageLayout>
        <MainContent />
      </PageLayout>
    </MsalProvider>
  );
}

const loginAAD = () => {
  return (
    <div className="Ad-loin">
      <AdloginWindow msalInstance={msalInstance} />
    </div>
  );
}

export default loginAAD;