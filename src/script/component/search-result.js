class SearchResult extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `<style>
    .search-movie > h2 {
      color: var(--main-color);
      font-weight: 700;
      text-align: center;
      background-color: black;
      border-radius: 5px;
      box-shadow: 0 15px 15px 0 rgba(0, 0, 0, 10);
      padding: .5rem;
      margin: 2.5rem 10% 0 10%;
    }
    
    .searched-movies-catalog {
      padding: 1rem;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-wrap: wrap;
      gap: 2rem;
    }
    
    .card {
      width: clamp(150px, 95vw, 250px);
      box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 10);
      overflow: hidden;
      cursor: pointer;
      border-radius: 0.5rem;
      border: 1px solid var(--main-color);
      transition: 200ms ease-in-out transform;
    }
    
    .card:hover {
      transform: scale(1.1);
    }
    
    .poster {
      width: 100%;
      height: 270px;
      position: relative;
      z-index: -1;
    }
    
    .poster img {
      width: 100%;
      height: 100%;
    }
    
    .info {
      display: flex;
      flex-direction: column;
      padding: 0.5rem;
      text-align: center;
      font-size: 12px;
      background-color: lightgrey;
      height: 6rem;
    }
    
    .info .movie-title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 2rem;
    }
    
    .info .movie-title > h2 {
      font-size: 13px;
    }
    </style>
    <div class="search-movie"></div>
    <div class="searched-movies-catalog"></div>
    `;
  }
}

customElements.define("search-result", SearchResult);
