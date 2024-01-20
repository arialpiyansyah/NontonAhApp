class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector("#searchElement").value;
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
    .search-container {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      padding: .5rem;
      border-radius: 5px;
      display: flex;
      position: sticky;
      top: 10px;
      background-color: lightgrey;
      margin: 0 30% 0 30%;
      z-index: 1;
    }
    
    .search-container > input {
      width: 90%;
      padding: 15px;
      border: 0;
      border-bottom: 1px dotted var(--main-color);
      font-weight: bold;
      background-color: lightgrey;
    }
    
    .search-container > input:focus {
      outline: 0;
      border-bottom: 2px solid var(--main-color);
    }
    
    .search-container > input:focus::placeholder {
      font-weight: bold;
    }
    
    .search-container > input::placeholder {
      color: black;
      font-weight: normal;
      font-family: var(--main-font);
    }
    
    .search-container > button {
      width: 15%;
      cursor: pointer;
      margin-left: auto;
      padding: 10px;
      background-color: black;
      color: var(--main-color);
      border: 0;
      text-transform: uppercase;
      border-radius: 5px;
      border: 1px solid var(--main-color);
      font-family: var(--main-font);
      font-size: 15px;
      transition: 200ms ease-in-out transform;
    }

    .search-container > button:hover {transform: scale(1.1);} 
    .search-container > button:active {transform: scale(.9);} 
    
    @media screen and (max-width: 768px) {
      .search-container {
        flex-direction: column;
        position: static;
      }
    
      .search-container > input {
        width: 100%;
        margin-bottom: 12px;
      }
    
      .search-container > button {
        width: 100%;
      }
    }
    </style>
    
    <div id="search-container" class="search-container">
        <input placeholder="Ketik Di Sini!" id="searchElement" type="search">
        <button id="searchButtonElement" type="submit">Cari</button>
      </div>
    `;

    this.shadowDOM
      .querySelector("#searchButtonElement")
      .addEventListener("click", this._clickEvent);
  }
}

customElements.define("search-bar", SearchBar);
