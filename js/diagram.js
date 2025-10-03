// ATTENTION: if you change this file, make sure to re-calculate the integrity hash used in base.html
import mermaid from "mermaid";
import Dot2MermaidAdapter from /* webpackPrefetch: true */ "dot2mermaid/src/dot2mermaid.mjs";
import Handlebars from "handlebars";

Handlebars.registerHelper("labeled", function (value) {
  return value !== null;
});

Handlebars.registerHelper("node_check", function (value1, value2) {
  return value1 === value2;
});
let mermaidFlowchartTemplate = Handlebars.compile(`
flowchart {{direction}}
  {{#each edges as |e|}}
        {{e.from}}["{{e.fromLabel}}"]-->{{e.to}}["{{e.toLabel}}"]
  {{/each}}

  {{#if subgraphs}}
    {{#each subgraphs as |s|}}
      subgraph {{s.label}}
      {{#each s.edges as |e|}}
        {{e.from}}["{{e.fromLabel}}"]-->{{e.to}}["{{e.toLabel}}"]
      {{/each}}
      end
    {{/each}}
  {{/if}}
`);
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("code[data-lang='graphviz']").forEach((element) => {
    let graphContext = new Dot2MermaidAdapter(
      element.textContent
    ).getGraphContext();
    let renderedMermaiFlowchart = mermaidFlowchartTemplate(graphContext);
    const pre = element.parentElement;
    if (pre.tagName.toLowerCase() === "pre") {
      pre.className = "mermaid";
      pre.style = {};
      pre.textContent = `
      ${renderedMermaiFlowchart}
      `;
    }
  });
  document.querySelectorAll("code[data-lang='mermaid']").forEach((element) => {
    console.log("Found mermaid diagram");
    const pre = element.parentElement;
    if (pre.tagName.toLowerCase() === "pre") {
      pre.className = "mermaid";
      pre.style = {};
      pre.textContent = element.textContent;
    }
  });
  mermaid.initialize({
    layout: "elk",
    startOnLoad: true,
    logLevel: "error",
  });
});
