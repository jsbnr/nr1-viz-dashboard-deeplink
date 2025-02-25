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

Add the custom visualisation to a new dashboard. Copy the link to the newly created dashboard and add a `filters` query parameter with the following JSON object as a value:

```
{ 
    "guid": "<GUID of Dashboard (or Page) you want to deep link to>",
    "filters: "<filter string>",
    "variables: "<variables stringified object>"
}
```

> The filters and variables are optional depending on your use case. You can provide both.

Example deep link:

```
https://one.newrelic.com/dashboards/detail/MzQ5....jA?state=c09...b0f0&filters={"guid":"Mzkz...GUID..YzMTg","filters":"appName='myAppName'","variables":"{\"exampleVar\":\"exampleValue\"}"}
```


