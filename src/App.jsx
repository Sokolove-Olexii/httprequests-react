import React, { Component } from "react";
import axios from "axios";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

const List = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.objectID}>
          <a href={item.url} target="_blank">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get("/search?query=react");
      this.setState({ posts: response.data.hits });
    } catch (e) {
      console.error("Помилка", e);
    }
  }

  render() {
    const { posts } = this.state;
    return (
      <div>
        <h2>Статті</h2>
        {posts.length !== 0 && <List items={posts} />}
      </div>
    );
  }
}
