import { html, css, LitElement } from 'lit';
import "@lrnwebcomponents/video-player/video-player.js";
import "@lrnwebcomponents/simple-icon/lib/simple-icon-lite.js";

export class VideoPlayerMode extends LitElement {
  static styles = css`
    :host{
      display: grid;
      grid-template-columns: 3fr 1fr;
      width: 70%;
      height: 50%;
      gap: 16px;
    }

    video-player{
    }

    .videoSection{
      display: flex;
      flex-direction: column;
      justify-content: start;
    }

    .timestampList{
      margin-top: 16px;
      display: flex;
      flex-direction: column;
      border: 1px solid black;
      background: #bab8b8;
    }

    .timestampBtn{
      padding: 16px;
      background: white;
      border: none;
      border-bottom: 1px solid black;
      cursor: pointer;
      font-size: 24px;
    }

    .jumbotron{
      display: grid;
      grid-template-columns: .5fr 4fr .5fr;
      gap: 16px;
      max-height: 160px;
    }

    .timestamp-navigation-button{
      background: white;
      cursor: pointer;
      padding: 4px;
      height: fit-content;
      margin: auto;
    }
    
  `;

  static properties = {
    header: { type: String },
    counter: { type: Number },
  };

  constructor() {
    super();
    this.activeIndex = 0;
  }

  render() {
    return html`
      <div class="videoSection">
        <video-player source="https://www.youtube.com/watch?v=-MTSQjw5DrM" source-type="youtube"></video-player>
        <div class="jumbotron">
          <button @click="${this.goPrevTimestamp}" class="timestamp-navigation-button"><simple-icon-lite icon="lrn:arrow-left"></simple-icon-lite></button>
          <div>
            <h3>Timestamp 1</h3>
            <p>Timestamp 1 description</p>
            <button @click="${this.scan}">Scan</button>
          </div>
          <button @click="${this.goNextTimestamp}" class="timestamp-navigation-button"><simple-icon-lite icon="lrn:arrow-right"></simple-icon-lite></button>
        </div>
      </div>
      <div class="timestampList">
      </div>
    `;
  }

  scan(){
    console.log("scan");
    document.querySelectorAll("video-player-flag").forEach((flag) => {
      console.log(flag.timestamp);
      flag.onclick = () => {
        console.log(flag.timestamp);
      };
      var timestampBtn = document.createElement("button");
      timestampBtn.innerHTML = flag.outerHTML;
      timestampBtn.onclick = () => {
          console.log(flag.timestamp);
      };
      timestampBtn.classList.add("timestampBtn");
      this.shadowRoot.querySelector(".timestampList").appendChild(timestampBtn);
    });
}

  goPrevTimestamp(){
    console.log("goPrevTimestamp");
  }

  goNextTimestamp(){
    console.log("goNextTimestamp");
  }

  goTimestamp(){
    console.log("goTimestamp");
  }
}