# New Relic Dashboard Deep Link
This custom visualisation allows you to deep link to a dashboard providing filter or dashboard variable values.

## Installation

- Install the [nr1 cli](https://docs.newrelic.com/docs/new-relic-solutions/new-relic-one/build-nr-apps/set-up-dev-env/)
- Clone this repo
- Run `npm install`
- Ensure you have correct profile selected `nr1 profiles:default`
- Generate a UUID for your acocunt  `nr1 nerdpack:uuid -gf`
- Publish to your account: `nr1 nerdpack:publish`
- Subscribe your account to nerdpack: `nr1 subscription:set`

## Usage

Add the custom visualisation to a new dashboard. Copy the link to the newly created dashboard (including the state url parm) and add a `filters` query parameter with the following JSON object as a value:

```
{ 
    "guid": "<GUID of Dashboard (or Page) you want to deep link to>",
    "filters: "<filter string>",
    "variables: "<variables stringified object>"
}
```

> You can provide a timerange as a duration (in milliseconds) or begin/end (as unix timestamps) in the url, see example

> The filters and variables are optional depending on your use case. You can provide both.

Example deep link setting filters and variables:

```
https://one.newrelic.com/dashboards/detail/MzQ5...DASHBOARD_GUID_CONTAINING_CUSTOM_VIZ...jA?state=c09...cb0f&filters={"guid":"Mzkz...GUID_OF_DASHBOARD_TO_LINK_TO..YzMTg","filters":"appName='myAppName'","variables":"{\"exampleVar\":\"exampleValue\"}"}
```

Example deep link setting begin and end time (and filters and variables):
```
https://one.newrelic.com/dashboards/detail/MzQ5...DASHBOARD_GUID_CONTAINING_CUSTOM_VIZ...jA?state=c09...cb0f&begin=1740787200000&end=1740830400000&filters={"guid":"Mzkz...GUID_OF_DASHBOARD_TO_LINK_TO..YzMTg","filters":"appName='myAppName'","variables":"{\"exampleVar\":\"exampleValue\"}"}
```

Example deep link setting duration (24hrs)  (and filters and variables):
```
https://one.newrelic.com/dashboards/detail/MzQ5...DASHBOARD_GUID_CONTAINING_CUSTOM_VIZ...jA?state=c09...cb0f&duration=86400000&filters={"guid":"Mzkz...GUID_OF_DASHBOARD_TO_LINK_TO..YzMTg","filters":"appName='myAppName'","variables":"{\"exampleVar\":\"exampleValue\"}"}
```
