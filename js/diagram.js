// ATTENTION: if you change this file, make sure to re-calculate the integrity hash used in base.html
import Dot2MermaidAdapter from  "dot2mermaid/src/dot2mermaid.mjs";
import mermaid from "mermaid";
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
	console.log("loaded question mark")
mermaid.initialize({
			startOnLoad: true,
			theme: 'default',
	})


  document.querySelectorAll("code[data-lang='graphviz']").forEach(async (element) => {
    let graphContext = new Dot2MermaidAdapter(
      element.textContent
    ).getGraphContext();
    let renderedMermaiFlowchart = mermaidFlowchartTemplate(graphContext);
	  console.log(renderedMermaiFlowchart)
    const pre = element.parentElement;
	  pre.className = "mermaid"
	  pre.style = {}
	  pre.textContent = renderedMermaiFlowchart;
	  console.log("rendered")


  });
  document.querySelectorAll("code[data-lang='mermaid']").forEach(async (element) => {
    console.log("Found mermaid diagram");
    const pre = element.parentElement;
	  pre.textContent = element.textContent;
	  pre.className = "mermaid"
	  pre.style = {}
	  console.log("rendered mermaid")
    });
});


