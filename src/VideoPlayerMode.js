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
    }

    .timestamp-navigation-button{
      background: white;
      cursor: pointer;
      padding: 4px;
      height: fit-content;
      margin: auto;
    }
    
    .timestampBtn.active{
      background: #dfedf5;
    }
  `;

  static properties = {
    header: { type: String },
    counter: { type: Number },
    activeIndex: { type: String }
  };

  constructor() {
    super();
    this.activeIndex = "";
    this.videoPlayer;
    this.goTimestamp = this.goTimestamp.bind(this);
    this.updateJumbotron = this.updateJumbotron.bind(this);
  }

  firstUpdated() {
    console.log("firstUpdated");
    this.videoPlayer = this.shadowRoot.querySelector('video-player');
    console.log(this.videoPlayer); // should not be undefined now
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      console.log(`${propName} changed. oldValue: ${oldValue}`);
      if (propName == "activeIndex") {
        this.shadowRoot.querySelectorAll(".timestampBtn").forEach((btn) => {
          console.log("add active");
          if (btn.id.split("-")[1] == this.activeIndex) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
        this.updateJumbotron();
      }
    });
  }

  render() {
    return html`
      <div class="videoSection">
        <video-player id="video-player-target" source="https://www.youtube.com/watch?v=-MTSQjw5DrM" source-type="youtube"></video-player>
        <div class="jumbotron">
          <button @click="${this.goPrevTimestamp}" class="timestamp-navigation-button"><simple-icon-lite icon="lrn:arrow-left"></simple-icon-lite></button>
          <div>
            <h3 id="jumbotron-Header">Timestamp 1</h3>
            <p id="jumbotron-desc">Timestamp 1 description</p>
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
    this.shadowRoot.querySelector(".timestampList").innerHTML = "";
    console.log("scan");
    let counter = 0;
    document.querySelectorAll("video-player-flag").forEach((flag) => {
      console.log(flag.timestamp);
      flag.onclick = () => {
        console.log(flag.timestamp);
      };
      flag.id = "timestamp-" + counter;
      var timestampBtn = document.createElement("button");
      timestampBtn.id = "timestampBtn-" + counter;
      timestampBtn.innerHTML = flag.outerHTML;
      timestampBtn.onclick = this.goTimestamp;
      timestampBtn.classList.add("timestampBtn");
      timestampBtn.timestamp = flag.timestamp;
      this.shadowRoot.querySelector(".timestampList").appendChild(timestampBtn);
      counter++;
    });
  }

  goPrevTimestamp(){
    console.log("goPrevTimestamp");
  }

  goNextTimestamp(){
    console.log("goNextTimestamp");
  }

  goTimestamp(e){
    this.videoPlayer.shadowRoot.querySelector("a11y-media-player").seek(e.target.timestamp);
    this.videoPlayer.shadowRoot.querySelector("a11y-media-player").play();
    this.activeIndex = e.target.id;
    console.log(this.activeIndex);
  }

  updateJumbotron(){
    console.log("updateJumbotron");
    this.shadowRoot.querySelector("#jumbotron-Header").innerText = this.shadowRoot.getElementById(this.activeIndex).header;
    let activeButtonId = this.activeIndex;
    let flagId = "timestamp-" + activeButtonId.split("-")[1];
    let flag = document.getElementById(flagId);
    if (flag) {
        let parentElement = flag.parentNode;
        if (parentElement) {
            this.shadowRoot.querySelector("#jumbotron-desc").innerHTML = parentElement.innerHTML;
        }
    }
}
}