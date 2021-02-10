import React from "react";
import { shallow } from "enzyme";
import Login from "../components/user/Login";
describe("Login Component", () => {
  it("should render without throwing an error", () => {
    expect(
      shallow(<Login />)
        .find("form.login")
        .exists()
    ).toBe(true);
  });
});

describe("Login component", () => {
  it("Check email and password empty at the initial stage", () => {
    expect(
      shallow(<Login />)
        .find("#email")
        .prop("value")
    ).toEqual("");

    expect(
      shallow(<Login />)
        .find("#password")
        .prop("value")
    ).toEqual("");
  });
});
