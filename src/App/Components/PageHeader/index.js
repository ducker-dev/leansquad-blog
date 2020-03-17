import React from 'react';
import {Link} from "react-router-dom";

import "./style.scss";

function PageHeader() {
  return (
    <header className="header">
      <div className="container header__content">
        <nav>
          <ul>
            <li><Link to="/">Перейти ко всем постам</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default PageHeader;
