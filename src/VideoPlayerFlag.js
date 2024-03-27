import { html, css, LitElement } from 'lit';
import "@lrnwebcomponents/simple-icon/lib/simple-icon-button-lite.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icons.js";
import "@lrnwebcomponents/hax-iconset/lib/simple-hax-iconset.js";
class VideoPlayerFlag extends LitElement {
    static styles = css`
        :host{
            padding: 4px;
            cursor: pointer;
        }

        simple-icon-lite{
            padding-bottom: 4px;
        }

        slot{
            color: red;
            display: inline-block;
        }
    `;
    
    constructor() {
        super();
        this.icon = "icons:flag";
        this.color = "red";
        this.timestamp = 0;
        this.header = "Timestamp Header";
    }

    static get properties() {
        return {
            icon: { type: String },
            color: { type: String },
            timestamp: { type: Number },
            header: { type: String },
        };
    }

    static get tag() {
        return 'video-player-flag';
    }

    static get timestamp() {
        return this.timestamp;
    }

    static get header() {
        return this.header;
    }

    render(){
        return html`
            <simple-icon-lite icon="${this.icon}" dir="ltr" style="--simple-icon-color: ${this.color};"></simple-icon-lite>
            <slot style="color: ${this.color}; border-bottom: 2px solid ${this.color};"></slot>
        `;
    }
}
  

window.customElements.define('video-player-flag', VideoPlayerFlag);