import{o as F,_ as $,l as P,u as A}from"./useMergedRefs-ffb77068.js";import{R as x,p as S,r as c,j as H}from"./index-3d8791b8.js";function R(n,o){return R=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,e){return r.__proto__=e,r},R(n,o)}function V(n,o){n.prototype=Object.create(o.prototype),n.prototype.constructor=n,R(n,o)}function Y(n){var o=F(n);return o&&o.defaultView||window}function Z(n,o){return Y(n).getComputedStyle(n,o)}var z=/([A-Z])/g;function B(n){return n.replace(z,"-$1").toLowerCase()}var q=/^ms-/;function C(n){return B(n).replace(q,"-ms-")}var J=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;function K(n){return!!(n&&J.test(n))}function _(n,o){var i="",r="";if(typeof o=="string")return n.style.getPropertyValue(C(o))||Z(n).getPropertyValue(C(o));Object.keys(o).forEach(function(e){var t=o[e];!t&&t!==0?n.style.removeProperty(C(e)):K(e)?r+=e+"("+t+") ":i+=C(e)+": "+t+";"}),r&&(i+="transform: "+r+";"),n.style.cssText+=";"+i}const k={disabled:!1},w=x.createContext(null);var Q=function(o){return o.scrollTop},N="unmounted",E="exited",v="entering",g="entered",y="exiting",f=function(n){V(o,n);function o(r,e){var t;t=n.call(this,r,e)||this;var a=e,s=a&&!a.isMounting?r.enter:r.appear,u;return t.appearStatus=null,r.in?s?(u=E,t.appearStatus=v):u=g:r.unmountOnExit||r.mountOnEnter?u=N:u=E,t.state={status:u},t.nextCallback=null,t}o.getDerivedStateFromProps=function(e,t){var a=e.in;return a&&t.status===N?{status:E}:null};var i=o.prototype;return i.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},i.componentDidUpdate=function(e){var t=null;if(e!==this.props){var a=this.state.status;this.props.in?a!==v&&a!==g&&(t=v):(a===v||a===g)&&(t=y)}this.updateStatus(!1,t)},i.componentWillUnmount=function(){this.cancelNextCallback()},i.getTimeouts=function(){var e=this.props.timeout,t,a,s;return t=a=s=e,e!=null&&typeof e!="number"&&(t=e.exit,a=e.enter,s=e.appear!==void 0?e.appear:a),{exit:t,enter:a,appear:s}},i.updateStatus=function(e,t){if(e===void 0&&(e=!1),t!==null)if(this.cancelNextCallback(),t===v){if(this.props.unmountOnExit||this.props.mountOnEnter){var a=this.props.nodeRef?this.props.nodeRef.current:S.findDOMNode(this);a&&Q(a)}this.performEnter(e)}else this.performExit();else this.props.unmountOnExit&&this.state.status===E&&this.setState({status:N})},i.performEnter=function(e){var t=this,a=this.props.enter,s=this.context?this.context.isMounting:e,u=this.props.nodeRef?[s]:[S.findDOMNode(this),s],l=u[0],p=u[1],d=this.getTimeouts(),b=s?d.appear:d.enter;if(!e&&!a||k.disabled){this.safeSetState({status:g},function(){t.props.onEntered(l)});return}this.props.onEnter(l,p),this.safeSetState({status:v},function(){t.props.onEntering(l,p),t.onTransitionEnd(b,function(){t.safeSetState({status:g},function(){t.props.onEntered(l,p)})})})},i.performExit=function(){var e=this,t=this.props.exit,a=this.getTimeouts(),s=this.props.nodeRef?void 0:S.findDOMNode(this);if(!t||k.disabled){this.safeSetState({status:E},function(){e.props.onExited(s)});return}this.props.onExit(s),this.safeSetState({status:y},function(){e.props.onExiting(s),e.onTransitionEnd(a.exit,function(){e.safeSetState({status:E},function(){e.props.onExited(s)})})})},i.cancelNextCallback=function(){this.nextCallback!==null&&(this.nextCallback.cancel(),this.nextCallback=null)},i.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t)},i.setNextCallback=function(e){var t=this,a=!0;return this.nextCallback=function(s){a&&(a=!1,t.nextCallback=null,e(s))},this.nextCallback.cancel=function(){a=!1},this.nextCallback},i.onTransitionEnd=function(e,t){this.setNextCallback(t);var a=this.props.nodeRef?this.props.nodeRef.current:S.findDOMNode(this),s=e==null&&!this.props.addEndListener;if(!a||s){setTimeout(this.nextCallback,0);return}if(this.props.addEndListener){var u=this.props.nodeRef?[this.nextCallback]:[a,this.nextCallback],l=u[0],p=u[1];this.props.addEndListener(l,p)}e!=null&&setTimeout(this.nextCallback,e)},i.render=function(){var e=this.state.status;if(e===N)return null;var t=this.props,a=t.children;t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef;var s=$(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]);return x.createElement(w.Provider,{value:null},typeof a=="function"?a(e,s):x.cloneElement(x.Children.only(a),s))},o}(x.Component);f.contextType=w;f.propTypes={};function T(){}f.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:T,onEntering:T,onEntered:T,onExit:T,onExiting:T,onExited:T};f.UNMOUNTED=N;f.EXITED=E;f.ENTERING=v;f.ENTERED=g;f.EXITING=y;const tt=f;function et(n,o,i,r){if(i===void 0&&(i=!1),r===void 0&&(r=!0),n){var e=document.createEvent("HTMLEvents");e.initEvent(o,i,r),n.dispatchEvent(e)}}function nt(n){var o=_(n,"transitionDuration")||"",i=o.indexOf("ms")===-1?1e3:1;return parseFloat(o)*i}function rt(n,o,i){i===void 0&&(i=5);var r=!1,e=setTimeout(function(){r||et(n,"transitionend",!0)},o+i),t=P(n,"transitionend",function(){r=!0},{once:!0});return function(){clearTimeout(e),t()}}function it(n,o,i,r){i==null&&(i=nt(n)||0);var e=rt(n,i,r),t=P(n,"transitionend",o);return function(){e(),t()}}function M(n,o){const i=_(n,o)||"",r=i.indexOf("ms")===-1?1e3:1;return parseFloat(i)*r}function ft(n,o){const i=M(n,"transitionDuration"),r=M(n,"transitionDelay"),e=it(n,t=>{t.target===n&&(e(),o(t))},i+r)}function lt(n){n.offsetHeight}function ot(n){return n&&"setState"in n?S.findDOMNode(n):n??null}const at=x.forwardRef(({onEnter:n,onEntering:o,onEntered:i,onExit:r,onExiting:e,onExited:t,addEndListener:a,children:s,childRef:u,...l},p)=>{const d=c.useRef(null),b=A(d,u),D=m=>{b(ot(m))},h=m=>O=>{m&&d.current&&m(d.current,O)},L=c.useCallback(h(n),[n]),I=c.useCallback(h(o),[o]),U=c.useCallback(h(i),[i]),j=c.useCallback(h(r),[r]),G=c.useCallback(h(e),[e]),W=c.useCallback(h(t),[t]),X=c.useCallback(h(a),[a]);return H.jsx(tt,{ref:p,...l,onEnter:L,onEntered:U,onEntering:I,onExit:j,onExited:W,onExiting:G,addEndListener:X,nodeRef:d,children:typeof s=="function"?(m,O)=>s(m,{...O,ref:D}):x.cloneElement(s,{ref:D})})}),ct=at;export{v as E,ct as T,y as a,g as b,E as c,lt as d,it as e,_ as s,ft as t};
