import React, { useState } from "react";

import { MsalProvider, AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { AuthenticationResult } from "@azure/msal-common";
import { PageLayout, IdTokenClaims } from "./ui";
import { loginRequest } from "../services/authConfig";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { PublicClientApplication } from "@azure/msal-browser";

import { msalConfig } from "../services/authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

const IdTokenContent = () => {

  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState<any>();
  const [idTokenClaims, setIdTokenClaims] = useState<any>();
  const [profileData, setprofileData] = useState<any>([]);

  function GetIdTokenClaims() {
    accounts && accounts[0].idTokenClaims && setIdTokenClaims(accounts[0].idTokenClaims)
  }
  const GetIdToke = () => {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };
    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(request).then((response: AuthenticationResult) => {
      console.log(response)
      setAccessToken(response.accessToken);
    }).catch((e) => {
      instance.acquireTokenPopup(request).then((response: AuthenticationResult) => {
        setAccessToken(response.accessToken);
      });
    });
  }
  const getUserPhoto = async (token: string, userId: any) => {
    return await axios({
      method: 'get',
      //'https://graph.microsoft.com/beta' /me/photos/240x240/$value
      // url: 'https://graph.microsoft.com/v1.0/users/' + userId + '/photo/$value',
      url: 'https://graph.microsoft.com/v1.0/users/v-aravat@microsoft.com',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      }
    }).then((res: any) => {
      return res;
    }).catch((e) => {
      console.log('Error:sssss', e);
      return e.mess
    })
  }

  const graphApi = () => {
    getUserPhoto(accessToken, '').then((r) => {
      setprofileData(r.data)
    })
  }

  return (
    <>
      <h5 className="card-title">Welcome {accounts[0].name}</h5>
      {idTokenClaims ?
        <IdTokenClaims idTokenClaims={idTokenClaims} />
        :
        <Button variant="secondary" onClick={GetIdTokenClaims}>View ID Token Claims</Button>

      }
      {!accessToken && <div style={{ marginTop: '10px' }}>
        <Button variant="secondary" onClick={GetIdToke}>Get access Token(JWT)</Button>
      </div>
      }
      {accessToken && <pre>
        AccessToken JWT: {accessToken}
      </pre>
      }
      {profileData.length === 0 && <div style={{ marginTop: '10px' }}>
        <Button variant="secondary" onClick={graphApi}>Get profile Data(Graph api)</Button>
      </div>
      }
      {profileData.length !== 0 && <pre>
        Graph APi Data:{

          //JSON.stringify(profileData, null, '\t').replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
          JSON.stringify(profileData, undefined, 2)
        }
      </pre>
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