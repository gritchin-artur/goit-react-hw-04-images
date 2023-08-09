import { useState } from "react";
import { Header, Form, Button, Span, Input } from "./SearchBar.styled";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import propTypes from "prop-types";

export default function SearchBar({ onSubmit }) {
  const [seachTopic, setSeachTopic] = useState("");

  //seach topic images
  const handleChange = (e) => {
    setSeachTopic(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (seachTopic.trim() === "") {
      Notify.failure("Please enter what do you find");
      return;
    }
    onSubmit(seachTopic);
    setSeachTopic("");
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <Span>Search</Span>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="serchQuery"
          value={seachTopic}
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
}

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
