import React, {useState} from "react";
import { navigation, PlatformStateContext, Spinner, Card, CardBody} from 'nr1';


const DeepLink = () => {
  const [hasDashOpened, setHasDashOpened] = useState(false);
  const [dashData, setDashData] = useState({});


  const openDash=()=>{
    navigation.openNerdlet({
      id: 'dashboards.detail',
      urlState: {
        entityGuid: dashData.guid,
        filters: dashData.filters,
        selectedVariables: dashData.variables,
        useDefaultTimeRange: false
      }
    });
  }

  return (
        <>
        <PlatformStateContext.Consumer>
        {(platformState) => {
            let variables={};
            let filters='';
            let dashboardGUID=null;
            if(platformState.filters && !dashData.guid) {
              try {
                const urlDecodedData = decodeURIComponent((platformState.filters + '').replace(/\+/g, '%20'));
                console.log("urlDecodedData",urlDecodedData)
                const deepLinkData = JSON.parse(urlDecodedData);
                variables=deepLinkData.variables ? JSON.parse(deepLinkData.variables) : {}
                filters= deepLinkData.filters || '';
                dashboardGUID = deepLinkData.guid || null;
               
                setDashData({guid:dashboardGUID,variables:variables,filters:filters});
          
              } catch (error) {
                console.error("Error parsing platformState.filters", error);
              }
            }
           if(dashData.guid) {
              if(!hasDashOpened) {
                openDash();
                setHasDashOpened(true);
              }
              return   <Card>
                  <CardBody >
                      Redirecting you to <a onClick={()=>{openDash();}}>dashboard</a>...
                  </CardBody>
                </Card>
              
           } else {
             return <Spinner />
           }
          
    }}
</PlatformStateContext.Consumer>
        
        </>
  );
};

export default DeepLink;