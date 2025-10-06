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

  const openLogger=(accountId)=>{
    navigation.openNerdlet({
    id: 'logger.home',
    urlState: {
      accountId: accountId,
      query: dashData.logFilter, // <- query not mutableQuery     
    }
  });
  }


  return (
        <>
        <PlatformStateContext.Consumer>
        {(platformState) => {
            let variables={};
            let filters='';
            let logFilter=null;
            let dashboardGUID=null;
            if(platformState.filters && !dashData.guid) {
              try {
                const urlDecodedData = decodeURIComponent((platformState.filters + '').replace(/\+/g, '%20'));
                console.log("urlDecodedData",urlDecodedData)
                const deepLinkData = JSON.parse(urlDecodedData);
                variables=deepLinkData.variables ? JSON.parse(deepLinkData.variables) : {}
                filters= deepLinkData.filters || '';
                logFilter = deepLinkData.logFilter || null;
                //dashboardGUID = deepLinkData.guid || null;
                dashboardGUID = deepLinkData.guid && deepLinkData.guid!= "" ? deepLinkData.guid :  "NOGUID";
               
                setDashData({guid:dashboardGUID,variables:variables,filters:filters, logFilter:logFilter});
          
              } catch (error) {
                console.error("Error parsing platformState.filters", error);
              }
            }
           if(dashData.guid && dashData.guid!="NOGUID") {
              if(!hasDashOpened) {
                openDash();
                setHasDashOpened(true);
              }
              return   <Card>
                  <CardBody >
                      Redirecting you to <a onClick={()=>{openDash();}}>dashboard</a>...
                  </CardBody>
                </Card>
              
           } else if(dashData.logFilter && logFilter!=='') {
                  if(!hasDashOpened) {
                    openLogger(platformState.accountId);
                    setHasDashOpened(true);
                  }
                  return   <Card>
                      <CardBody >
                          Redirecting you to <a onClick={()=>{openLogger();}}>logs</a>...
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