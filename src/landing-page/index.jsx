import React from "react";
import logo from "../assets/images/fusefi-logo.svg";
import NewsletterForm from "./newsletter_form";

const LandingPage = () => {
  return (
    <div className="landing_page">
      <img className="landing_page__logo" src={logo} alt="fuse-fi" />
      <p className="landing_page__info">
        Decentralized finance hub and accelerator for <br /> the Fuse ecosystem
      </p>
      <p className="landing_page__cta">Be first:</p>
      <NewsletterForm />
    </div>
  );
};

export default LandingPage;
