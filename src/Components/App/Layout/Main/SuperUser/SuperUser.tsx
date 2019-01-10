import "./SuperUser.css";

import React, { Component } from "react";
import { IHandlePage } from "../../../App";

interface ISuperUserProps {
  isSidebarOpen: boolean;
  handlePage: IHandlePage;
}

interface ISuperUserStates {}

const memberList = [
  {
    mb_id: "aaa",
    mb_name: "aaa",
    mb_email: "aaa@aaa.com",
    mb_level: 1,
    mb_company: "aaa",
    mb_fax: "000-000-0000",
    mb_register_data: "today",
  },
  {
    mb_id: "bbb",
    mb_name: "bbb",
    mb_email: "bbb@bbb.com",
    mb_level: 1,
    mb_company: "bbb",
    mb_fax: "000-000-0000",
    mb_register_data: "today",
  },
  {
    mb_id: "ccc",
    mb_name: "ccc",
    mb_email: "ccc@ccc.com",
    mb_level: 1,
    mb_company: "ccc",
    mb_fax: "000-000-0000",
    mb_register_data: "today",
  },
];

export default class SuperUser extends Component<ISuperUserProps, ISuperUserStates> {
  render() {
    return (
      <div className="super_user">
        <div>
          <div>title list</div>
          <div>
            {memberList.map(member => (
              <div>
                <div>{member.mb_id}</div>
                <div>{member.mb_name}</div>
                <div>{member.mb_email}</div>
                <div>{member.mb_company}</div>
                <div>{member.mb_fax}</div>
                <div>{member.mb_level}</div>
                <div>{member.mb_register_data}</div>
              </div>
            ))}
          </div>
        </div>
        <div>page nav</div>
      </div>
    );
  }
}
