(()=>{"use strict";var e={109:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){if(r===undefined)r=n;Object.defineProperty(e,r,{enumerable:true,get:function(){return t[n]}})}:function(e,t,n,r){if(r===undefined)r=n;e[r]=t[n]});var o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:true,value:t})}:function(e,t){e["default"]=t});var s=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(n!=="default"&&Object.prototype.hasOwnProperty.call(e,n))r(t,e,n);o(t,e);return t};var i=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function fulfilled(e){try{step(r.next(e))}catch(e){o(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){o(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:true});t.toChatworkMessage=t.postMessage=t.extractUsers=void 0;const u=s(n(186));const a=s(n(211));const c=s(n(191));function parseInput(){const e=+u.getInput("roomid");const t=u.getInput("token");const n=JSON.parse(u.getInput("mapping"));const r=JSON.parse(u.getInput("context"));const o=u.getInput("ignoreBody")==="true";return{roomId:e,token:t,mapping:n,context:r,ignoreBody:o}}function extractUsers(e){const t=[];const n=[...e];let r=0;while(r<n.length){const o=n[r++];if(o!=="@")continue;if(r<n.length){const o=n[r];if(!isAlphaNumeric(o))continue;const s=[];s.push(o);while(++r<n.length){const t=n[r];const o=t==="-";const i=t==="/";if(!(o||i||isAlphaNumeric(t)))break;const u=r+1<e.length?isAlphaNumeric(e[r+1]):false;if(o&&!u)break;if(i&&(!u||s.includes("/")))break;s.push(t)}const i=s.join("");if(!t.includes(i))t.push(i)}}return t}t.extractUsers=extractUsers;function isAlphaNumeric(e){return/^[a-z0-9]+$/i.test(e)}function toChatworkUsers(e,t){return e.map((e=>t[e])).filter((e=>e!=null))}function postMessage(e,t){return new Promise(((n,r)=>{const o={hostname:"api.chatwork.com",port:443,path:`/v2/rooms/${e.roomId}/messages`,method:"POST",headers:{"X-ChatWorkToken":e.token,"Content-Type":"application/x-www-form-urlencoded"}};const s=a.request(o,(e=>{if(e.statusCode!==200){r(new Error(`status code error. status code: ${e.statusCode}`))}e.setEncoding("utf8");let t="";e.on("data",(e=>t+=e));e.on("end",(()=>{try{n(JSON.parse(t))}catch(e){r(e)}}))}));s.on("error",r);s.write(`body=${c.escape(t)}`,(e=>{if(e!=null)r(e)}));s.end()}))}t.postMessage=postMessage;function toChatworkMessage(e,t,n){var r,o,s,i,u,a;const c=e.event.issue||e.event.pull_request;const l=c===null||c===void 0?void 0:c.title;const d=(o=(r=e.event.comment)===null||r===void 0?void 0:r.html_url)!==null&&o!==void 0?o:c===null||c===void 0?void 0:c.html_url;const p=(u=(i=(s=e.event.comment)===null||s===void 0?void 0:s.body)!==null&&i!==void 0?i:c===null||c===void 0?void 0:c.body)!==null&&u!==void 0?u:"";let f=extractUsers(p);if(c!=null){const e=c.assignees.concat((a=c.requested_reviewers)!==null&&a!==void 0?a:[]).map((e=>e.login));f=f.concat(e).filter(((e,t,n)=>n.indexOf(e)===t))}const m=toChatworkUsers(f,t);let h=m.length>0?`${m.join("\n")}\n`:"";h+=`title: ${l}\nurl: ${d}\n`;if(!n)h+=`\n${p}`;return h}t.toChatworkMessage=toChatworkMessage;function run(){return i(this,void 0,void 0,(function*(){try{const e=parseInput();u.debug(`event_name: ${e.context.event_name}`);u.debug(`event.action: ${JSON.stringify(e.context.event.action)}`);const t=toChatworkMessage(e.context,e.mapping,e.ignoreBody);u.debug(`message body: ${t}`);const n=yield postMessage(e,t);u.debug(`response: ${n}`);u.setOutput("messageId",n.message_id)}catch(e){u.setFailed(e.message)}}))}run()},351:function(e,t,n){var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const o=r(n(87));const s=n(278);function issueCommand(e,t,n){const r=new Command(e,t,n);process.stdout.write(r.toString()+o.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const i="::";class Command{constructor(e,t,n){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=n}toString(){let e=i+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const n in this.properties){if(this.properties.hasOwnProperty(n)){const r=this.properties[n];if(r){if(t){t=false}else{e+=","}e+=`${n}=${escapeProperty(r)}`}}}}e+=`${i}${escapeData(this.message)}`;return e}}function escapeData(e){return s.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return s.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},186:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,o){function fulfilled(e){try{step(r.next(e))}catch(e){o(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){o(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())}))};var o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(351);const i=n(717);const u=n(278);const a=o(n(87));const c=o(n(622));var l;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(l=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){const n=u.toCommandValue(t);process.env[e]=n;const r=process.env["GITHUB_ENV"]||"";if(r){const t="_GitHubActionsFileCommandDelimeter_";const r=`${e}<<${t}${a.EOL}${n}${a.EOL}${t}`;i.issueCommand("ENV",r)}else{s.issueCommand("set-env",{name:e},n)}}t.exportVariable=exportVariable;function setSecret(e){s.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){const t=process.env["GITHUB_PATH"]||"";if(t){i.issueCommand("PATH",e)}else{s.issueCommand("add-path",{},e)}process.env["PATH"]=`${e}${c.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const n=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!n){throw new Error(`Input required and not supplied: ${e}`)}return n.trim()}t.getInput=getInput;function setOutput(e,t){s.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setCommandEcho(e){s.issue("echo",e?"on":"off")}t.setCommandEcho=setCommandEcho;function setFailed(e){process.exitCode=l.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){s.issueCommand("debug",{},e)}t.debug=debug;function error(e){s.issue("error",e instanceof Error?e.toString():e)}t.error=error;function warning(e){s.issue("warning",e instanceof Error?e.toString():e)}t.warning=warning;function info(e){process.stdout.write(e+a.EOL)}t.info=info;function startGroup(e){s.issue("group",e)}t.startGroup=startGroup;function endGroup(){s.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return r(this,void 0,void 0,(function*(){startGroup(e);let n;try{n=yield t()}finally{endGroup()}return n}))}t.group=group;function saveState(e,t){s.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},717:function(e,t,n){var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const o=r(n(747));const s=r(n(87));const i=n(278);function issueCommand(e,t){const n=process.env[`GITHUB_${e}`];if(!n){throw new Error(`Unable to find environment variable for file command ${e}`)}if(!o.existsSync(n)){throw new Error(`Missing file at path: ${n}`)}o.appendFileSync(n,`${i.toCommandValue(t)}${s.EOL}`,{encoding:"utf8"})}t.issueCommand=issueCommand},278:(e,t)=>{Object.defineProperty(t,"__esModule",{value:true});function toCommandValue(e){if(e===null||e===undefined){return""}else if(typeof e==="string"||e instanceof String){return e}return JSON.stringify(e)}t.toCommandValue=toCommandValue},747:e=>{e.exports=require("fs")},211:e=>{e.exports=require("https")},87:e=>{e.exports=require("os")},622:e=>{e.exports=require("path")},191:e=>{e.exports=require("querystring")}};var t={};function __nccwpck_require__(n){var r=t[n];if(r!==undefined){return r.exports}var o=t[n]={exports:{}};var s=true;try{e[n].call(o.exports,o,o.exports,__nccwpck_require__);s=false}finally{if(s)delete t[n]}return o.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var n=__nccwpck_require__(109);module.exports=n})();