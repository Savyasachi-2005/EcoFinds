import React from "react";
import Icon from "../../../components/AppIcon";

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const companyLinks = [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const productLinks = [
    { name: "Explore", href: "/explore" },
    { name: "Sell", href: "/sell" },
    { name: "Impact", href: "/impact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" },
    { name: "LinkedIn", icon: "Linkedin", href: "#" },
    { name: "YouTube", icon: "Youtube", href: "#" },
  ];

  const handleLinkClick = (href) => {
    if (href?.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container-eco section-y-tight">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand & blurb */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Leaf" size={22} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-foreground">
                  EcoFinds
                </span>
                <span className="text-xs text-muted-foreground">
                  Give Products a Second Life
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover quality pre‑owned items and help reduce waste. We’re
              growing with your feedback.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="w-8 h-8 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full flex items-center justify-center transition-colors"
                  aria-label={s.name}
                >
                  <Icon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      if (l.href.startsWith("#")) {
                        e.preventDefault();
                        handleLinkClick(l.href);
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Product
            </h3>
            <ul className="space-y-2 text-sm">
              {productLinks.map((l) => (
                <li key={l.name}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      if (l.href.startsWith("#")) {
                        e.preventDefault();
                        handleLinkClick(l.href);
                      }
                    }}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border bg-muted/30">
        <div className="container-eco py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="text-sm text-muted-foreground flex flex-wrap items-center gap-4">
              <span>© {currentYear} EcoFinds. All rights reserved.</span>
              <button className="hover:text-primary transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-primary transition-colors">
                Terms of Service
              </button>
              <button className="hover:text-primary transition-colors">
                Cookie Policy
              </button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                <span>Made in India</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Leaf" size={16} className="text-success" />
                <span>Carbon Neutral</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
