import React from "react";

// Helper function to get risk class based on risk code
const getRiskClass = (riskcode) => {
  switch (String(riskcode)) {
    case "3":
      return "risk-3";
    case "2":
      return "risk-2";
    case "1":
      return "risk-1";
    case "0":
      return "risk-0";
    case "-1":
      return "risk--1"; // Assuming -1 for False Positives based on HTML
    default:
      return "";
  }
};

// Helper function to get risk text based on risk code
const getRiskText = (riskcode) => {
  switch (String(riskcode)) {
    case "3":
      return "High";
    case "2":
      return "Medium";
    case "1":
      return "Low";
    case "0":
      return "Informational";
    case "-1":
      return "False Positive";
    default:
      return "Unknown";
  }
};

// Helper function to safely render HTML content
const createMarkup = (htmlContent) => {
  // Basic sanitization (replace with a robust library like DOMPurify in production)
  const sanitizedHtml = htmlContent.replace(/<script.*?>.*?<\/script>/gi, "");
  return { __html: sanitizedHtml };
};

const Report = ({ reportData }) => {
  if (!reportData || !reportData.site || reportData.site.length === 0) {
    return <p>No report data available.</p>;
  }

  // Assuming only one site in the report as per the example JSON
  const site = reportData.site[0];
  const alerts = site.alerts || []; //

  // Calculate summary counts
  const summaryCounts = alerts.reduce((acc, alert) => {
    const riskCode = String(alert.riskcode); //
    acc[riskCode] = (acc[riskCode] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1>ZAP Scanning Report</h1>
      <p />

      <h2>
        Site: {site["@name"]} {/* */}
      </h2>

      <h3>
        Generated on {reportData["@generated"]} {/* */}
      </h3>
      <h3>
        ZAP Version: {reportData["@version"]} {/* */}
      </h3>

      {/* Summary of Alerts */}
      <h3>Summary of Alerts</h3>
      <table className="summary">
        <thead>
          <tr>
            <th>Risk Level</th>
            <th align="center">Number of Alerts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="risk-3">
              <div>High</div>
            </td>
            <td align="center">
              <div>{summaryCounts["3"] || 0}</div>
            </td>
          </tr>
          <tr>
            <td className="risk-2">
              <div>Medium</div>
            </td>
            <td align="center">
              <div>{summaryCounts["2"] || 0}</div>
            </td>
          </tr>
          <tr>
            <td className="risk-1">
              <div>Low</div>
            </td>
            {/* Note: HTML uses risk-1 style for Low */}
            <td align="center">
              <div>{summaryCounts["1"] || 0}</div>
            </td>
          </tr>
          <tr>
            <td className="risk-0">
              <div>Informational</div>
            </td>
            <td align="center">
              <div>{summaryCounts["0"] || 0}</div>
            </td>
          </tr>
          {/* Assuming false positives might exist, add row if needed */}
          {/*
           <tr>
            <td className="risk--1"><div>False Positives:</div></td>
            <td align="center"><div>{summaryCounts['-1'] || 0}</div></td>
           </tr>
           */}
        </tbody>
      </table>
      <div className="spacer-lg"></div>

      {/* Alert Details */}
      <h3>Alert Detail</h3>
      {alerts.map((alert, index) => (
        <div key={alert.pluginid || index}>
          {" "}
          {/* */}
          <table className="results">
            <thead>
              <tr>
                <th className={getRiskClass(alert.riskcode)}>
                  {" "}
                  {/* */}
                  <a id={alert.pluginid}></a> {/* */}
                  <div>{getRiskText(alert.riskcode)}</div> {/* */}
                </th>
                <th className={getRiskClass(alert.riskcode)}>
                  {alert.alert} {/* */}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="20%">Description</td>
                {/* Use dangerouslySetInnerHTML for HTML content from JSON */}
                <td
                  width="80%"
                  dangerouslySetInnerHTML={createMarkup(alert.desc)}
                ></td>{" "}
                {/* */}
              </tr>
              <tr>
                <td colSpan={2}></td>
              </tr>
              {alert.instances &&
                alert.instances.map(
                  (
                    instance,
                    i //
                  ) => (
                    <React.Fragment key={instance.uri + i}>
                      {" "}
                      {/* */}
                      <tr>
                        <td width="20%" className="indent1">
                          URL
                        </td>
                        <td width="80%">
                          <a href={instance.uri}>{instance.uri}</a>
                        </td>{" "}
                        {/* */}
                      </tr>
                      <tr>
                        <td width="20%" className="indent2">
                          Method
                        </td>
                        <td width="80%">{instance.method}</td> {/* */}
                      </tr>
                      <tr>
                        <td width="20%" className="indent2">
                          Parameter
                        </td>
                        <td width="80%">{instance.param || "(N/A)"}</td> {/* */}
                      </tr>
                      <tr>
                        <td width="20%" className="indent2">
                          Attack
                        </td>
                        <td width="80%">{instance.attack || "(N/A)"}</td>{" "}
                        {/* */}
                      </tr>
                      <tr>
                        <td width="20%" className="indent2">
                          Evidence
                        </td>
                        <td width="80%">{instance.evidence || "(N/A)"}</td>{" "}
                        {/* */}
                      </tr>
                      <tr>
                        <td width="20%" className="indent2">
                          Other Info
                        </td>
                        {/* Use dangerouslySetInnerHTML if otherinfo might contain HTML */}
                        <td
                          width="80%"
                          dangerouslySetInnerHTML={createMarkup(
                            instance.otherinfo || "(N/A)"
                          )}
                        ></td>{" "}
                        {/* */}
                      </tr>
                    </React.Fragment>
                  )
                )}
              <tr>
                <td width="20%">Instances</td>
                <td width="80%">{alert.count}</td> {/* */}
              </tr>
              <tr>
                <td width="20%">Solution</td>
                {/* Use dangerouslySetInnerHTML for HTML content from JSON */}
                <td
                  width="80%"
                  dangerouslySetInnerHTML={createMarkup(alert.solution)}
                ></td>{" "}
                {/* */}
              </tr>
              <tr>
                <td width="20%">Reference</td>
                {/* Use dangerouslySetInnerHTML for HTML content from JSON */}
                <td
                  width="80%"
                  dangerouslySetInnerHTML={createMarkup(alert.reference)}
                ></td>{" "}
                {/* */}
              </tr>
              <tr>
                <td width="20%">CWE Id</td>
                <td width="80%">
                  <a
                    href={`https://cwe.mitre.org/data/definitions/${alert.cweid}.html`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {alert.cweid} {/* */}
                  </a>
                </td>
              </tr>
              <tr>
                <td width="20%">WASC Id</td>
                <td width="80%">
                  {alert.wascid} {/* */}
                </td>
              </tr>
              <tr>
                <td width="20%">Plugin Id</td>
                <td width="80%">
                  <a
                    href={`https://www.zaproxy.org/docs/alerts/${alert.pluginid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {alert.pluginid} {/* */}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="spacer"></div>
        </div>
      ))}
    </div>
  );
};

export default Report;
